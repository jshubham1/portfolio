# 🚀 Shubham Jain - Senior Software Developer Portfolio

A modern, responsive portfolio website showcasing 10+ years of experience in Java, Spring Boot, Azure, and Microservices architecture.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Portfolio-blue?style=for-the-badge)](https://jshubham1.github.io/portfolio/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/jshubham1/portfolio?style=for-the-badge)](https://github.com/jshubham1/portfolio/stargazers)

## 🌟 Preview

![Portfolio Preview](https://via.placeholder.com/800x400/1a237e/ffffff?text=Portfolio+Preview)

## ✨ Features

### 🎨 Modern Design

- **Gradient backgrounds** with animated floating elements
- **Glass-morphism effects** for modern UI aesthetics
- **Smooth animations** and micro-interactions
- **Professional color scheme** (Navy Blue, Cyan, Orange)
- **Typography hierarchy** using Roboto \& Poppins fonts

### 📱 Fully Responsive

- **Mobile-first approach** for optimal performance
- **Responsive grid layouts** that adapt to all screen sizes
- **Touch-friendly navigation** for mobile devices
- **Optimized images** and assets for fast loading
- **Cross-browser compatibility** (Chrome, Firefox, Safari, Edge)


### 🚀 Performance Optimized

- **Lightweight codebase** with minimal dependencies
- **CSS Grid \& Flexbox** for efficient layouts
- **Optimized animations** using CSS transforms
- **Lazy loading** for images and content
- **SEO optimized** with proper meta tags

### 💼 Professional Sections

- **Hero Section** with animated profile and typing effects
- **Featured Projects** with live demo links and tech stacks
- **Professional Experience** with detailed timeline
- **Core Technologies** with clickable skill cards
- **Contact Form** with email integration

## 🛠️ Tech Stack

| Technology            | Purpose                                           |
|:----------------------|:--------------------------------------------------|
| **HTML5**             | Semantic structure and accessibility              |
| **CSS3**              | Modern styling with Grid, Flexbox, and animations |
| **JavaScript (ES6+)** | Interactive functionality and animations          |
| **Font Awesome 6**    | Professional icons throughout the site            |
| **Google Fonts**      | Custom typography (Roboto \& Poppins)             |
| **GitHub Pages**      | Free hosting and deployment                       |

## 🚀 Quick Start

### Prerequisites

- A modern web browser
- Git installed on your machine
- GitHub account for deployment

### 1. Clone the Repository

```

git clone https://github.com/jshubham1/portfolio.git
cd portfolio

```

### 2. Local Development

```


# Open with a local server (recommended)

# Using Python 3

python -m http.server 8000

# Using Node.js (if you have http-server installed)

npx http-server .

# Or simply open index.html in your browser

open index.html

```

### 3. Customize Your Content

1. **Update Personal Information**
```

<!-- In index.html, update these sections -->
<h1 class="name">Your Name</h1>
<p class="tagline">Your Professional Title</p>

```

2. **Add Your Profile Picture**
```

<!-- Replace the icon with your actual photo -->
<img src="your-profile-pic.jpg" alt="Your Name" class="profile-pic">

```

3. **Update Social Links**
```

<a href="https://www.linkedin.com/in/your-linkedin" target="_blank">
<a href="https://github.com/your-github" target="_blank">
<a href="mailto:your-email@domain.com">

```

4. **Customize Projects**

- Update project titles, descriptions, and images
- Add your actual project links and repositories
- Modify technology stacks for each project

5. **Update Experience Timeline**

- Add your work experience details
- Update company names, positions, and achievements
- Modify dates and locations

### 4. Deploy to GitHub Pages

#### Method 1: Direct Upload

1. Create a new repository on GitHub
2. Upload your files or push your code
3. Go to Settings → Pages
4. Select "Deploy from branch" → main → Save
5. Your site will be live at `https://jshubham1.github.io/repository-name/`

#### Method 2: GitHub Desktop

1. Open GitHub Desktop
2. Clone your repository
3. Make changes locally
4. Commit and push changes
5. Enable GitHub Pages in repository settings

## 🎨 Customization Guide

### Color Scheme

Update the CSS custom properties in `styles.css`:

```

:root {
--primary-color: \#1a237e;        /* Main brand color */
--secondary-color: \#00bcd4;      /* Accent color */
--accent-color: \#ff6f00;         /* Highlight color */
/* Add your preferred colors */
}

```

### Animations

All animations are CSS-based and can be customized:

```

.animate-on-scroll {
opacity: 0;
transform: translateY(50px);
transition: all 0.8s ease-out;
}

```

### Typography

Font families can be changed by updating the Google Fonts import:

```

<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap" rel="stylesheet">
```

## 📁 Project Structure

```

portfolio/
├── 📄 index.html          \# Main HTML file
├── 🎨 styles.css          \# All CSS styles and animations
├── ⚡ script.js           \# JavaScript functionality
├── 📖 README.md           \# This file
├── 📄 CNAME               \# Custom domain configuration (optional)
└── 📁 images/             \# Profile picture and project images
    ├── profile-pic.jpg    \# Your profile picture
    └── projects/          \# Project screenshots
        ├── project1.jpg
        ├── project2.jpg
        └── project3.jpg

```

## 🌐 Browser Support

| Browser | Version |
|:--------|:--------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## 📱 Responsive Breakpoints

| Device           | Breakpoint | Layout Changes                |
|:-----------------|:-----------|:------------------------------|
| **Desktop**      | 1200px+    | Full 2-column layout          |
| **Laptop**       | 1024px+    | Adjusted spacing              |
| **Tablet**       | 768px+     | Stacked hero section          |
| **Mobile**       | 480px+     | Single column, hamburger menu |
| **Small Mobile** | 320px+     | Optimized for small screens   |

## ⚡ Performance Tips

### Image Optimization

- Use WebP format for better compression
- Implement lazy loading for images below the fold
- Optimize images to appropriate sizes (profile: 400x400px)

### CSS Optimization

- Minimize unused CSS rules
- Use CSS custom properties for consistent theming
- Leverage CSS Grid and Flexbox for efficient layouts

### JavaScript Optimization

- Use modern ES6+ features
- Implement intersection observer for scroll animations
- Minimize DOM manipulations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for the comprehensive icon library
- **Google Fonts** for beautiful typography
- **Unsplash** for placeholder images
- **GitHub Pages** for free hosting
- **CSS Tricks** and **MDN** for web development resources

## 📞 Contact

**Shubham Jain** - Senior Backend Engineer at ABN AMRO Bank N.V.

- 💼 LinkedIn: [linkedin.com/in/jshubham](https://www.linkedin.com/in/jshubham)
- 🐱 GitHub: [github.com/jshubham](https://github.com/jshubham)
- 📧 Email: jshubham@live.in
- 📍 Location: Almere, Netherlands

---

⭐ **Star this repository if it helped you build your portfolio!**

## 🚀 Deployment Status

[![Deploy to GitHub Pages](https://github.com/jshubham1/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/jshubham1/portfolio/actions/workflows/deploy.yml)

### Live Demo

🌐 **[View Live Portfolio](https://jshubham1.github.io/portfolio/)**

---

*Built with ❤️ using modern web technologies*

```


##Additional Files to Include**

###LICENSE File** (MIT License)

```

MIT License

Copyright (c) 2025 Shubham Jain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.