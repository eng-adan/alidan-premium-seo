# Publishing Guide

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **GitHub repository**: Create a repo for your package
3. **Build the package**: Ensure it compiles without errors

## Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Update `README.md` with accurate information
- [ ] Test the package locally using `npm link`
- [ ] Build the package: `npm run build`
- [ ] Verify `dist/` folder contains compiled files
- [ ] Check that all exports work
- [ ] Update CHANGELOG if you have one
- [ ] Ensure `.gitignore` excludes `node_modules` and `dist`

## Step-by-Step Publishing

### 1. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- OTP (if 2FA is enabled)

### 2. Verify you're logged in

```bash
npm whoami
```

### 3. Build the package

```bash
npm run build
```

Verify the `dist/` folder exists and contains:
- `index.js`
- `index.d.ts`
- All compiled files

### 4. Check package name availability

```bash
npm view alidan-premium-seo
```

If it returns 404, the name is available. If it shows package info, the name is taken.

### 5. Dry run (test without publishing)

```bash
npm publish --dry-run
```

This shows what would be published without actually publishing.

### 6. Publish to npm

```bash
npm publish
```

For scoped packages (if you change to `@your-org/alidan-premium-seo`):
```bash
npm publish --access public
```

### 7. Verify publication

Check on npm:
```
https://www.npmjs.com/package/alidan-premium-seo
```

## Version Management

### Semantic Versioning

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update version

```bash
# Patch
npm version patch

# Minor
npm version minor

# Major
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git tag
- Commits the change

Then publish:
```bash
npm publish
```

## Publishing to Yarn

**Good news**: When you publish to npm, it's automatically available on Yarn! Users can install with:

```bash
yarn add alidan-premium-seo
```

No additional steps needed.

## Post-Publishing

1. **Create a GitHub release** with the same version
2. **Update documentation** if needed
3. **Share on social media** or relevant communities
4. **Monitor for issues** on GitHub and npm

## Troubleshooting

### Error: Package name already exists
- Choose a different name
- Or use a scoped package: `@your-org/alidan-premium-seo`

### Error: You must verify your email
- Check your email and verify your npm account

### Error: Missing files
- Check `files` array in `package.json`
- Ensure `dist/` folder is built

### Error: Unauthorized
- Run `npm login` again
- Check you're using the correct account

## Updating the Package

1. Make your changes
2. Update version: `npm version patch|minor|major`
3. Build: `npm run build`
4. Publish: `npm publish`

## Unpublishing (Emergency Only)

⚠️ **Warning**: Only unpublish within 72 hours of publishing

```bash
npm unpublish alidan-premium-seo@1.0.0
```

Or to unpublish all versions (not recommended):
```bash
npm unpublish alidan-premium-seo --force
```


