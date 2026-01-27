# Professional Portfolio Website

A modern, bilingual (English/Spanish) portfolio website. Features dark/light mode, responsive design, and automated deployment to GitHub Pages.

## ✨ Features

- 🌐 **Bilingual Support**: Switch between English and Spanish with persistent language preference
- 🌙 **Dark/Light Mode**: Theme toggle with system preference detection and localStorage persistence
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- ⚡ **Fast & Modern**: Built with TypeScript and Vite for optimal performance
- 📧 **Contact Form**: Integrated with EmailJS for email functionality without backend
- 🎨 **Professional Design**: Clean, modern UI with smooth animations
- 🚀 **Auto Deploy**: GitHub Actions workflow for automatic deployment to GitHub Pages

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, TypeScript
- **Build Tool**: Vite
- **Email Service**: EmailJS
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
my_web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── cv-en.pdf               # English CV (replace with yours)
│   └── cv-es.pdf               # Spanish CV (replace with yours)
├── src/
│   ├── main.ts                 # Main application entry point
│   ├── theme.ts                # Dark/light mode system
│   ├── i18n.ts                 # Internationalization system
│   └── styles.css              # Global styles
├── index.html                  # Main HTML file
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── .gitignore                  # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- A GitHub account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my_web.git
   cd my_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   This creates an optimized build in the `dist/` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization Guide

### 1. Personal Information

Edit [index.html](index.html) to update:
- **Line 48**: Your name in the hero section
- **Lines 67-76**: Social media links (GitHub, LinkedIn, Twitter, Email)
- **Line 335**: Your email address
- **Line 341**: Your location
- **Line 347**: Your GitHub username

### 2. Content Translation

Edit [src/i18n.ts](src/i18n.ts) to customize:
- English content (lines 60-200)
- Spanish content (lines 205-345)
- Projects, skills, about section, etc.

### 3. Projects

Update your projects in [src/i18n.ts](src/i18n.ts):
- Modify the `projects.items` array for both languages
- Add project links in [index.html](index.html) (project cards section)

### 4. CV Files

Replace placeholder PDF files:
1. Export your CV as PDF
2. Create English version: `public/cv-en.pdf`
3. Create Spanish version: `public/cv-es.pdf`

### 5. EmailJS Configuration

To enable the contact form:

1. **Sign up at [EmailJS](https://www.emailjs.com/)**

2. **Create an email service**
   - Go to Email Services
   - Connect your email provider (Gmail, Outlook, etc.)

3. **Create an email template**
   - Go to Email Templates
   - Create a new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_name}}` - Your name

4. **Get your credentials**
   - Service ID
   - Template ID
   - Public Key

5. **Update [src/main.ts](src/main.ts)**
   ```typescript
   const EMAILJS_CONFIG = {
     serviceId: 'your_service_id',
     templateId: 'your_template_id',
     publicKey: 'your_public_key',
   };
   ```

### 6. Colors & Styling

Modify CSS variables in [src/styles.css](src/styles.css):
- Light theme colors: lines 10-30
- Dark theme colors: lines 35-55

## 📦 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

**Setup Steps:**

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

3. **Wait for deployment**
   - Go to the **Actions** tab
   - Wait for the workflow to complete (usually 1-2 minutes)
   - Your site will be live at: `https://yourusername.github.io/my_web/`

### Option 2: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to gh-pages branch**
   ```bash
   # Install gh-pages if you haven't
   npm install -D gh-pages
   
   # Deploy
   npx gh-pages -d dist
   ```

3. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Select `gh-pages` branch as source
   - Click Save

### Important: Update Base Path

If your repository name is NOT `my_web`, update [vite.config.ts](vite.config.ts):

```typescript
export default defineConfig({
  base: '/your-repo-name/',  // Change this to match your repository name
  // ...
})
```

## 🐛 Troubleshooting

### Site not loading on GitHub Pages
- Check that the base path in `vite.config.ts` matches your repository name
- Verify GitHub Pages is enabled in repository settings
- Check the Actions tab for deployment errors

### Contact form not working
- Verify EmailJS credentials in `src/main.ts`
- Check browser console for error messages
- Ensure EmailJS service and template are active

### Styles not applying
- Clear browser cache
- Check that `src/styles.css` is imported in `index.html`
- Verify CSS variables are properly defined

### Build errors
- Delete `node_modules/` and run `npm install` again
- Check Node.js version (should be 18+)
- Review TypeScript errors in the console

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Your Name**
- GitHub: [@JulianGomezN](https://github.com/JulianGomezN)
- LinkedIn: [Julian Andres Gomez Niño](https://linkedin.com/in/julian-andres-gomez-niño-b91820186)
- Email: juliangomezni@gmail.com

---

Built with ❤️ using TypeScript, Vite, and modern web technologies.