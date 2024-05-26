const {
  createSentryMetroSerializer,
} = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');
const {getDefaultConfig} = require('expo/metro-config');

const config = {
  ...getDefaultConfig(__dirname),
  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};

module.exports = config;
