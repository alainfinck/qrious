import type { Metadata } from 'next'
import { LegalPageShell, LegalSection } from '@/components/marketing/LegalPageShell'
import { Link } from '@/src/i18n/routing'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | QRious',
  description:
    'Politique de confidentialité QRious — protection des données personnelles et conformité RGPD.',
}

export default function ConfidentialitePage() {
  return (
    <LegalPageShell title="Politique de Confidentialité" updated="Août 2026">
      <LegalSection title="1. Introduction">
        <p>
          QRious.fr s&apos;engage à protéger votre vie privée. Cette politique explique comment nous
          collectons, utilisons et protégeons vos informations personnelles conformément au RGPD.
        </p>
      </LegalSection>

      <LegalSection title="2. Responsable du traitement">
        <p>
          QRious.fr — Alsace, France
          <br />
          Email :{' '}
          <a href="mailto:hello@qrious.fr" className="font-medium text-mq-signal-deep hover:underline">
            hello@qrious.fr
          </a>
          <br />
          Téléphone : 06 76 38 01 52
        </p>
      </LegalSection>

      <LegalSection title="3. Données collectées">
        <p>
          <strong className="text-mq-ink">Données fournies</strong> : identification (nom, email),
          contact, informations professionnelles, contenu des landings, messages.
        </p>
        <p>
          <strong className="text-mq-ink">Données automatiques</strong> : IP / localisation
          approximative, navigateur, pages visitées, données d&apos;usage, cookies (voir notre{' '}
          <Link href="/cookies" className="font-medium text-mq-signal-deep hover:underline">
            politique cookies
          </Link>
          ).
        </p>
      </LegalSection>

      <LegalSection title="4. Finalités">
        <ul className="list-disc space-y-1 pl-5">
          <li>Fournir et améliorer le service (QR dynamiques, landings, stats)</li>
          <li>Gérer comptes et abonnements</li>
          <li>Traiter vos demandes de support</li>
          <li>Analyser l&apos;usage (amélioration produit)</li>
          <li>Communications marketing (avec consentement)</li>
          <li>Obligations légales</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Base légale">
        <p>
          Exécution du contrat, consentement, intérêt légitime (amélioration du service) et
          obligation légale selon les cas.
        </p>
      </LegalSection>

      <LegalSection title="6. Destinataires">
        <p>
          Équipe interne autorisée, prestataires techniques, autorités si requis par la loi, et —
          pour les pages publiques — visiteurs qui scannent vos QR.
        </p>
      </LegalSection>

      <LegalSection title="7. Conservation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Compte : durée de l&apos;abonnement + 3 ans</li>
          <li>Connexion / logs : 12 mois</li>
          <li>Cookies : selon la politique cookies</li>
          <li>Marketing : jusqu&apos;au retrait du consentement</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Vos droits RGPD">
        <p>
          Accès, rectification, effacement, portabilité, opposition, limitation, retrait du
          consentement. Pour les exercer :{' '}
          <a href="mailto:hello@qrious.fr" className="font-medium text-mq-signal-deep hover:underline">
            hello@qrious.fr
          </a>
          . Vous pouvez aussi saisir la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-mq-signal-deep hover:underline"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection title="9. Sécurité">
        <p>
          Chiffrement en transit, accès restreint, surveillance, sauvegardes et bonnes pratiques
          internes de protection des données.
        </p>
      </LegalSection>

      <LegalSection title="10. Transferts internationaux">
        <p>
          En cas de transfert hors UE, des garanties appropriées sont mises en place (clauses types,
          décisions d&apos;adéquation, etc.).
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Email privacy / DPO :{' '}
          <a href="mailto:hello@qrious.fr" className="font-medium text-mq-signal-deep hover:underline">
            hello@qrious.fr
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
