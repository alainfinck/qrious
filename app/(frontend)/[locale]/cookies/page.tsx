import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPageShell, LegalSection } from '@/components/marketing/LegalPageShell'

export const metadata: Metadata = {
  title: 'Politique des Cookies | QRious',
  description: 'Politique des cookies de QRious.fr — types, finalités et gestion du consentement.',
}

export default function CookiesPage() {
  return (
    <LegalPageShell title="Politique des Cookies" updated="Août 2026">
      <LegalSection title="1. Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d&apos;un
          site. Il permet de mémoriser actions, préférences et paramètres pendant une durée
          déterminée.
        </p>
      </LegalSection>

      <LegalSection title="2. Pourquoi des cookies ?">
        <ul className="list-disc space-y-1 pl-5">
          <li>Assurer le bon fonctionnement du site et de la session</li>
          <li>Mémoriser vos préférences</li>
          <li>Analyser l&apos;usage pour améliorer le service</li>
          <li>Sécuriser votre compte</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Types de cookies">
        <p>
          <strong className="text-mq-ink">Essentiels</strong> — session, sécurité (ex. CSRF).
          Indispensables, non désactivables via la bannière.
        </p>
        <p>
          <strong className="text-mq-ink">Performance</strong> — mesure d&apos;audience (ex. Google
          Analytics) pour comprendre le parcours et améliorer le produit.
        </p>
        <p>
          <strong className="text-mq-ink">Fonctionnalité</strong> — préférences d&apos;interface
          (thème, langue, notifications).
        </p>
        <p>
          <strong className="text-mq-ink">Marketing</strong> — éventuellement publicité / conversion
          (uniquement avec consentement).
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies tiers">
        <p>
          Des services tiers peuvent déposer des cookies (analytics, paiement, support). Ils
          disposent de leurs propres politiques. Consultez aussi notre{' '}
          <Link href="/confidentialite" className="font-medium text-mq-signal-deep hover:underline">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="5. Gestion">
        <p>
          Vous pouvez accepter, refuser les cookies non essentiels ou personnaliser vos préférences
          via la bannière (lorsqu&apos;elle est active), ou via les réglages de votre navigateur
          (Chrome, Firefox, Safari, Edge…).
        </p>
        <p>
          Désactiver certains cookies peut limiter des fonctionnalités ; les cookies essentiels
          restent nécessaires au fonctionnement.
        </p>
      </LegalSection>

      <LegalSection title="6. Durée">
        <p>
          Cookies de session : supprimés à la fermeture du navigateur. Cookies persistants : de
          quelques minutes à 24 mois selon le type. Cookies tiers : selon le prestataire.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Email :{' '}
          <a href="mailto:hello@qrious.fr" className="font-medium text-mq-signal-deep hover:underline">
            hello@qrious.fr
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
