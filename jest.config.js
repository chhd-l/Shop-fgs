const config = {
  // roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    // 'src/**/*.{js,jsx,ts,tsx}',
    // '!src/**/*.d.ts',
    'src/views/Checkout/Components/PayProductInfo/components/**/*.{js,jsx,ts,tsx}'
  ],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/utils/testSetup.js',
    '<rootDir>/node_modules/jest-enzyme/lib/index.js'
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    // '<rootDir>/src/views/Account/SubscriptionDetail/components/SubGoodsInfos/__tests__/**/*.{js,jsx,ts,tsx}'
    //"<rootDir>/src/utils/__tests__/**/*.{js,jsx,ts,tsx}"
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};

module.exports = config;
