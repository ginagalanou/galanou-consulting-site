# Galanou Consulting Website

This repository contains the public website for Galanou Consulting, a founder-led strategic advisory practice focused on healthcare transformation, stakeholder alignment, digital health and AI readiness, funding strategy, and execution support.

The site is built with Hugo using a customized version of the Hugo Serif theme. The repository still follows the original Hugo theme structure: the active site lives in `exampleSite/`, while the root-level folders provide the theme templates, styling, and static support files that Hugo uses during the build.

## Current site structure

```text
galanou-consulting-site/
  exampleSite/          Active website content, config, data, page overrides, and production images
  assets/               Theme SCSS and styling source files
  layouts/              Root Hugo theme layouts and partials
  static/               Root theme static files
  archetypes/           Optional Hugo content templates
  images/               Legacy/theme images; not generally used by the current site
  .gitignore            Ignore rules for local and generated files
  LICENSE               Original theme license; keep this file
  README.md             Project notes and maintenance guide
  netlify.toml          Build settings/reference for Hugo deployment
  theme.toml            Hugo theme metadata
