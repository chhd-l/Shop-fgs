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
        'orange':'var(--orange)'
      },
      textColor:{
        'rc-red': 'var(--rc-red)',
        'orange':'var(--orange)'
      },
      minHeight: {
        'auto':'auto'
      }
    }
  },
  plugins: [],
}
