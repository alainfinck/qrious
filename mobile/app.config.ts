import type { ConfigContext, ExpoConfig } from 'expo/config'

/**
 * `experiments.baseUrl` : export web hébergé sous Next `public/newqr`
 * → https://…/newqr (dev Metro : http://localhost:8081/newqr)
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'QRious',
  slug: 'qrious',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'qrious',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    baseUrl: '/newqr',
  },
})
