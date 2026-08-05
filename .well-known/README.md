# Android App Links — assetlinks.json

This file must be served at:

`https://stayorpay.app/.well-known/assetlinks.json`

## Required values

| Field | Value |
|-------|-------|
| `package_name` | `com.stayorpay.app` |
| `sha256_cert_fingerprints` | SHA-256 of your **Play App Signing certificate** (recommended for production) or **upload certificate** |

## How to obtain SHA-256

### Upload keystore (local release signing)

```powershell
keytool -list -v -keystore path\to\upload-keystore.jks -alias your-key-alias
```

Copy the `SHA256:` line and format as uppercase hex pairs separated by colons.

### Play App Signing (after first Play Console upload)

Play Console → Release → Setup → App signing → **App signing key certificate** → SHA-256 certificate fingerprint.

Use that fingerprint in production so App Links verify for Play-distributed builds.

## Verification

After deployment, test with Google's Digital Asset Links tool:

https://developers.google.com/digital-asset-links/tools/generator

Also verify on device:

```bash
adb shell pm get-app-links com.stayorpay.app
```

## Important

- Do **not** commit real keystore files or passwords.
- Replace `REPLACE_WITH_SHA256_APP_SIGNING_OR_UPLOAD_CERTIFICATE` in `assetlinks.json` before expecting Android App Link verification to succeed.
- Until the fingerprint is set, the website invite page and custom scheme `stayorpay://invite?code=` still work; HTTPS auto-open may fall back to the browser.
