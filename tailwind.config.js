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
      placeholderColor: {
        'primary': '#666666',
      },
      borderColor: {
        'form': '#808285',
        'form-ok': '#008900',
        'form-err': '#C03344'
      },
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
        'cs-gray': '#666666',
        'cs-gray-150': 'rgb(246, 246, 246)',
        'cs-gray-f6': '#f6f6f6'
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
        'cs-black': '#333333',
        'form-ok': '#008900',
        'form-err': '#C03344'
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
        40: '40px',
        '4vw': '4vw',
        'cs-40': '2.5rem'
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
        'cs-40': '2.5rem',
        'cs-48': '3rem',
        'cs-56': '3.5rem',
        'cs-60': '3.81rem',
        '4.3vw': '4.3vw'
      },
      minHeight: {
        auto: 'auto'
      },
      maxHeight: {
        242: '242px',
        300: '300px',
        420: '420px',
        500: '500px',
        '1/2-screen': '50vh'
      },
      maxWidth: {
        320: '320px',
        500: '500px',
        900: '900px',
        1400: '1400px'
      },
      minWidth: {
        200: '200px'
      },
      width: {
        'cs-29/100': '29%',
        '3/10': '30%',
        '9/10': '90%',
        'cs-31/100': '31%',
        'cs-55/100': '55%',
        'cs-73/100': '73%',
        'cs-77/100': '77.333333%',
        'cs-87/100': '87%',
        'cs-85/100': '85.333333%',
        'cs-41': '2.56rem',
        'cs-53': '3.31rem',
        'cs-63': '3.95rem',
        'cs-85': '5.3rem',
        'cs-106': '6.62rem',
        'cs-110': '6.87rem',
        'cs-148': '9.25rem',
        'cs-167': '10rem',
        'cs-186': '11.62rem',
        'cs-240': '15rem',
        'cs-244': '15.25rem',
        'cs-250': '15.62rem',
        'cs-288': '18rem',
        'cs-284': '17.75rem',
        'cs-285': '17.81rem',
        'cs-302': '18.87rem',
        'cs-300': '18.75rem',
        'cs-320': '20rem',
        'cs-340': '21.25rem',
        'cs-360': '22.5rem',
        'cs-392': '24.5rem',
        'cs-399': '24.93rem',
        'cs-439': '27.43rem',
        'cs-440': '27.5rem',
        'cs-470': '29.375rem',
        'cs-479': '29.93rem',
        'cs-480': '30rem',
        'cs-500': '31.25rem',
        'cs-520': '32.5rem',
        'cs-560': '35rem',
        'cs-600': '37.5rem',
        'lxl-636': '39.75rem',
        'cs-680': '42.5rem',
        'cs-714': '44.62rem',
        'lxl-814': '50.9rem',
        'cs-920': '57.5rem',
        'cs-960': '60rem',
        'cs-999': '62.43rem',
        'cs-1160': '72.5rem',
        'cs-1400': '87.5rem',
        'cs-48': '48rem'
      },
      height: {
        'cs-8': '0.5rem',
        'cs-34': '2.12rem',
        'cs-20': '1.25rem',
        'cs-40': '2.5rem',
        'cs-41': '2.56rem',
        'cs-48': '3rem',
        'cs-53': '3.31rem',
        'cs-56': '3.5rem',
        'cs-64': '4rem',
        'cs-63': '3.93rem',
        'cs-68': '4.25rem',
        'cs-74': '4.62rem',
        'cs-80': '5rem',
        'cs-84': '5.25rem',
        'cs-85': '5.3rem',
        'cs-88': '5.5rem',
        'cs-110': '6.87rem',
        'cs-114': '7.12rem',
        'cs-138': '8.62rem',
        'cs-143': '8.93rem',
        'cs-180': '11.25rem',
        'cs-157': '9.81rem',
        'cs-168': '10.5rem',
        'cs-174': '10.87rem',
        'cs-190': '11.87rem',
        'cs-200': '12.5rem',
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
        'cs-500': '31.25rem',
        'cs-556': '34.75rem',
        'cs-740': '46.25rem',
        'cs-780': '48.75rem',
        'cs-850': '53.13rem',
        'lxl-940': '58.75rem',
        'cs-1241': '77.56rem'
      },
      margin: {
        '54/10': '54%',
        '4r': '4rem',
        'cs-13.65': '0.85rem',
        'cs-16': '1rem',
        'cs-17': '1.06rem',
        'cs-18': '1.12rem',
        'cs-20': '1.25rem',
        'cs-22': '1.37rem',
        'cs-24': '1.5rem',
        'cs-32': '2rem',
        'cs-36': '2.25rem',
        'cs-30': '1.875rem',
        'cs-40': '2.5rem',
        'cs-48': '3rem',
        'cs-57': '3.56rem',
        'cs-64': '4rem',
        'cs-80': '5rem',
        'cs-100': '6.25rem',
        'cs-120': '7.5rem',
        'cs-232': '14.5rem',
        'cs-264': '16.5rem',
        'cs-272': '17rem',
        'cs-309': '19.31rem',
        'cs-340': '21.25rem',
        'cs-519': '32.43rem',
        'cs-521': '32.56rem',
        'cs-680': '42.5rem',
        'lxl-720': '45rem'
      },
      padding: {
        'cs-1': '1rem',
        'cs-2': '2rem',
        'cs-4': '4rem',
        'cs-6': '6rem',
        'cs-7': '7rem',
        'cs-8': '8rem',
        'cs-9': '9rem',
        'cs-14': '.875rem',
        'cs-17': '1.06rem',
        'cs-18': '1.12rem',
        'cs-24': '1.5rem',
        'cs-30': '1.875rem',
        'cs-40': '2.5rem',
        'cs-36': '2.25rem',
        'cs-54': '3.375rem',
        'cs-56': '3.5rem',
        'cs-66': '4.125rem',
        'cs-88': '5.5rem',
        'cs-100': '6.25rem',
        'cs-109': '6.8rem',
        'cs-200': '12.5rem',
        'cs-240': '15rem',
        'cs-272': '17rem',
        'cs-288': '18rem',
        'cs-304': '19rem',
        'cs-320': '20rem',
        'cs-408': '25.5rem'
      },
      flex: {
        'cs-justify-items': 'center',
        'cs-align-items': 'center',
        'cs-align-content': 'center'
      },
      fontFamily: {
        PingFangSC: 'var(--font-family-PingFangSC)'
      },
      inset: {
        'cs-89%': '89%',
        40: '2.5rem',
        102: '102px'
      },
      boxShadow: {
        sm: '0px 5px 12px 2px rgba(0,0,0,0.0700)'
      }
    }
  },
  plugins: []
};
