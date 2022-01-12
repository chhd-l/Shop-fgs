module.exports = {
  important: true,
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './src/views/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  theme: {
    extend: {
      colors: {
        'rc-red': 'var(--rc-red)',
        'orange':'var(--orange)',
        'green':'var(--green)',
        'rc-green':'var(--rc-green)'
      },
      textColor:{
        'rc-red': 'var(--rc-red)',
        'orange':'var(--orange)',
        'green':'var(--green)',
        'rc-green':'var(--rc-green)'
      },
      minHeight: {
        'auto':'auto'
      },
      width: {
        '1/3': '30%'
      }
    }
  },
  plugins: [],
}
