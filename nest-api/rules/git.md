# Git branch name, commit message template

## Git branch name rule

Name format `<type>/<name>_<issue_no>`

#### `<type>`
```
fix    - Code changes linked to a known issue.
feat   - New feature.
hotfix - Quick fixes to the codebase.
```

#### `<name>`
Always use dashes to seperate words, and keep it short.

#### Examples
```
feat/renderer-cookies
hotfix/dockerfile-base-image_#215
fix/login-ie_#21
```
# Git branch name, commit message template

## Git branch name rule

Name format `<type>/<name>_<issue_no>`

#### `<type>`
```
fix    - Code changes linked to a known issue.
feat   - New feature.
hotfix - Quick fixes to the codebase.
```

#### `<name>`
Always use dashes to seperate words, and keep it short.

#### Examples
```
feat/renderer-cookies
hotfix/dockerfile-base-image_#215
fix/login-ie_#21
```

## Git message template
```
:bug: Bug Fix
:+1: Improvement
:sparkles: Add Small Feature
:tada: Add Big Feature
:recycle: Refactoring
:shower: Delete unused code
:green_heart: Test / CI improvement
:shirt: Fix to follow cording standard
:rocket: performance improvement
:up: Update related package
:lock: a-b testing for new feature
:cop: update for security

Tags & Issues:
[<optional state> #issueid] (50 chars or less) summary of changes

Example:
:bug: [Fixed #123][#124][#125] Torpedoes now sufficiently powered
:sparkles: [#123] Diverting power from warp drive to torpedoes
```

### Git message template configuration
Create ~/.gitmessage file with content above.

Set  ~/.gitmessage as default commit message template

```bash
git config --global commit.template ~/.gitmessage
```
## Git message template
```
:bug: Bug Fix
:+1: Improvement
:sparkles: Add Small Feature
:tada: Add Big Feature
:recycle: Refactoring
:shower: Delete unused code
:green_heart: Test / CI improvement
:shirt: Fix to follow cording standard
:rocket: performance improvement
:up: Update related package
:lock: a-b testing for new feature
:cop: update for security

Tags & Issues:
[<optional state> #issueid] (50 chars or less) summary of changes

Example:
:bug: [Fixed #123][#124][#125] Torpedoes now sufficiently powered
:sparkles: [#123] Diverting power from warp drive to torpedoes
```

### Git message template configuration
Create ~/.gitmessage file with content above.

Set  ~/.gitmessage as default commit message template

```bash
git config --global commit.template ~/.gitmessage
```