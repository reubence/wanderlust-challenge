
---

#  Bugs & Fixes Summary – Wanderlust Search

This section outlines the key bugs encountered during development and how each was resolved, followed by the improvements made to enhance user experience, reliability, and API robustness.

You can get the detailed video explaination here : 

---

## 🐞 Fixed Bugs

| Bug                                               | Description                                                                                | Fix                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Redundant `setQuery` in `onSubmit`**            | The query state was being manually set even though it was already controlled by the input. | Removed unnecessary `setQuery(e.target.query.value)` from the submit handler.              |
| **"No results found" displayed prematurely**      | Message appeared before the user even performed a search.                                  | Used a `hasSearched` flag and validated `results.length === 0` before showing the message. |
| **No error feedback on failed search**            | Users got no feedback if the search API failed.                                            | Introduced `setSearchError` to capture and display errors in the UI.                       |
| **Voice search didn't handle mic access failure** | No user alert if mic permission was denied or recording failed.                            | Wrapped recording logic in `try-catch` and showed a user-friendly alert.                   |
| **Audio recording duration undefined**            | Recording continued indefinitely.                                                          | Capped recording to 3 seconds using `setTimeout`.                                          |
| **Transcription response lacked error handling**  | No error displayed if the transcript was empty.                                            | Added fallback alert if `data.transcript` is missing.                                      |
| **React hook used in a server component**         | `useState` used in a file treated as a server component.                                   | Added `"use client";` at the top of `page.tsx`.                                            |
| **Environment variable missing**                  | `GOOGLE_API_KEY` not set, causing Zod validation failure.                                  | Added `.env` validation and error handling.                                                |
| **Incorrect Google GenAI usage**                  | Used invalid methods from `@google/genai`.                                                 | Switched to using `@google/generative-ai` and base64 audio conversion.                     |

---

##  UX & Functional Improvements

| Improvement                                          | Description                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| **Disabled input & button during loading/recording** | Prevents multiple submissions and improves feedback.                       |
| **Enhanced error display**                           | Clear messages shown on search/transcription failure.                      |
| **Loading indicators added**                         | UI feedback via spinner icons from `lucide-react`.                         |
| **Auto-search after transcription**                  | Automatically triggers search once voice is transcribed.                   |
| **Flexible transcription input**                     | Voice input dynamically sets the query, reducing user effort.              |
| **Responsive UI**                                    | Added conditional rendering and loading states to improve visual feedback. |

---

##  API Improvements

### `/api/search`

* **Input Validation**: Prevented empty queries before running Zod validation.
* **Database Query Update**: Switched from searching `description` to `location` field.
* **Debug Logging**: Logged incoming queries and results.
* **Error Response Standardization**: Included `status`, `message`, and `error` in failure responses.

### `/api/transcribe`

* **Environment Validation**: Used `zod` to validate required environment variables.
* **Audio Processing**: Converted audio to base64 format before sending to the Google API.
* **Improved Transcription Handling**: Extracted transcript safely and returned fallback message if it failed.
* **Better Logging**: Logged incoming audio requests and Google API responses for debugging.

---

##  Backend Changes Summary

* Rewrote parts of the Prisma query to support case-insensitive location matching.
* Implemented early returns for invalid input in API routes.
* Added seed data to ensure test queries like “Tokyo” or “Japan” produce valid results.

---

##  Voice Search Workflow

1. User clicks the mic button.
2. App records 3 seconds of audio.
3. Audio is sent to `/api/transcribe`.
4. Transcription result is set in the search box.
5. Auto-triggered search displays destination results.

---

##  Code Quality Enhancements

* Consolidated error boundaries and try/catch logic.
* Refactored button behavior for consistent UI state.
* Improved conditional rendering to reduce false "no results" messages.
* Used `zod` schemas throughout for consistent validation on both client and server.

---
