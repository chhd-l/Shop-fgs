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
      animation: ['hover'],
      textColor: ['active', 'hover']
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
        'rc-detail-red': 'var(--rc-detail-red)',
        primary: '#E2001A',
        'primary-star': '#F80000',
        'primary-gray': '#666666'
      },
      textColor: {
        'rc-red': 'var(--rc-red)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        'rc-green': 'var(--rc-green)',
        'rc-f6': 'var(--rc-f6)',
        'rc-ddd': 'var(--rc-ddd)',
        'rc-detail-red': 'var(--rc-detail-red)',
        'rc-title-red': '#E2001A',
        'rc-description-black': '#666666',
        primary: '#E2001A',
        'primary-star': '#F80000',
        'primary-gray': '#666666',
        black: '#333333'
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
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
        17.5: 1.75,
        34: '34px',
        32: '32px',
        36: '36px',
        24: '24px',
        26: '26px',
        48: '48px',
        56: '56px',
        60: '60px'
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
        '73/100': '73%',
        '77/100': '77.333333%',
        '87/100': '87%',
        '85/100': '85.333333%',
        53: '53px',
        106: '106px',
        110: '110px',
        186: '186px',
        240: '240px',
        244: '244px',
        288: '288px',
        284: '284px',
        285: '285px',
        302: '302px',
        320: '320px',
        360: '360px',
        392: '392px',
        399: '399px',
        439: '439px',
        440: '440px',
        479: '479px',
        480: '480px',
        520: '520px',
        560: '560px',
        600: '600px',
        680: '680px',
        714: '714px',
        920: '920px',
        960: '960px',
        999: '999px',
        1160: '1160px',
        1400: '1400px'
      },
      height: {
        34: '34px',
        20: '20px',
        40: '40px',
        48: '48px',
        53: '53px',
        56: '56px',
        64: '64px',
        63: '63px',
        68: '68px',
        74: '74px',
        80: '80px',
        114: '114px',
        157: '157px',
        84: '84px',
        88: '88px',
        110: '110px',
        138: '138px',
        143: '143px',
        168: '168px',
        174: '174px',
        190: '190px',
        234: '234px',
        238: '238px',
        246: '246px',
        285: '285px',
        253: '253px',
        328: '328px',
        334: '334px',
        340: '340px',
        369: '369px',
        409: '409px',
        431: '431px',
        449: '449px',
        450: '450px',
        489: '489px',
        1241: '1241px'
      },
      margin: {
        8: '8px',
        18: '18px',
        17: '17px',
        24: '24px',
        16: '16px',
        13.65: '13.65px',
        22: '22px',
        24.35: '24.35px',
        40: '40px',
        57: '57px',
        80: '80px',
        100: '100px',
        680.5: '680.5px',
        309: '309px',
        340: '340px',
        519: '519px',
        521: '521px'
      },
      padding: {
        17: '17px',
        18: '18px'
      },
      flex: {
        'justify-items': 'center',
        'align-items': 'center',
        'align-content': 'center',
        439: '439px',
        450: '450px',
        556: '556px'
      }
    }
  },
  plugins: []
};
