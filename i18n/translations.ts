import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { commonEN, commonRO } from './common';

export const t = new I18n({
  en: { common: commonEN },
  ro: { common: commonRO },
});

export const appLanguage = getLocales()[0].languageCode === 'ro' ? 'ro' : 'en';
t.locale = appLanguage;
