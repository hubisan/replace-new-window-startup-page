# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.4] - 2026-03-12

### Fixed
- Fixed an issue where the very first "New Window" (Ctrl+N) in a session was not intercepted correctly because Firefox sometimes takes longer than expected to fully initialize the initial tabs for a new blank window. Implemented a robust retry mechanism to ensure the initial tab is correctly captured and redirected.

## [1.0.3] - 2026-03-12

### Fixed
- Fixed issue where the extension failed to intercept startup URLs when launching the Firefox browser for the very first time.

## [1.0.2] - 2026-03-12

### Fixed
- Changed URL replacement logic from `tabs.onCreated` to `windows.onCreated`. The extension will now correctly only replace the startup URL when a completely **new window** is opened, and will ignore all newly opened tabs within an existing window.
- Fixed issue where the extension would block the user from manually typing the startup URL in a newly opened blank tab.

## [1.0.1] - 2026-03-12

### Added
- Created and deployed a brand new, highly visible "Home Checkmark" extension icon.

### Fixed
- Fixed over-eager URL replacement: now only replaces URLs when a new window/tab is automatically created, not when manually typed.
- Fixed `MISSING_DATA_COLLECTION_PERMISSIONS` lint warning in Firefox by explicitly declaring no data collection in `manifest.json`.

## [1.0.0] - 2026-03-12

### Added
- Added `package.json` with development scripts (`start`, `build`, `lint`, `debug`).
- Added `.gitignore` and `README.md`.
- Added missing icons (`assets/icons/icon48.png`, `assets/icons/icon96.png`).
- Created `assets` directory for images and icons.
- Added GNU GPL-3.0 `LICENSE` file.

### Changed
- Moved source files to `src` directory.
- Restructured `options` page: moved to `src/options/`, separated CSS and JS.
- Polished Options UI with modern styling and non-blocking status messages.
- Updated `manifest.json` with new directory structure, `author`, and `homepage_url`.

### Fixed
- Fixed options page visibility and functionality.
- Fixed URL redirection not triggering by adding `<all_urls>` permission in `manifest.json`.
- Fixed URL comparison logic by adding URL normalization to handle trailing slashes.
- Improved redirection performance by using `webNavigation.onBeforeNavigate` instead of `webNavigation.onCommitted`.
- Fixed over-eager URL replacement: now only replaces URLs when a new window/tab is automatically created, not when manually typed.

## 0.1.0