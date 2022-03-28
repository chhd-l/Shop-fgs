module.exports = {
  important: true,
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true
  },
  purge: {
    content: [
      './src/views/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      safelist: {
        standard: ['outline-none']
      }
    }
  },
  variants: {
    extend: {
      animation: ['hover']
    }
  },
  theme: {
    extend: {
      colors: {
        'rc-red': 'var(--rc-red)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        'rc-green': 'var(--rc-green)',
        'rc-f6': 'var(--rc-f6)',
        'rc-ddd': 'var(--rc-ddd)',
        'rc-detail-red': 'var(--rc-detail-red)'
      },
      textColor: {
        'rc-red': 'var(--rc-red)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        'rc-green': 'var(--rc-green)',
        'rc-f6': 'var(--rc-f6)',
        'rc-ddd': 'var(--rc-ddd)',
        'rc-detail-red': 'var(--rc-detail-red)'
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        22: '22px',
        20: '20px',
        21: '21px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        36: '36px',
        38: '38px',
        40: '40px'
      },
      lineHeight: {
        12: 1.2,
        13.3: 1.33,
        14: 1.4,
        17.5: 1.75
      },
      minHeight: {
        auto: 'auto'
      },
      maxHeight: {
        '1/2-screen': '50vh'
      },
      width: {
        '3/10': '30%',
        '55/100': '55%',
        '77/100': '77.333333%',
        '87/100': '87%',
        '85/100': '85.333333%',

        439: '439px',
        480: '480px',
        560: '560px',
        600: '600px'
      },
      height: {
        68: '68px',
        168: '168px',
        340: '340px',
        431: '431px',
        450: '450px'
      }
    }
  },
  plugins: []
};
