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
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '40':'40px',
      },
      lineHeight: {
        '12': 1.2,
        '13.3': 1.33,
        '14': 1.4,
        '17.5': 1.75
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
