[English](README_EN.md) | [中文](README.md)

# 2048 Game - React Router V7 Version

A classic 2048 number puzzle game built with React Router V7.

## 🎮 Game Features

- **Classic 2048 gameplay**: Move tiles with arrow keys and merge identical numbers
- **Responsive design**: Supports both desktop and mobile devices
- **Local storage**: Automatically saves game progress and best score
- **Modern UI**: Beautiful interface built with Tailwind CSS
- **Smooth animations**: Fluid tile movement and merging effects
- **Multi-page app**: Includes game, instructions, and about pages

## 🛠️ Tech Stack

- **React Router V7**: Modern React routing solution
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **pnpm**: Efficient package manager

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to start playing!

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## 🎯 How to Play

1. **Move tiles**: Use arrow keys (↑↓←→) or on-screen buttons on mobile
2. **Merge tiles**: When two tiles with the same number collide, they merge into one with double the value
3. **New tile generation**: After each move, a new tile (2 or 4) appears at a random empty spot
4. **Win condition**: Create a tile with "2048" to win
5. **Lose condition**: The game ends when the grid is full and no moves are possible

## 📱 Highlights

- **Auto-save**: Game state is automatically saved to local storage
- **Best score tracking**: Records and displays the highest score
- **Touch support**: Virtual buttons for mobile control
- **Keyboard shortcuts**: Play quickly with arrow keys
- **Game reset**: Restart the game at any time

## 🔧 Project Structure

```
app/
├── components/          # React components
│   ├── Game2048.tsx    # Main game component
│   └── Navigation.tsx  # Navigation component
├── lib/                # Core logic
│   ├── game2048.ts     # Game logic
│   └── storage.ts      # Local storage management
├── routes/             # Page routes
│   ├── home.tsx        # Game home page
│   ├── instructions.tsx # Game instructions
│   └── about.tsx       # About page
├── styles/             # Styles
│   └── game2048.css    # Game-specific styles
├── app.css             # Global styles
├── root.tsx            # Root component
└── routes.ts           # Route configuration
```

## 🎨 Style Customization

The game uses Tailwind CSS for styling. You can easily:

- Change tile colors: Edit color definitions in `app/styles/game2048.css`
- Adjust layout: Modify Tailwind class names in components
- Add animations: Use CSS animations to enhance user experience

## 📄 License

This project is open-sourced under the MIT License.

## 🤝 Contributing

Feel free to submit Issues and Pull Requests to improve this project!

---

Enjoy the game! 🎉
