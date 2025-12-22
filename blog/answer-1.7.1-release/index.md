---
date: 2025-12-22
title: "Apache Answer 1.7.1: SchemaForm & Stability Enhancements"
authors: [LinkinStar]
category: Release
featured: true
image: 2025-12-22-cover@4x.png
description: "This release focuses on SchemaForm behavior improvements, frontend input enhancements, engineering quality upgrades, and multiple important bug fixes."
---

We’re pleased to announce a **new Apache Answer release**!
This version continues to refine the developer and user experience with improvements to **SchemaForm behavior**, **frontend input validation**, **engineering tooling**, and a number of **important bug fixes** that improve overall stability and correctness.

As always, thank you to everyone in the community who contributed code, reviews, and feedback.

---

## ✨ New Features

### SchemaForm Enhancements

* **New**: SchemaForm Input values are always treated as strings ([#1425](https://github.com/apache/answer/pull/1425)) by [@shuashuai](https://github.com/shuashuai)
  This change unifies input value handling and avoids type inconsistencies between frontend and backend logic, improving predictability for plugin developers.

* **New**: `<input type="number">` now requires setting `min` / `max` values on the frontend when needed ([#1417](https://github.com/apache/answer/pull/1417)) by [@Dinesht04](https://github.com/Dinesht04)
  Improves frontend validation by enforcing numeric boundaries earlier in the user input flow.

---

## 🚀 Improvements

### Engineering & Code Quality

* **Improve**: Add `golangci-lint` to the lint target with related formatting and cleanup ([#1437](https://github.com/apache/answer/pull/1437)) by [@ferhatelmas](https://github.com/ferhatelmas)
  Helps maintain consistent Go code style and catches potential issues earlier in development.

* **Improve**: Bump `mockgen` to version 0.6.0 ([#1434](https://github.com/apache/answer/pull/1434)) by [@ferhatelmas](https://github.com/ferhatelmas)
  Keeps test tooling up to date and improves compatibility.

* **Improve**: Internal refactor to compile regular expressions once instead of on each text-clean invocation ([#1430](https://github.com/apache/answer/pull/1430)) by [@ferhatelmas](https://github.com/ferhatelmas)
  Reduces unnecessary overhead and improves runtime performance.

---

## 🐛 Bug Fixes

### Admin & Core Functionality

* **Fixed**: “Language file not found.” error when changing the timezone in admin settings ([#1427](https://github.com/apache/answer/pull/1427)) by [@LinkinStars](https://github.com/LinkinStars)

* **Fixed**: 500 error when opening any question ([#1426](https://github.com/apache/answer/pull/1426)) by [@shuashuai](https://github.com/shuashuai) & [@LinkinStars](https://github.com/LinkinStars)

* **Fixed**: Edited answers were not updated correctly after moderation ([#1423](https://github.com/apache/answer/pull/1423)) by [@LinkinStars](https://github.com/LinkinStars)

* **Fixed**: Default-generated Q&A missing initial version information when edited after installation ([#1436](https://github.com/apache/answer/pull/1436)) by [@krypt0n123](https://github.com/krypt0n123)

### Text Handling & Localization

* **Fixed**: Multi-byte rune boundary issue when truncating long titles ([#1431](https://github.com/apache/answer/pull/1431)) by [@ferhatelmas](https://github.com/ferhatelmas)

* **Fixed**: Null pointer access in UI when branding retrieval fails ([#1433](https://github.com/apache/answer/pull/1433)) by [@ferhatelmas](https://github.com/ferhatelmas)

* **Fixed**: Correct language handler usage (`GetLangByCtx`) for accurate language detection ([#1444](https://github.com/apache/answer/pull/1444)) by [@liruohrh](https://github.com/liruohrh)

---

## 🎨 Other Changes

* **Footer UI adjustment**
  The footer layout has been refined to reduce vertical space usage, resulting in a cleaner and more compact page layout.

---

## 🙌 Contributor Acknowledgments

A big thank you to everyone who contributed to this release through code, reviews, testing, and feedback. Your efforts help keep Apache Answer reliable and continuously improving.

Special thanks to the contributors (in alphabetical order):

* [@Dinesht04](https://github.com/Dinesht04)
* [@ferhatelmas](https://github.com/ferhatelmas)
* [@krypt0n123](https://github.com/krypt0n123)
* [@liruohrh](https://github.com/liruohrh)

---

**Upgrade now** to enjoy these improvements and fixes! If you encounter any issues, please report them on [GitHub](https://github.com/apache/answer/issues).

Happy browsing! 🎉

