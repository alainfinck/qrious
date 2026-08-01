import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPageShell, LegalSection } from '@/components/marketing/LegalPageShell'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | QRious",
  description:
    "Conditions générales d'utilisation de la plateforme QRious — QR codes dynamiques et landing pages.",
}

export default function ConditionsPage() {
  return (
    <LegalPageShell title="Conditions Générales d'Utilisation" updated="Août 2026">
      <LegalSection title="1. Préambule">
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;utilisation
          du service QRious.fr, plateforme de création et de gestion de QR codes dynamiques et de
          landing pages. En utilisant nos services, vous acceptez ces conditions dans leur
          intégralité.
        </p>
      </LegalSection>

      <LegalSection title="2. Définitions">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-mq-ink">Service</strong> : la plateforme QRious.fr et ses
            fonctionnalités
          </li>
          <li>
            <strong className="text-mq-ink">Utilisateur</strong> : toute personne utilisant le
            service
          </li>
          <li>
            <strong className="text-mq-ink">Compte</strong> : l&apos;espace personnel de
            l&apos;utilisateur
          </li>
          <li>
            <strong className="text-mq-ink">Contenu</strong> : textes, images, médias et données
            associés aux pages
          </li>
          <li>
            <strong className="text-mq-ink">QR Code</strong> : le code QR généré ou lié au service
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Description du service">
        <p>QRious.fr propose notamment :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Création de QR codes et landing pages pour l&apos;art, l&apos;immobilier et les cartes de visite</li>
          <li>Gestion de contenu dynamique (modifiable sans réimpression)</li>
          <li>Personnalisation et marque blanche</li>
          <li>Statistiques d&apos;utilisation</li>
          <li>Support technique et assistance</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Inscription et compte">
        <p>
          Pour utiliser les fonctionnalités connectées, vous devez être majeur, fournir des
          informations exactes, protéger vos identifiants et nous notifier toute utilisation non
          autorisée. Vous êtes responsable des activités effectuées depuis votre compte.
        </p>
      </LegalSection>

      <LegalSection title="5. Utilisation du service">
        <p>
          Vous pouvez créer des QR / landings pour vos propres contenus ou ceux pour lesquels vous
          disposez des droits. Il est interdit d&apos;utiliser le service à des fins illégales, de
          publier du contenu illicite, de tenter de pirater le service, ou d&apos;automatiser son
          usage de manière abusive.
        </p>
      </LegalSection>

      <LegalSection title="6. Contenu utilisateur">
        <p>
          Vous conservez la propriété de votre contenu. Vous nous accordez une licence non exclusive
          pour l&apos;héberger et l&apos;afficher dans le cadre du service. Vous êtes responsable de
          l&apos;exactitude, de la légalité et des droits nécessaires sur ce contenu.
        </p>
      </LegalSection>

      <LegalSection title="7. Tarifs et paiement">
        <p>
          Les tarifs sont présentés sur la page{' '}
          <Link href="/pricing" className="font-medium text-mq-signal-deep hover:underline">
            Tarifs
          </Link>
          . Ils peuvent être modifiés avec un préavis de 30 jours. Les paiements s&apos;effectuent
          selon les modalités indiquées (carte ou virement). En cas de retard, le service peut être
          suspendu.
        </p>
      </LegalSection>

      <LegalSection title="8. Propriété intellectuelle">
        <p>
          QRious.fr et ses éléments (marque, design, code) sont protégés. Toute reproduction ou
          distribution sans autorisation écrite est interdite.
        </p>
      </LegalSection>

      <LegalSection title="9. Disponibilité">
        <p>
          Nous nous efforçons de maintenir le service disponible, sans garantir une disponibilité
          continue. Des maintenances peuvent être programmées avec préavis lorsque c&apos;est
          possible.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation de responsabilité">
        <p>
          Dans les limites autorisées par la loi, notre responsabilité est limitée aux dommages
          directs prouvés et au montant payé sur les 12 derniers mois. Nous ne sommes pas
          responsables des contenus utilisateur.
        </p>
      </LegalSection>

      <LegalSection title="11. Résiliation">
        <p>
          Vous pouvez résilier votre compte à tout moment. Nous pouvons résilier en cas de violation
          des CGU, usage frauduleux, non-paiement ou inactivité prolongée (plus de 12 mois).
        </p>
      </LegalSection>

      <LegalSection title="12. Protection des données">
        <p>
          Le traitement de vos données est décrit dans notre{' '}
          <Link href="/confidentialite" className="font-medium text-mq-signal-deep hover:underline">
            Politique de Confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="13. Droit applicable">
        <p>
          Les présentes CGU sont régies par le droit français. Tout litige relève des tribunaux
          français compétents.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Email :{' '}
          <a href="mailto:hello@qrious.fr" className="font-medium text-mq-signal-deep hover:underline">
            hello@qrious.fr
          </a>{' '}
          · Téléphone : 06 76 38 01 52
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
