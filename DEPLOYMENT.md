# Publish Afterlight on GitHub Pages

This project has no build step and uses relative asset paths, so it works at a GitHub project Pages URL.

## Browser route — no command line required

1. Sign in to <https://github.com>. Open <https://github.com/new>.
2. Owner: your account (the connected account observed in this session was `JamesPond298`). Repository name: `afterlight-studio`. Select **Public**. Click **Create repository**. If that name already exists, choose another name and use it in the final URL.
3. On the empty repository page choose **uploading an existing file**. Upload the **contents** of the extracted `afterlight-studio` folder, including `assets` and its files. `index.html`, `app.js`, `engine.js`, and `style.css` must be at the repository root, not nested inside another folder. Do not upload the ZIP file itself. The documentation, tests, package file, and preview server may also be included.
4. Enter a commit message such as `Add Afterlight studio simulator`, and click **Commit changes**. Use the default `main` branch.
5. Open the repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**. Select branch **main**, folder **/ (root)**, then **Save**.
6. Wait for the Pages deployment to finish. The **Actions** tab shows the `pages build and deployment` run. Return to **Settings → Pages** and use **Visit site**.
7. The expected URL for the account and name above is `https://JamesPond298.github.io/afterlight-studio/`. This is an expected destination, **not a verified deployed URL**. Use the actual URL GitHub displays.

If your account or organization has a policy disabling Pages, enable it through the account administrator or use another authorized public repository. No backend, paid service, API key, or environment variable is needed.

## CLI route — if GitHub CLI is installed

Open a terminal in the extracted project folder. Authenticate interactively; never paste a token into the source or commit it.

```sh
gh auth login
git init -b main
git add .
git commit -m "Add Afterlight studio simulator"
gh repo create afterlight-studio --public --source=. --remote=origin --push
gh api --method POST repos/{owner}/afterlight-studio/pages -f 'source[branch]=main' -f 'source[path]=/'
gh api repos/{owner}/afterlight-studio/pages --jq .html_url
```

If Pages is already enabled, skip the POST and inspect the existing settings. If Git asks for a commit identity, configure your own name and GitHub noreply address. The `{owner}` placeholder is expanded by GitHub CLI for the authenticated user.

## Check the published version

- Load the actual URL returned by GitHub. Confirm the logo, studio illustration, and controls appear.
- Create a small game, advance time, answer the first letter, polish and release.
- Advance one week and check that funds and copies sold increase.
- Reload and confirm the same week, cash, and catalog return.
- In Settings export a save, import it, and confirm the studio restores.
- Check a phone-sized screen and desktop; navigation scrolls sideways on narrow phones.
- Later changes: upload/commit replacement files to `main`; branch-based Pages republishes automatically. Browser autosaves remain associated with the same origin and save version.

GitHub documentation: [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
