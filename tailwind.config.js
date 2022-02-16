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
        'rc-green':'var(--rc-green)',
        'rc-f6':'var(--rc-f6)',
        'rc-ddd':'var(--rc-ddd)',
        'rc-detail-red':'var(--rc-detail-red)'
      },
      textColor:{
        'rc-red': 'var(--rc-red)',
        'orange':'var(--orange)',
        'green':'var(--green)',
        'rc-green':'var(--rc-green)',
        'rc-f6':'var(--rc-f6)',
        'rc-ddd':'var(--rc-ddd)',
        'rc-detail-red':'var(--rc-detail-red)'
      },
      fontSize:{
        '40':'40px'
      },
      minHeight: {
        'auto':'auto'
      },
      width: {
        '3/10': '30%'
      }
    }
  },
  plugins: [],
}
