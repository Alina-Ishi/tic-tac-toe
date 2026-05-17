/** @type {import('tailwindcss').Config} */
module.exports = {
  // Указываем, в каких файлах Tailwind ищет классы
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  
  // Темная тема (можно включить)
  darkMode: 'class', // или 'media' для автоматического определения
  
  theme: {
    // Переопределяем стандартные брейкпоинты (опционально)
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    
    // Расширяем стандартную тему
    extend: {
      // Добавляем кастомные цвета
      colors: {
        'game-primary': '#1e3c72',
        'game-secondary': '#2a5298',
        'game-accent': '#e67e22',
        'win-bg': '#ffd966',
        'win-text': '#b45309',
      },
      
      // Добавляем кастомные анимации
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1.5s infinite',
        'win-pulse': 'winPulse 0.8s ease-in-out 3',
      },
      
      // Кастомные keyframes для анимаций
      keyframes: {
        winPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            backgroundColor: '#ffd966'
          },
          '50%': { 
            transform: 'scale(1.05)',
            backgroundColor: '#fbbf24'
          },
        }
      },
      
      // Добавляем кастомные шрифты
      fontFamily: {
        'game': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      
      // Добавляем кастомные размеры для клеток
      width: {
        'cell': '80px',
        'cell-sm': '60px',
        'cell-lg': '100px',
      },
      height: {
        'cell': '80px',
        'cell-sm': '60px',
        'cell-lg': '100px',
      },
      
      // Добавляем кастомные тени
      boxShadow: {
        'game': '0 20px 35px rgba(0,0,0,0.2)',
        'win': '0 0 15px rgba(255,193,7,0.8)',
        'hover': '0 10px 20px rgba(0,0,0,0.15)',
      },
      
      // Добавляем кастомные градиенты
      backgroundImage: {
        'game-gradient': 'linear-gradient(135deg, #1e3c72, #2a5298)',
        'win-gradient': 'linear-gradient(135deg, #ffd966, #ffb347)',
        'button-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  
  // Плагины для дополнительных функций
  plugins: [
    require('@tailwindcss/forms'), // для стилизации форм (опционально)
    require('@tailwindcss/typography'), // для типографики (опционально)
  ],
}