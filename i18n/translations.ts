import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { authEN, authRO } from './auth';
import { commonEN, commonRO } from './common';
import { profileEN, profileRO } from './profile';

export const t = new I18n({
  en: { common: commonEN, auth: authEN, profile: profileEN },
  ro: { common: commonRO, auth: authRO, profile: profileRO },
});

export const appLanguage = getLocales()[0].languageCode === 'ro' ? 'ro' : 'en';
t.locale = appLanguage;
