# Release Guide

This guide explains how to manage releases for the Foundation Voice monorepo using Changesets.

## Prerequisites

- Node.js and npm installed
- Write access to the repository
- Authenticated with npm (for publishing)
- Latest changes pulled from `main` branch

## Release Process

### 1. Create a Changeset

After making your code changes, create a changeset to document them:

```bash
npm run changeset
```

Follow the interactive prompts to:
1. Select which packages have changed (space to select, enter to confirm)
2. Choose the version bump type (patch/minor/major) for each package
3. Write a human-readable description of the changes

### 2. Commit the Changeset

```bash
git add .changeset/
git commit -m "docs: add changeset for [brief description]"
```

### 3. Create a Pull Request (Recommended)

It's good practice to create a PR for the changeset before releasing:

```bash
git checkout -b release/prepare
git push -u origin release/prepare
# Create PR from your Git provider's UI
```

### 4. Version and Publish

Once the PR is approved and merged to `main`:

1. Pull the latest changes:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Version the packages (this updates versions and CHANGELOGs):
   ```bash
   npm run version-packages
   ```

3. Review the changes:
   ```bash
   git status
   git diff --staged
   ```

4. Commit the version changes:
   ```bash
   git add .
   git commit -m "chore(release): version packages"
   ```

5. Publish to npm:
   ```bash
   npm run release
   ```
   This will:
   - Build all packages
   - Publish to npm (if not already published)
   - Create git tags

6. Push the changes and tags:
   ```bash
   git push --follow-tags
   ```

## Versioning Strategy

- **Patch (0.0.X)**: Backwards-compatible bug fixes
- **Minor (0.X.0)**: New backwards-compatible features
- **Major (X.0.0)**: Breaking changes

## Troubleshooting

- If publishing fails, check npm registry authentication
- If versioning fails, ensure all changesets are properly formatted
- If you need to make changes after versioning but before publishing:
  1. Revert the version commit: `git reset --hard HEAD~1`
  2. Make your changes
  3. Run `npm run version-packages` again

## Best Practices

- Always create a changeset for any user-facing changes
- Write clear, concise change descriptions
- Keep changes focused and atomic
- Test thoroughly before releasing
- Consider using release candidates for major versions

## CI/CD Integration

For automated releases, consider setting up a CI/CD pipeline that:
1. Runs tests
2. Creates a release PR when changesets are merged to main
3. Automatically publishes when the release PR is merged

See the [Changesets documentation](https://github.com/changesets/changesets) for more advanced usage.
