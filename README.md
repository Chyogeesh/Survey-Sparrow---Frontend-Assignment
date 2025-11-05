# Calendar App (Vite + React + Tailwind)

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

5. Deploy to GitHub Pages:
   - Set `"homepage"` in package.json to `https://<your-username>.github.io/calendar-app`
   - Install `gh-pages` (already listed in devDependencies)
   - Run:
     ```bash
     npm run deploy
     ```

## Notes
- This project uses TailwindCSS. After `npm install`, initialize Tailwind if needed:
  ```bash
  npx tailwindcss -i ./src/index.css -o ./dist/assets/index.css --minify
  ```
- Events are in `public/events.json`. Edit that file to add more events.
