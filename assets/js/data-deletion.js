import { getFunctionsBaseUrl, loadBrowserClient, readConfig } from "./supabase-browser.js";

const ui = {
  signedOut: document.getElementById("state-signed-out"),
  signedIn: document.getElementById("state-signed-in"),
  deleting: document.getElementById("state-deleting"),
  success: document.getElementById("state-success"),
  error: document.getElementById("state-error"),
  errorMessage: document.getElementById("error-message"),
  userName: document.getElementById("user-name"),
  userEmail: document.getElementById("user-email"),
  confirmDialog: document.getElementById("confirm-dialog"),
  confirmInput: document.getElementById("confirm-input"),
  confirmSubmit: document.getElementById("confirm-submit"),
  confirmCancel: document.getElementById("confirm-cancel"),
  deleteButton: document.getElementById("delete-account-button"),
  googleButton: document.getElementById("sign-in-google"),
  appleButton: document.getElementById("sign-in-apple"),
  successHome: document.getElementById("success-home"),
};

let locale = StayOrPayDataDeletion.resolveLocale();
let supabase = null;
let isDeleting = false;
let isSigningIn = false;

function showOnly(section) {
  [ui.signedOut, ui.signedIn, ui.deleting, ui.success, ui.error].forEach(function (node) {
    if (!node) return;
    node.hidden = node !== section;
  });
}

function setErrorMessage(key) {
  if (ui.errorMessage) {
    ui.errorMessage.textContent = StayOrPayDataDeletion.t(locale, key);
  }
  showOnly(ui.error);
}

function setAuthButtonsDisabled(disabled) {
  if (ui.googleButton) ui.googleButton.disabled = disabled;
  if (ui.appleButton) ui.appleButton.disabled = disabled;
}

async function initSupabase() {
  if (!readConfig()) {
    setErrorMessage("error.config");
    return null;
  }
  return loadBrowserClient();
}

async function refreshSessionState() {
  if (!supabase) return;

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    showOnly(ui.signedOut);
    return;
  }

  const user = data.session.user;
  if (ui.userName) {
    ui.userName.textContent = StayOrPayDataDeletion.displayNameFromUser(user);
  }
  if (ui.userEmail) {
    ui.userEmail.textContent = user.email || "—";
  }
  showOnly(ui.signedIn);
}

async function signInWithProvider(provider) {
  if (!supabase || isSigningIn || isDeleting) return;
  isSigningIn = true;
  setAuthButtonsDisabled(true);

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${StayOrPayDataDeletion.CALLBACK_URL}?next=${encodeURIComponent("/data-deletion/")}`,
    },
  });

  isSigningIn = false;
  setAuthButtonsDisabled(false);
  if (error) {
    setErrorMessage("error.network");
  }
}

function openConfirmDialog() {
  if (!ui.confirmDialog) return;
  ui.confirmDialog.hidden = false;
  if (ui.confirmInput) {
    ui.confirmInput.value = "";
    ui.confirmInput.focus();
  }
  updateConfirmButton();
}

function closeConfirmDialog() {
  if (!ui.confirmDialog) return;
  ui.confirmDialog.hidden = true;
}

function updateConfirmButton() {
  if (!ui.confirmSubmit || !ui.confirmInput) return;
  ui.confirmSubmit.disabled =
    isDeleting || !StayOrPayDataDeletion.canConfirmDelete(ui.confirmInput.value);
}

async function deleteAccount() {
  if (!supabase || isDeleting) return;

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData.session) {
    setErrorMessage("error.sessionExpired");
    return;
  }

  isDeleting = true;
  closeConfirmDialog();
  showOnly(ui.deleting);
  if (ui.deleteButton) ui.deleteButton.disabled = true;

  try {
    const config = readConfig();
    const response = await fetch(`${getFunctionsBaseUrl()}/delete-own-account`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionData.session.access_token}`,
        apikey: config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ignored_client_uid: "must-not-be-used" }),
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch (_) {
      payload = {};
    }

    if (!response.ok || payload.success !== true) {
      setErrorMessage(StayOrPayDataDeletion.mapDeleteError(response.status, payload));
      return;
    }

    await supabase.auth.signOut();
    sessionStorage.removeItem("stayorpay.web.auth");
    showOnly(ui.success);
    window.setTimeout(function () {
      window.location.href = "/";
    }, 5000);
  } catch (_) {
    setErrorMessage("error.network");
  } finally {
    isDeleting = false;
    if (ui.deleteButton) ui.deleteButton.disabled = false;
  }
}

function bindEvents() {
  document.querySelectorAll("[data-set-locale]").forEach(function (button) {
    button.addEventListener("click", function () {
      locale = StayOrPayDataDeletion.applyLocale(button.getAttribute("data-set-locale"));
    });
  });

  if (ui.googleButton) {
    ui.googleButton.addEventListener("click", function () {
      signInWithProvider("google");
    });
  }

  if (ui.appleButton) {
    ui.appleButton.addEventListener("click", function () {
      signInWithProvider("apple");
    });
  }

  if (ui.deleteButton) {
    ui.deleteButton.addEventListener("click", openConfirmDialog);
  }

  if (ui.confirmCancel) {
    ui.confirmCancel.addEventListener("click", closeConfirmDialog);
  }

  if (ui.confirmInput) {
    ui.confirmInput.addEventListener("input", updateConfirmButton);
  }

  if (ui.confirmSubmit) {
    ui.confirmSubmit.addEventListener("click", function () {
      if (!StayOrPayDataDeletion.canConfirmDelete(ui.confirmInput.value)) return;
      deleteAccount();
    });
  }

  if (ui.successHome) {
    ui.successHome.addEventListener("click", function () {
      window.location.href = "/";
    });
  }
}

async function boot() {
  locale = StayOrPayDataDeletion.applyLocale(locale);
  bindEvents();

  const params = new URLSearchParams(window.location.search);
  if (params.get("auth_error") === "1") {
    setErrorMessage("error.sessionExpired");
    return;
  }
  if (params.get("config_error") === "1") {
    setErrorMessage("error.config");
    return;
  }

  supabase = await initSupabase();
  if (!supabase) return;
  await refreshSessionState();
}

boot();
