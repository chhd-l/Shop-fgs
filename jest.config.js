const config = {
  roots: ['<rootDir>/src'],
  verbose: true,
  collectCoverage: true,
  coverageProvider: 'babel',
  collectCoverageFrom: [
    // "src/**/*.{js,jsx,ts,tsx}",
    '!src/**/*.d.ts',
    // "src/views/Account/SubscriptionDetail/components/HandledSpecSelect/**/*.{js,jsx,ts,tsx}",
    //"src/views/Account/Subscription/index.{js,jsx,ts,tsx}"
    // "src/utils/init.{js,jsx,ts,tsx}"
    // "src/views/Register/index.{js,jsx,ts,tsx}"
    'src/components/RouteFilter/index.{js,jsx,ts,tsx}'
  ],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js',
    '<rootDir>/src/utils/testSetup.js',
    '<rootDir>/node_modules/jest-enzyme/lib/index.js'
  ],
  testMatch: [
    // "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    // "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    // "<rootDir>/src/views/Account/SubscriptionDetail/components/HandledSpecSelect/__tests__/**/*.{js,jsx,ts,tsx}",
    // "<rootDir>src/views/Details/components/OSSReceiveBackNotificationContent/__test__/**/*.{js,jsx,ts,tsx}"
    //"<rootDir>src/views/Account/Subscription/__test__/**/*.{js,jsx,ts,tsx}"
    // "<rootDir>/src/utils/__tests__/init.test.{js,jsx,ts,tsx}"
    // "<rootDir>/src/views/Register/__test__/index.test.{js,jsx,ts,tsx}"
    '<rootDir>/src/components/RouteFilter/__test__/*.{js,jsx,ts,tsx}'
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
