# Apps Script setup — MNNM booking backend

This folder is **not** part of the website build. It's the backend that the booking dialog talks to.

## One-time setup (≈10 minutes)

### 1. Create the Google Sheet

Create a new Google Sheet (e.g. "MNNM Bookings"). Make two tabs:

**`Bookings`** — row 1 headers in this exact order (Hebrew):

| A | B | C | D | E |
|---|---|---|---|---|
| שם מלא | טלפון | תאריך הזמנה | תאריך ביצוע | מחיר |

Then **format column D as Plain text** (Format → Number → Plain text). This stops Sheets from reformatting `2026-05-03T10:00` into something else.

**`Config`** — column A is the key. For `price` / `currency` rows the value goes in column B. For `slot` rows, **column B is the date** (use Sheets' calendar date picker — Insert → Date) and **column C is the time** in 24-hour `HH:MM` format. Example:

| A (key) | B | C |
|---|---|---|
| price | 15 | |
| currency | ₪ | |
| slot | 2026-05-03 | 10:00 |
| slot | 2026-05-03 | 11:00 |
| slot | 2026-05-03 | 12:00 |
| slot | 2026-05-04 | 10:00 |
| ... | ... | ... |

Tips:
- **Column B**: pick a date with the calendar UI (right-click → Insert → Date). Sheets stores it as a real date, the script formats it to `YYYY-MM-DD` in the Asia/Jerusalem timezone.
- **Column C**: type `10:00` (24-hour). Either text or a Sheets time value works.
- Add as many `slot` rows as you want; the web app hides ones that have already been booked.
- The legacy single-column format (B = `2026-05-03T10:00`, C empty) still works if you have older rows — no need to migrate.

### 2. Paste the script

In the sheet: **Extensions → Apps Script**.

- Replace `Code.gs` contents with the contents of [`Code.gs`](./Code.gs).
- At the top, replace `PASTE_SHEET_ID_HERE` with the sheet's ID (it's in the sheet URL: `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit`).
- Open **Project Settings** (gear icon) → check **Show "appsscript.json" manifest file in editor**.
- Replace `appsscript.json` contents with the contents of [`appsscript.json`](./appsscript.json).
- Save.

### 3. Deploy as a web app

- **Deploy → New deployment** → gear icon → **Web app**.
- Description: "MNNM booking v1".
- **Execute as**: *Me* (your Google account — calendar events get created on your calendar).
- **Who has access**: *Anyone*.
- **Deploy** → grant the requested permissions (Sheets, Calendar).
- Copy the deployment URL — looks like `https://script.google.com/macros/s/AKfy.../exec`.

### 4. Wire the site

In the repo root, create `.env.local` with:

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfy.../exec
```

Then `npm run build` and redeploy the site. (`vite dev` also picks it up.)

### 5. Smoke-test

- Open the deployed site, click any "Book Appointment" button.
- The dialog should show the price from your `Config` tab and only the slots not already in `Bookings`.
- Submit a test booking with your own email → row appears in `Bookings`, calendar invite arrives in your inbox.
- Reload, open the dialog again → the slot you just booked is gone.

## Updating availability

Just edit the `Config` tab — add or remove `slot` rows. Changes are live on next dialog open (no redeploy).

## Updating the price

Edit the `price` row in `Config`. The site fetches it on first dialog open per session.

## Re-deploying after a code change

If you change `Code.gs`:

- **Deploy → Manage deployments** → pencil icon on the existing deployment → **Version: New version** → **Deploy**.
  This keeps the same `/exec` URL so you don't need to update `VITE_APPS_SCRIPT_URL`.

## Errors the API can return

| `error` value | Meaning |
|---|---|
| `missing_fields` | name/phone/slot was empty |
| `bad_slot_format` | slot didn't match `YYYY-MM-DDTHH:MM` |
| `slot_not_offered` | the slot isn't in the `Config` tab |
| `slot_taken` | another booking grabbed that slot first |

## Notes

- Concurrency is handled with `LockService.getScriptLock()` — two simultaneous bookings for the same slot will not both succeed.
- Calendar invites are best-effort: if Calendar fails, the booking row is still written and the user gets a normal success.
- Apps Script web apps follow a 302 redirect to `script.googleusercontent.com` for the response body. `fetch` handles this automatically; no client-side change needed.
