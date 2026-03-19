# Anant Singh Tanwar — Portfolio

> AI/ML Developer building intelligent systems and scalable applications.

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: React Icons
- **GitHub Graph**: `react-github-calendar`

## 🛠️ Local Development

```bash
npm install
npm run dev     # http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build   # outputs to dist/
npm run preview # preview prod build locally
```

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "chore: initial portfolio commit"
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework preset: **Vite** (auto-detected)
4. No environment variables required

### Step 3: Deploy
Click **Deploy** — Vercel will run `npm run build` automatically.

## 📁 Project Structure

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── data/        # Static data (projects, tech, achievements)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## ✨ Sections

- **Hero** – Name, title, bio, CTA buttons
- **GitHub Graph** – Live contribution calendar
- **Projects** – Selected work with tech badges & links
- **Tech Stack** – Categorized technology badges
- **Achievements** – Hackathon wins and awards
- **Contact** – Social links footer

---

Built with ❤️ by Anant Singh Tanwar
