module.exports = {
  project: {
    ios: {},
    android: {},
  },
  // dependencies: {
  //   'react-native-vector-icons': {
  //     platforms: {
  //       ios: null,
  //     },
  //   },
  // },
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-config': { platforms: { android: null } },
  },
};

// Run script: npx react-native-asset after add font in 'src/main/assets/fonts'
