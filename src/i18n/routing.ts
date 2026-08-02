import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['fr', 'en', 'de', 'it', 'es', 'pl'] as const;
export const defaultLocale = 'fr' as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' 
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
