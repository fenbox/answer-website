---
date: 2025-10-31
title: "Apache Answer 1.7.0: Quicklinks Plugin & Layout Improvements"
authors: [Robin]
category: Release
featured: true
image: 2025-11-05-cover@4x.png
description: "Answer 1.7.0 introduces Quicklinks plugin, layout improvements, schemaForm enhancements, responsive optimizations, and important bug fixes."
---

We're excited to announce the release of **Apache Answer v1.7.0**! This version brings significant improvements to the plugin ecosystem, user interface, and overall user experience. Thank you to all contributors who made this release possible.

:::caution

**Important Notice**: We have made a lot of layout changes in this version. If you have modified the page layout, there may be conflicts. Please remember to backup your old data before upgrading.

:::

## New Features

### Quicklinks Plugin

The Quicklinks plugin is now available and integrated by default, providing administrators with powerful navigation management capabilities. This plugin allows you to create custom quick links that help users navigate your community more efficiently.

- **New**: Quicklinks Plugin ([apache/answer-plugins#269](https://github.com/apache/answer-plugins/issues/269)) by [@shuashuai](https://github.com/shuashuai)
- **New**: Integrated Quicklinks plugin by default ([#1405](https://github.com/apache/answer/issues/1405)) by [@LinkinStars](https://github.com/LinkinStars)

## Improvements

### Form & Schema Enhancements

- **schemaForm support tagSelector component** ([#1380](https://github.com/apache/answer/pull/1380)) by [@shuashuai](https://github.com/shuashuai)  
  Plugin developers can now use tagSelector components in schemaForm, making it easier to create forms with tag selection capabilities.

### Layout & UI Improvements

- **The question detail page no longer displays the pinned status** ([#1393](https://github.com/apache/answer/pull/1393)) by [@shuashuai](https://github.com/shuashuai)  
  Cleaner question detail page without redundant pinned status indicators.

- **Unified question URL path** ([#1392](https://github.com/apache/answer/pull/1392)) by [@shuashuai](https://github.com/shuashuai)  
  Consistent URL structure for questions improves SEO and user experience.

- **Related will display an empty area when there is no content** ([#1394](https://github.com/apache/answer/pull/1394)) by [@Dinesht04](https://github.com/Dinesht04)  
  Better visual feedback when related content is not available.

- **Optimize responsive layout** ([#1406](https://github.com/apache/answer/pull/1406)) by [@shuashuai](https://github.com/shuashuai)  
  Enhanced mobile and tablet experience with improved responsive design.

### User Experience Enhancements

- **Make tags optional when creating new questions** ([#1177](https://github.com/apache/answer/pull/1177)) by [@Dinesht04](https://github.com/Dinesht04)  
  Users can now create questions without tags, providing more flexibility in question creation.

- **Make "Body" part of the question optional** ([#842](https://github.com/apache/answer/pull/842)) by [@Dinesht04](https://github.com/Dinesht04)  
  Questions can be created with just a title, allowing for simpler question formats.

### Command-Line Tool Enhancement

- **Add resetPassword option to command-line tool** ([#1400](https://github.com/apache/answer/pull/1400), [#1308](https://github.com/apache/answer/pull/1308)) by [@sosyz](https://github.com/sosyz)  
  Administrators can now reset user passwords directly from the command line, improving account management capabilities.

## Bug Fixes

### Image & Media Fixes

- **Fixed: Images in answers not correctly resized** ([#1404](https://github.com/apache/answer/pull/1404)) by [@shuashuai](https://github.com/shuashuai)  
  Images in answers now properly resize according to container dimensions.

### Notification System Fixes

- **Fixed: New Question Notification Message not get trigger_user** ([#1384](https://github.com/apache/answer/pull/1384), [#1385](https://github.com/apache/answer/pull/1385)) by [@light-white](https://github.com/light-white)  
  Notification messages now correctly include the trigger user information.

- **Fixed: New Question Notification Message not get new tag** ([#1382](https://github.com/apache/answer/pull/1382), [#1383](https://github.com/apache/answer/pull/1383)) by [@light-white](https://github.com/light-white)  
  Notifications now properly include new tag information when tags are added to questions.

### User & Authentication Fixes

- **Fixed: sync username character** ([#1397](https://github.com/apache/answer/pull/1397)) by [@sy-records](https://github.com/sy-records)  
  Username character synchronization issue resolved.

### Theme & Styling Fixes

- **Fixed: Dark Mode: Wrong background color for code block** ([#1368](https://github.com/apache/answer/pull/1368)) by [@Dinesht04](https://github.com/Dinesht04)  
  Code blocks now display correctly in dark mode with proper background colors.

### Plugin System Fixes

- **Fixed: Plugin installation: build failed failed to copy ui files** ([#1376](https://github.com/apache/answer/pull/1376)) by [@hgaol](https://github.com/hgaol)  
  Plugin installation now correctly copies UI files during the build process.

## New Contributors

We're thrilled to welcome new contributors to the Apache Answer community:

- [@light-white](https://github.com/light-white) made their first contribution in [#1382](https://github.com/apache/answer/pull/1382)

Thank you for joining our community and contributing to Apache Answer!

## Contributor Acknowledgments

Thank you to all developers and community members who contributed to v1.7.0! Your code contributions, issue reports, documentation improvements, and testing efforts made this release possible.

Special thanks to our contributors (in alphabetical order):

- [@Dinesht04](https://github.com/Dinesht04)
- [@hgaol](https://github.com/hgaol)
- [@light-white](https://github.com/light-white)
- [@LinkinStars](https://github.com/LinkinStars)
- [@shuashuai](https://github.com/shuashuai)
- [@sosyz](https://github.com/sosyz)
- [@sy-records](https://github.com/sy-records)

And all community members who participated in discussions, testing, and feedback.

For the complete changelog, please visit the [GitHub comparison page](https://github.com/apache/answer/compare/v1.6.0...v1.7.0).

## Join Us

Apache Answer is an open-source project, and we welcome all forms of contribution:

- **Code Contributions**: Submit PRs on [GitHub](https://github.com/apache/answer)
- **Issue Reports**: Report bugs or suggest features
- **Documentation Improvements**: Help improve documentation and translations
- **Community Support**: Help other users in forums and discussions

### Contact

- **Mailing List**: [dev@answer.apache.org](mailto:dev@answer.apache.org)
- **GitHub**: [apache/answer](https://github.com/apache/answer)
- **Official Website**: [answer.apache.org](https://answer.apache.org)
- **Documentation**: [answer.apache.org/docs](https://answer.apache.org/docs/)

Let's build a better Q&A platform together!
