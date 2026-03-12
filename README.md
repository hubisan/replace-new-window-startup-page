# Replace New Window Startup Page

A Firefox extension that replaces the new window startup page if it matches a specific URL. This is particularly useful in managed IT environments where a specific startup page is forced, but the user prefers a different one (like `about:blank` or a personal homepage).

## Features

- **URL Blocking/Redirection**: Automatically detects when a specific startup URL is loaded and redirects the tab.
- **Configurable**: Easily set the source URL (the one to replace) and the target URL (the destination) via the extension options.
- **Minimalist**: Lightweight and privacy-focused.

## Installation

### For Developers

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the extension in Firefox:
    ```bash
    npm start
    ```

To debug the extension with verbose output, use:
```bash
npm run debug
```

## Usage

1.  Go to the extension options.
2.  Enter the **Source URL** you want to replace (e.g., your company's portal).
3.  Enter the **Target URL** you want to see instead (e.g., `https://www.google.com` or leave empty for `about:blank`).
4.  Click **Save**.

## License

This project is licensed under the GPL-3.0 License.
