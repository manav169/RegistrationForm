# Registration Page - React + Vite + Tailwind CSS

A modern registration form application with a beautiful sliding animation built with React, Vite, and Tailwind CSS v4.

## Features

- 🎨 Beautiful, responsive design with Tailwind CSS v4
- ✨ Smooth sliding animation for registration form
- 📱 Mobile-friendly responsive layout
- ✅ Form validation using Zod
- 🚀 Fast development with Vite
- 🎯 Modern React with hooks

## Prerequisites

Before running this project, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Getting Started

Follow these steps to run the project on your local machine:

### 1. Clone or Download the Project

If you haven't already, download or clone this project to your computer.

### 2. Navigate to Project Directory

Open your terminal/command prompt and navigate to the project folder:

```bash
cd registration-page
```

### 3. Install Dependencies

Install all required packages by running:

```bash
npm install
```

This will install all dependencies including:
- React and React DOM
- Vite (build tool)
- Tailwind CSS v4
- Zod (form validation)
- React Router DOM

### 4. Start Development Server

Run the development server:

```bash
npm run dev
```

### 5. Open in Browser

After running the command, you'll see output similar to:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and go to `http://localhost:5173/` to see the application.

## How to Use

1. **Home Page**: You'll see a welcome page with a "Registration Now" button
2. **Registration Form**: Click the button to see the registration form slide in from the right
3. **Form Validation**: Fill out the form - validation errors will appear if fields are invalid
4. **Close Form**: Click the X button or click outside the form to close it
5. **Submit**: Successfully filled forms will show a success message and log data to console

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── home-page/      # Home page component
│   └── registration-page/ # Registration form component
├── assets/             # Static assets
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Tailwind CSS imports
```

## Technologies Used

- **React 19** - UI library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zod** - TypeScript-first schema validation
- **React Router DOM** - Client-side routing

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.).

### Dependencies Issues
If you encounter dependency issues, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Loading
Make sure you have the correct Tailwind CSS v4 setup. The project uses:
- `@import "tailwindcss";` in `src/index.css`
- `@tailwindcss/vite` plugin in `vite.config.js`

## Browser Support

This project uses modern CSS features and supports:
- Chrome 111+
- Safari 16.4+
- Firefox 128+

For older browser support, consider using Tailwind CSS v3 instead.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
