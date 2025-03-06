import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
export const t = new I18n({
  en: { welcome: 'Hello' },
  ro: { welcome: 'Bun venit' },
});

// Set the locale once at the beginning of your app.
export const appLanguage = getLocales()[0].languageCode === 'ro' ? 'ro' : 'en';
t.locale = appLanguage;
