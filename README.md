# Adewumi David — Portfolio (React)

A professional, fully responsive React portfolio website styled with the dark Developer X theme.

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
```
The `build/` folder is ready to deploy.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / Navbar.css
│   ├── Hero.jsx   / Hero.css
│   ├── Stats.jsx  / Stats.css
│   ├── About.jsx  / About.css
│   ├── Skills.jsx / Skills.css
│   ├── Services.jsx / Services.css
│   ├── Portfolio.jsx / Portfolio.css
│   ├── Contact.jsx / Contact.css
│   ├── Footer.jsx / Footer.css
│   └── BackToTop.jsx / BackToTop.css
├── App.jsx
├── index.js
└── index.css       ← global styles & CSS variables
```

---

## 🖼️ Adding Your Photo

1. Put your photo file (e.g. `david.jpg`) inside the `public/` folder.
2. In `Hero.jsx` and `About.jsx`, replace:
```jsx
src="https://ui-avatars.com/api/..."
```
with:
```jsx
src="/david.jpg"
```

---

## 📧 Connecting the Contact Form

In `Contact.jsx`, replace the `setTimeout` mock with a real service:

**Option A — EmailJS (free, no backend needed):**
```bash
npm install emailjs-com
```
```js
import emailjs from 'emailjs-com';
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID');
```

**Option B — Formspree:**
Change `onSubmit` to post to `https://formspree.io/f/YOUR_FORM_ID`.

---

## 🌐 Deploying

**Vercel (recommended):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
1. Run `npm run build`
2. Drag the `build/` folder to [netlify.com/drop](https://netlify.com/drop)

**GitHub Pages:**
```bash
npm install gh-pages
```
Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```
Then run: `npm run deploy`

---

## 🎨 Customising Colors

All colors are in `src/index.css` under `:root {}`.  
Change `--accent` to any color to rebrand the whole site instantly.

---

Built with ❤️ using React 18
