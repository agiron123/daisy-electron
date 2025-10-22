# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated CI/CD, security, and maintenance tasks for the Daisy Electron project.

## Workflows Overview

### 🚀 [CI Workflow](./ci.yml)
**Trigger:** Push to `main`/`develop` branches, Pull Requests

**What it does:**
- Tests the application on multiple Node.js versions (18.x, 20.x)
- Runs unit tests with coverage reporting
- Builds the React renderer and compiles the main Electron process
- Tests Electron app building on multiple platforms (Ubuntu, Windows, macOS)
- Uploads build artifacts for review

**Required Secrets:**
- `CODECOV_TOKEN` (optional) - For code coverage reporting

### 📦 [Release Workflow](./release.yml)
**Trigger:** Git tags matching `v*.*.*` pattern, Manual dispatch

**What it does:**
- Creates GitHub releases automatically
- Builds Electron apps for multiple platforms and architectures:
  - macOS (x64, ARM64)
  - Windows (x64)
  - Linux (x64)
- Uploads release assets (DMG, EXE, AppImage, etc.)
- Generates release notes automatically

**Usage:**
```bash
# Create and push a release tag
git tag v1.0.0
git push origin v1.0.0
```

### 🔒 [Security Workflow](./security.yml)
**Trigger:** Push to `main`/`develop`, Pull Requests, Weekly schedule (Mondays)

**What it does:**
- Runs `npm audit` to check for security vulnerabilities
- Performs dependency review on pull requests
- Runs CodeQL static analysis to detect security issues
- Checks for license compliance

### 🔄 [Update Dependencies](./update-dependencies.yml)
**Trigger:** Weekly schedule (Mondays), Manual dispatch

**What it does:**
- Automatically updates npm dependencies to their latest compatible versions
- Runs tests to ensure updates don't break functionality
- Creates pull requests with dependency updates
- Labels PRs appropriately for easy identification

### 🧹 [Stale Issues and PRs](./stale.yml)
**Trigger:** Daily schedule, Manual dispatch

**What it does:**
- Marks inactive issues as stale after 30 days
- Marks inactive PRs as stale after 14 days
- Closes stale items after 7 additional days
- Excludes pinned, security, bug, and enhancement issues/PRs

## Setup Instructions

### 1. Repository Settings
Ensure your repository has the following settings configured:

**Branch Protection Rules (for `main` branch):**
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Required status checks: `test`, `build`, `electron-build-test`

### 2. Secrets Configuration
Navigate to your repository's Settings → Secrets and variables → Actions:

**Optional Secrets:**
- `CODECOV_TOKEN` - Token for Codecov.io integration (sign up at codecov.io)

### 3. Permissions
The workflows use the default `GITHUB_TOKEN` which should have sufficient permissions for most operations. For the update dependencies workflow, ensure the token can:
- Create pull requests
- Push to branches
- Read repository contents

## Workflow Status Badges

Add these badges to your main README.md:

```markdown
[![CI](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/ci.yml)
[![Security](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/security.yml/badge.svg)](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/security.yml)
[![Release](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/release.yml/badge.svg)](https://github.com/YOUR_USERNAME/daisy-electron/actions/workflows/release.yml)
```

## Customizing Workflows

### Adjusting Node.js Versions
Edit the `strategy.matrix.node-version` in `ci.yml`:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add or remove versions
```

### Changing Release Platforms
Modify the `strategy.matrix` in `release.yml`:
```yaml
strategy:
  matrix:
    include:
      - os: macos-latest
        platform: mac
        arch: universal  # For universal macOS builds
      # Add or modify platform configurations
```

### Customizing Stale Bot
Adjust timing and messages in `stale.yml`:
```yaml
days-before-issue-stale: 60    # Increase to 60 days
days-before-issue-close: 14    # Increase close time
```

## Troubleshooting

### Common Issues

**1. Electron build fails on specific platforms**
- Check that all required dependencies are available on the target platform
- Verify electron-builder configuration in `package.json`

**2. Tests fail in CI but pass locally**
- Ensure test environment matches CI environment
- Check for hardcoded paths or platform-specific code

**3. Release workflow doesn't trigger**
- Verify tag format matches `v*.*.*` pattern
- Ensure you have push access to create releases

**4. Security workflow fails**
- Check npm audit output for high-severity vulnerabilities
- Update dependencies or add audit exceptions as needed

### Getting Help
- Check the Actions tab in your GitHub repository for detailed logs
- Review individual workflow runs for specific error messages
- Ensure all required secrets are properly configured