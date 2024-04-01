module.exports = function (api) {
  api.cache(false);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          allowUndefined: false,
          verbose: false,

          allowlist: [
            'APP_ENV',
            'API_URL',
            'ONBOARDING_KEY',
            'ONBOARDING_SHOW_DEV',
          ],
        },
      ],
    ],
  };
};
