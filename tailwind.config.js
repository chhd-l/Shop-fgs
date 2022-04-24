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
        'rc-f9': 'var(--rc-f9)',
        'rc-ddd': 'var(--rc-ddd)',
        'rc-detail-red': 'var(--rc-detail-red)',
        'cs-primary': '#E2001A',
        'cs-star': '#F80000',
        'cs-gray': '#666666'
      },
      textColor: {
        'rc-red': 'var(--rc-red)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        'rc-green': 'var(--rc-green)',
        'rc-f6': 'var(--rc-f6)',
        'rc-f9': 'var(--rc-f9)',
        'rc-ddd': 'var(--rc-ddd)',
        'rc-detail-red': 'var(--rc-detail-red)',
        'cs-gray': '#666666',
        'cs-black': '#333333'
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        22: '22px',
        20: '20px',
        21: '21px',
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
        17.5: 1.75,
        'cs-34': '2.12rem',
        'cs-32': '2rem',
        'cs-36': '2.25rem',
        'cs-24': '1.5rem',
        'cs-26': '1.62rem',
        'cs-48': '3rem',
        'cs-56': '3.5rem',
        'cs-60': '3.81rem'
      },
      minHeight: {
        auto: 'auto'
      },
      maxHeight: {
        '1/2-screen': '50vh'
      },
      width: {
        '3/10': '30%',
        'cs-55/100': '55%',
        'cs-73/100': '73%',
        'cs-77/100': '77.333333%',
        'cs-87/100': '87%',
        'cs-85/100': '85.333333%',
        'cs-53': '3.31rem',
        'cs-63': '3.95rem',
        'cs-106': '6.62rem',
        'cs-110': '6.87rem',
        'cs-186': '11.62rem',
        'cs-240': '15rem',
        'cs-244': '15.25rem',
        'cs-288': '18rem',
        'cs-284': '17.75rem',
        'cs-285': '17.81rem',
        'cs-302': '18.87rem',
        'cs-320': '20rem',
        'cs-340': '21.25rem',
        'cs-360': '22.5rem',
        'cs-392': '24.5rem',
        'cs-399': '24.93rem',
        'cs-439': '27.43rem',
        'cs-440': '27.5rem',
        'cs-479': '29.93rem',
        'cs-480': '30rem',
        'cs-520': '32.5rem',
        'cs-560': '35rem',
        'cs-600': '37.5rem',
        'cs-680': '42.5rem',
        'cs-714': '44.62rem',
        'cs-920': '57.5rem',
        'cs-960': '60rem',
        'cs-999': '62.43rem',
        'cs-1160': '72.5rem',
        'cs-1400': '87.5rem'
      },
      height: {
        'cs-34': '2.12rem',
        'cs-20': '1.25rem',
        'cs-40': '2.5rem',
        'cs-48': '3rem',
        'cs-53': '3.31rem',
        'cs-56': '3.5rem',
        'cs-64': '4rem',
        'cs-63': '3.93rem',
        'cs-68': '4.25rem',
        'cs-74': '4.62rem',
        'cs-80': '5rem',
        'cs-84': '5.25rem',
        'cs-88': '5.5rem',
        'cs-110': '6.87rem',
        'cs-114': '7.12rem',
        'cs-138': '8.62rem',
        'cs-143': '8.93rem',
        'cs-157': '9.81rem',
        'cs-168': '10.5rem',
        'cs-174': '10.87rem',
        'cs-190': '11.87rem',
        'cs-234': '14.62rem',
        'cs-238': '14.87rem',
        'cs-246': '15.37rem',
        'cs-253': '15.81rem',
        'cs-262': '16.43rem',
        'cs-285': '17.81rem',
        'cs-328': '20.5rem',
        'cs-334': '20.875rem',
        'cs-340': '21.25rem',
        'cs-359': '22.43rem',
        'cs-369': '23.06rem',
        'cs-409': '25.56rem',
        'cs-420': '26.25rem',
        'cs-431': '26.93rem',
        'cs-439': '27.43rem',
        'cs-449': '28.06rem',
        'cs-450': '28.12rem',
        'cs-489': '30.56rem',
        'cs-556': '34.75rem',
        'cs-1241': '77.56rem'
      },
      margin: {
        '4r': '4rem',
        'cs-13.65': '0.85rem',
        'cs-16': '1rem',
        'cs-17': '1.06rem',
        'cs-18': '1.12rem',
        'cs-22': '1.37rem',
        'cs-24': '1.5rem',
        'cs-40': '2.5rem',
        'cs-57': '3.56rem',
        'cs-64': '4rem',
        'cs-80': '5rem',
        'cs-100': '6.25rem',
        'cs-309': '19.31rem',
        'cs-340': '21.25rem',
        'cs-519': '32.43rem',
        'cs-521': '32.56rem',
        'cs-680': '42.5rem'
      },
      padding: {
        'cs-17': '1.06rem',
        'cs-18': '1.12rem'
      },
      flex: {
        'cs-justify-items': 'center',
        'cs-align-items': 'center',
        'cs-align-content': 'center'
      }
    }
  },
  plugins: []
};
