import { permanentRedirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ type: string }>
}

/** L’éditeur unique est l’app Expo, servie sous /newqr. */
export default async function GenerateurTypePage({ params }: PageProps) {
  const { type } = await params
  permanentRedirect(`/newqr?type=${encodeURIComponent(type)}`)
}
