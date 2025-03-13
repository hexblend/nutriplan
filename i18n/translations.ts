import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { authEN, authRO } from './auth';
import { commonEN, commonRO } from './common';

export const t = new I18n({
  en: { common: commonEN, auth: authEN },
  ro: { common: commonRO, auth: authRO },
});

export const appLanguage = getLocales()[0].languageCode === 'ro' ? 'ro' : 'en';
t.locale = appLanguage;
