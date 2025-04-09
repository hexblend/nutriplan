import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { authEN, authRO } from './auth';
import { commonEN, commonRO } from './common';
import { plansEN, plansRO } from './plans';
import { profileEN, profileRO } from './profile';

export const t = new I18n({
  en: { common: commonEN, auth: authEN, profile: profileEN, plans: plansEN },
  ro: { common: commonRO, auth: authRO, profile: profileRO, plans: plansRO },
});

const defaultLanguage = getLocales()[0].languageCode === 'ro' ? 'ro' : 'en';

export const setAppLanguage = (profileLanguage?: string | null) => {
  if (profileLanguage) t.locale = profileLanguage;
  else t.locale = defaultLanguage;
};
