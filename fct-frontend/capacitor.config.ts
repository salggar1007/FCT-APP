import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iesvirgendelcarmen.fct',
  appName: 'FCTApp',
  webDir: 'build',
  bundledWebRuntime: false,
  "plugins": {
    "FirebaseAuthentication": {
      "skipNativeAuth": true,
      "providers": ["google.com"]
    }
  }
};

export default config;
