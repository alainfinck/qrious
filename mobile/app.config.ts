import type { ConfigContext, ExpoConfig } from 'expo/config'

/** Projet EAS @alainfinck/qrious — écrit manuellement (app.config dynamique). */
const EAS_PROJECT_ID = 'dc89b0d6-9ce9-4857-b158-21f2a4d78d62'

/**
 * `experiments.baseUrl` : export web hébergé sous Next `public/newqr`
 * → https://…/newqr (dev Metro : http://localhost:8081/newqr)
 *
 * EAS : builds cloud, OTA (`expo-updates`), hosting web (`eas deploy`).
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  const projectId =
    process.env.EAS_PROJECT_ID ||
    (config.extra as { eas?: { projectId?: string } } | undefined)?.eas?.projectId ||
    EAS_PROJECT_ID

  return {
    ...config,
    name: 'QRious',
    slug: 'qrious',
    owner: process.env.EAS_OWNER || 'alainfinck',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'qrious',
    userInterfaceStyle: 'automatic',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'fr.qrious.app',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'fr.qrious.app',
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
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: `https://u.expo.dev/${projectId}`,
      fallbackToCacheTimeout: 0,
    },
    extra: {
      ...(typeof config.extra === 'object' && config.extra ? config.extra : {}),
      eas: {
        projectId,
      },
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-updates',
      [
        'expo-dev-client',
        {
          launchMode: 'most-recent',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission:
            'QRious a besoin de la caméra pour scanner les codes QR.',
          recordAudioAndroid: false,
          barcodeScannerEnabled: true,
        },
      ],
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
  }
}
