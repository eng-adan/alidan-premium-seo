# Quick Start: Testing & Publishing

## 🧪 Testing Locally (5 minutes)

### Option 1: npm link (Recommended)

```bash
# 1. Build the package
npm run build

# 2. Create a link
npm link

# 3. In your test Next.js project
cd /path/to/your/nextjs-project
npm link alidan-premium-seo

# 4. Test it
# Use the package in your Next.js app

# 5. When done, unlink
npm unlink alidan-premium-seo
cd /Users/dev/Development/plugins
npm unlink
```

### Option 2: Local file path

In your test project's `package.json`:
```json
{
  "dependencies": {
    "alidan-premium-seo": "file:../plugins"
  }
}
```

Then: `npm install`

## 📦 Publishing to npm (10 minutes)

### Prerequisites
- npm account (create at npmjs.com)
- Package built successfully

### Steps

```bash
# 1. Login to npm
npm login

# 2. Verify login
npm whoami

# 3. Build the package
npm run build

# 4. Check what will be published (dry run)
npm publish --dry-run

# 5. Publish!
npm publish
```

### After Publishing

Your package will be available at:
- **npm**: `npm install alidan-premium-seo`
- **yarn**: `yarn add alidan-premium-seo` (automatic, no extra steps!)

## 🔄 Updating the Package

```bash
# Update version (patch/minor/major)
npm version patch

# Build and publish
npm run build
npm publish
```

## ✅ Pre-Publish Checklist

- [ ] `npm run build` completes successfully
- [ ] `dist/` folder contains all files
- [ ] Tested locally with `npm link`
- [ ] Version number is correct
- [ ] README.md is up to date
- [ ] All exports work correctly

## 🆘 Common Issues

**"Package name already exists"**
- The name `alidan-premium-seo` might be taken
- Use a scoped package: `@your-username/alidan-premium-seo`
- Update `package.json` name field

**"You must verify your email"**
- Check your email and verify npm account

**"Missing files"**
- Ensure `dist/` folder is built
- Check `files` array in `package.json`

For detailed instructions, see:
- `TESTING.md` - Comprehensive testing guide
- `PUBLISHING.md` - Detailed publishing guide


