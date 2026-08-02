import { permanentRedirect } from 'next/navigation'

/** L’éditeur unique est l’app Expo, servie sous /newqr. */
export default function GenerateurPage() {
  permanentRedirect('/newqr')
}
