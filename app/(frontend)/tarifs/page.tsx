import { redirect } from 'next/navigation'

/** Alias FR pour /pricing (présent sur l’ancien site via #pricing / tarifs). */
export default function TarifsRedirectPage() {
  redirect('/pricing')
}
