# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## 0.1.0