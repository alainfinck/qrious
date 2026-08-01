import type { CollectionConfig } from 'payload'

const isVertical =
  (vertical: 'generic' | 'art' | 'immo' | 'vcard' | 'product' | 'feedback' | 'tourism' | 'chrd' | 'corporate_event' | 'ugc_retail' | 'field_service') =>
  (data: Record<string, unknown>) =>
    data?.vertical === vertical

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  labels: {
    singular: 'QR Code',
    plural: 'QR Codes',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'vertical', 'status', 'updatedAt'],
    group: 'QRious',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Identifiant URL du QR code (ex: mon-artwork-2024)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'vertical',
      type: 'select',
      required: true,
      options: [
        { label: 'Générique', value: 'generic' },
        { label: 'Art', value: 'art' },
        { label: 'Immobilier / Gîte', value: 'immo' },
        { label: 'Carte de visite', value: 'vcard' },
        { label: 'Manuel / Produit', value: 'product' },
        { label: 'Avis / Feedback', value: 'feedback' },
        { label: 'Tourisme / Patrimoine', value: 'tourism' },
        { label: 'CHRD (Hôtel / Resto)', value: 'chrd' },
        { label: 'Événementiel Corporate', value: 'corporate_event' },
        { label: 'Retail & UGC Promo', value: 'ugc_retail' },
        { label: 'Field Service & Maintenance', value: 'field_service' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'theme',
      type: 'group',
      label: 'Thème (Marque blanche)',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          label: 'Couleur primaire',
          defaultValue: '#0f172a',
          admin: {
            description: 'Code hexadécimal (ex: #2563eb)',
          },
        },
        {
          name: 'logo',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'genericData',
      type: 'group',
      label: 'Page générique',
      admin: {
        condition: isVertical('generic'),
      },
      fields: [
        {
          name: 'headline',
          type: 'text',
          label: 'Titre affiché',
        },
        {
          name: 'subheadline',
          type: 'text',
          label: 'Sous-titre',
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Texte principal',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'Bouton principal — libellé',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          label: 'Bouton principal — URL',
        },
        {
          name: 'secondaryCtaLabel',
          type: 'text',
          label: 'Bouton secondaire — libellé',
        },
        {
          name: 'secondaryCtaUrl',
          type: 'text',
          label: 'Bouton secondaire — URL',
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Site web',
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Téléphone',
        },
        {
          name: 'sections',
          type: 'array',
          label: 'Sections libres',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre',
              required: true,
            },
            {
              name: 'body',
              type: 'textarea',
              label: 'Contenu',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'artData',
      type: 'group',
      label: "Fiche d'œuvre d'art",
      admin: {
        condition: isVertical('art'),
      },
      fields: [
        // ─── Artiste ───────────────────────────────────────────────
        {
          name: 'artistName',
          type: 'text',
          label: "Nom de l'artiste",
        },
        {
          name: 'artistBio',
          type: 'textarea',
          label: "Biographie de l'artiste",
          admin: {
            description: 'Courte présentation de l\'artiste (formation, style, influences…)',
          },
        },
        {
          name: 'artistNationality',
          type: 'text',
          label: 'Nationalité',
        },
        {
          name: 'artistBirthYear',
          type: 'text',
          label: 'Année de naissance',
          admin: { description: 'Ex: 1985' },
        },

        // ─── Œuvre ─────────────────────────────────────────────────
        {
          name: 'year',
          type: 'text',
          label: 'Année de création',
          admin: { description: 'Ex: 2024 ou 2022–2024' },
        },
        {
          name: 'medium',
          type: 'text',
          label: 'Médium / Technique',
          admin: { description: 'Ex: Huile sur toile, Aquarelle, Sculpture bronze…' },
        },
        {
          name: 'dimensions',
          type: 'text',
          label: 'Dimensions',
          admin: { description: 'Ex: 80 × 60 cm' },
        },
        {
          name: 'series',
          type: 'text',
          label: 'Série / Collection',
        },
        {
          name: 'edition',
          type: 'text',
          label: 'Édition / Numérotation',
          admin: { description: 'Ex: 3/10, Pièce unique, Épreuve d\'artiste' },
        },
        {
          name: 'certificate',
          type: 'text',
          label: "Certificat d'authenticité",
          admin: { description: 'Ex: Certificat signé, Avec COA, Sans certificat' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: "Description / Note de l'artiste",
          admin: {
            description: 'Note de l\'artiste, contexte de création, démarche artistique…',
          },
        },

        // ─── Prix & marché ─────────────────────────────────────────
        {
          name: 'price',
          type: 'number',
          label: 'Prix (montant)',
        },
        {
          name: 'currency',
          type: 'select',
          label: 'Devise',
          options: [
            { label: '€ EUR', value: 'EUR' },
            { label: '$ USD', value: 'USD' },
            { label: '£ GBP', value: 'GBP' },
            { label: 'CHF', value: 'CHF' },
          ],
          defaultValue: 'EUR',
        },
        {
          name: 'available',
          type: 'checkbox',
          label: 'Disponible à la vente',
          defaultValue: true,
        },
        {
          name: 'sold',
          type: 'checkbox',
          label: 'Vendu',
          defaultValue: false,
        },

        // ─── Exposition ────────────────────────────────────────────
        {
          name: 'exhibitionName',
          type: 'text',
          label: "Nom de l'exposition",
        },
        {
          name: 'exhibitionLocation',
          type: 'text',
          label: 'Lieu / Galerie',
        },
        {
          name: 'exhibitionDates',
          type: 'text',
          label: "Dates de l'exposition",
          admin: { description: 'Ex: 15 jan. – 10 mars 2025' },
        },

        // ─── Médias ─────────────────────────────────────────────────
        {
          name: 'videoUrl',
          type: 'text',
          label: 'URL vidéo (YouTube, Vimeo…)',
        },
        {
          name: 'audioGuideUrl',
          type: 'text',
          label: 'Audio-guide (URL MP3 ou Soundcloud)',
        },

        // ─── Liens ──────────────────────────────────────────────────
        {
          name: 'instagramUsername',
          type: 'text',
          label: "Instagram de l'artiste (handle)",
          admin: { description: 'Ex: @nom_artiste ou nom_artiste' },
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: "Site web de l'artiste",
        },
        {
          name: 'shopUrl',
          type: 'text',
          label: "Lien d'achat direct",
          admin: { description: 'Lien vers la boutique en ligne ou la galerie' },
        },
        {
          name: 'contactEmail',
          type: 'email',
          label: 'Email contact pour acquisition',
        },
      ],
    },
    {
      name: 'immoData',
      type: 'group',
      label: 'Données Immobilier / Livret d\'accueil',
      admin: {
        condition: isVertical('immo'),
      },
      fields: [
        // ─── Infos de base ───────────────────────────────────────
        {
          name: 'propertyType',
          type: 'select',
          label: 'Type de bien',
          options: [
            { label: 'Appartement', value: 'apartment' },
            { label: 'Maison', value: 'house' },
            { label: 'Gîte', value: 'gite' },
            { label: 'Villa', value: 'villa' },
            { label: 'Studio', value: 'studio' },
          ],
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Ville',
        },
        {
          name: 'price',
          type: 'number',
          label: 'Prix (€/nuit ou total)',
        },
        {
          name: 'surface',
          type: 'number',
          label: 'Surface (m²)',
        },
        {
          name: 'rooms',
          type: 'number',
          label: 'Nombre de pièces',
        },
        {
          name: 'dpe',
          type: 'select',
          label: 'DPE',
          options: [
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            { label: 'F', value: 'F' },
            { label: 'G', value: 'G' },
          ],
        },
        {
          name: 'bookingUrl',
          type: 'text',
          label: 'URL de réservation / contact',
        },

        // ─── Accueil ─────────────────────────────────────────────
        {
          name: 'welcomeMessage',
          type: 'textarea',
          label: 'Message de bienvenue',
          admin: {
            description: 'Message personnalisé affiché en haut de la page d\'accueil',
          },
        },
        {
          name: 'checkInTime',
          type: 'text',
          label: 'Heure d\'arrivée (check-in)',
          admin: {
            description: 'Ex: 15h00',
          },
        },
        {
          name: 'checkOutTime',
          type: 'text',
          label: 'Heure de départ (check-out)',
          admin: {
            description: 'Ex: 11h00',
          },
        },
        {
          name: 'checkInInstructions',
          type: 'textarea',
          label: 'Instructions d\'arrivée',
          admin: {
            description: 'Emplacement des clés, code de la boîte à clé, digicode, etc.',
          },
        },

        // ─── WiFi ────────────────────────────────────────────────
        {
          name: 'wifiName',
          type: 'text',
          label: 'Nom du réseau WiFi (SSID)',
        },
        {
          name: 'wifiPassword',
          type: 'text',
          label: 'Mot de passe WiFi',
        },

        // ─── Règles ──────────────────────────────────────────────
        {
          name: 'houseRules',
          type: 'textarea',
          label: 'Règles de la maison',
          admin: {
            description: 'Règles à respecter (pas de fumée, horaires calme, etc.)',
          },
        },

        // ─── Équipements ──────────────────────────────────────────
        {
          name: 'amenities',
          type: 'array',
          label: 'Équipements disponibles',
          admin: {
            description: 'Ajoutez un équipement par ligne (ex: Piscine, Parking, WiFi, Lave-vaisselle…)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Équipement',
              required: true,
            },
          ],
        },

        // ─── Conseils locaux ──────────────────────────────────────
        {
          name: 'localTips',
          type: 'textarea',
          label: 'Conseils locaux & activités',
          admin: {
            description: 'Restaurants, randonnées, activités à faire dans les environs',
          },
        },

        // ─── Contacts ────────────────────────────────────────────
        {
          name: 'hostName',
          type: 'text',
          label: 'Nom de l\'hôte',
        },
        {
          name: 'hostPhone',
          type: 'text',
          label: 'Téléphone de l\'hôte',
        },
        {
          name: 'hostEmail',
          type: 'text',
          label: 'Email de l\'hôte',
        },
        {
          name: 'emergencyPhone',
          type: 'text',
          label: 'Numéro d\'urgence',
          admin: {
            description: 'Numéro à appeler en cas de problème (ex: 15, 18, 112 ou numéro direct)',
          },
        },
      ],
    },
    {
      name: 'vcardData',
      type: 'group',
      label: 'Données Carte de visite digitale',
      admin: {
        condition: isVertical('vcard'),
      },
      fields: [
        // ─── Identité ─────────────────────────────────────────────
        {
          name: 'fullName',
          type: 'text',
          label: 'Nom complet',
        },
        {
          name: 'firstName',
          type: 'text',
          label: 'Prénom',
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Nom de famille',
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: 'Fonction / Poste',
        },
        {
          name: 'company',
          type: 'text',
          label: 'Entreprise / Organisation',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Bio / Description',
          admin: {
            description: 'Courte présentation affichée sur la carte',
          },
        },

        // ─── Coordonnées personnelles ──────────────────────────────
        {
          name: 'phone',
          type: 'text',
          label: 'Téléphone personnel',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email personnel',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Site web',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse',
        },

        // ─── Coordonnées professionnelles ─────────────────────────
        {
          name: 'phoneWork',
          type: 'text',
          label: 'Téléphone professionnel',
        },
        {
          name: 'emailWork',
          type: 'email',
          label: 'Email professionnel',
        },

        // ─── Réseaux sociaux ──────────────────────────────────────
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn (URL)',
        },
        {
          name: 'twitterUrl',
          type: 'text',
          label: 'Twitter / X (URL)',
        },
        {
          name: 'instagramUrl',
          type: 'text',
          label: 'Instagram (URL)',
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub (URL)',
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube (URL)',
        },

        // ─── Prise de rendez-vous ─────────────────────────────────
        {
          name: 'calendlyUrl',
          type: 'text',
          label: 'Calendly / Prise de RDV (URL)',
          admin: {
            description: 'Lien vers votre page de réservation (Calendly, Cal.com, etc.)',
          },
        },

        // ─── Branding ─────────────────────────────────────────────
        {
          name: 'coverColor',
          type: 'text',
          label: 'Couleur de la carte (hex)',
          admin: {
            description: 'Ex: #1e3a5f — laissez vide pour utiliser la couleur de marque',
          },
        },
      ],
    },
    {
      name: 'productData',
      type: 'group',
      label: 'Données Manuel / Produit / Garantie',
      admin: {
        condition: isVertical('product'),
      },
      fields: [
        {
          name: 'productName',
          type: 'text',
          label: 'Nom du produit',
        },
        {
          name: 'brandName',
          type: 'text',
          label: 'Marque',
        },
        {
          name: 'modelNumber',
          type: 'text',
          label: 'Numéro de modèle / SKU',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description du produit',
        },
        {
          name: 'manualUrl',
          type: 'text',
          label: 'URL du manuel (PDF)',
        },
        {
          name: 'videoTutorialUrl',
          type: 'text',
          label: 'URL tutoriel vidéo (YouTube/Vimeo)',
        },
        {
          name: 'troubleshootingUrl',
          type: 'text',
          label: 'URL centre d\'aide / FAQ / Dépannage',
        },
        {
          name: 'warrantyDuration',
          type: 'text',
          label: 'Durée de la garantie',
          admin: { description: 'Ex: 2 ans, Garantie à vie' },
        },
        {
          name: 'warrantyDetails',
          type: 'textarea',
          label: 'Détails de la garantie',
        },
        {
          name: 'registrationUrl',
          type: 'text',
          label: 'URL d\'enregistrement du produit',
        },
        {
          name: 'supportEmail',
          type: 'text',
          label: 'E-mail support',
        },
        {
          name: 'supportPhone',
          type: 'text',
          label: 'Téléphone support',
        },
        {
          name: 'quickStartSteps',
          type: 'array',
          label: 'Étapes de démarrage rapide',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre de l\'étape',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Explications',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'feedbackData',
      type: 'group',
      label: 'Données Avis / Évaluation / Feedback',
      admin: {
        condition: isVertical('feedback'),
      },
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Nom de l\'établissement / entreprise',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Titre de la page',
          defaultValue: 'Votre avis compte !',
        },
        {
          name: 'subheading',
          type: 'textarea',
          label: 'Sous-titre / Message d\'accueil',
          defaultValue: 'Aidez-nous à nous améliorer en partageant votre expérience.',
        },
        {
          name: 'googleReviewUrl',
          type: 'text',
          label: 'URL avis Google (lien direct)',
        },
        {
          name: 'tripadvisorUrl',
          type: 'text',
          label: 'URL avis TripAdvisor',
        },
        {
          name: 'trustpilotUrl',
          type: 'text',
          label: 'URL avis Trustpilot',
        },
        {
          name: 'customReviewUrl',
          type: 'text',
          label: 'URL autre plateforme d\'avis',
        },
        {
          name: 'customReviewLabel',
          type: 'text',
          label: 'Nom de l\'autre plateforme d\'avis',
          admin: { description: 'Ex: Facebook, Avis Vérifiés…' },
        },
        {
          name: 'enableDirectForm',
          type: 'checkbox',
          label: 'Activer le formulaire de contact privé pour les notes basses (1-3 étoiles)',
          defaultValue: true,
        },
        {
          name: 'directFormEmail',
          type: 'text',
          label: 'E-mail de destination pour les retours privés',
        },
        {
          name: 'promptQuestion',
          type: 'text',
          label: 'Question du formulaire privé',
          defaultValue: 'Qu\'aurions-nous pu mieux faire ?',
        },
      ],
    },
    {
      name: 'tourismData',
      type: 'group',
      label: 'Données Tourisme / Patrimoine / Point d\'intérêt',
      admin: {
        condition: isVertical('tourism'),
      },
      fields: [
        {
          name: 'placeName',
          type: 'text',
          label: 'Nom du lieu / monument',
        },
        {
          name: 'locationName',
          type: 'text',
          label: 'Localisation / Ville',
        },
        {
          name: 'historicPeriod',
          type: 'text',
          label: 'Époque / Siècle',
          admin: { description: 'Ex: Moyen Âge, XVIIe siècle, Art déco' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Histoire & Description',
        },
        {
          name: 'audioGuideUrl',
          type: 'text',
          label: 'URL de l\'audio-guide (MP3 ou Soundcloud)',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'URL vidéo de présentation (YouTube/Vimeo)',
        },
        {
          name: 'latitude',
          type: 'text',
          label: 'Latitude (pour plan)',
        },
        {
          name: 'longitude',
          type: 'text',
          label: 'Longitude (pour plan)',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Adresse complète',
        },
        {
          name: 'openingHours',
          type: 'textarea',
          label: 'Horaires d\'ouverture',
        },
        {
          name: 'entryFee',
          type: 'text',
          label: 'Tarifs d\'entrée',
          admin: { description: 'Ex: Gratuit, 12€ adulte / 8€ réduit' },
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Site web officiel',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Téléphone de contact',
        },
        {
          name: 'pointsOfInterest',
          type: 'array',
          label: 'Points d\'intérêt notables (à visiter à cet endroit)',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nom du point d\'intérêt',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description / Explications',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'chrdData',
      type: 'group',
      label: 'CHRD (Hôtel / Resto / Camping)',
      admin: {
        condition: isVertical('chrd'),
      },
      fields: [
        { name: 'establishmentName', type: 'text', label: 'Nom de l\'établissement' },
        {
          name: 'establishmentType',
          type: 'select',
          label: 'Type d\'établissement',
          options: [
            { label: 'Hôtel', value: 'hotel' },
            { label: 'Restaurant', value: 'restaurant' },
            { label: 'Bar', value: 'bar' },
            { label: 'Camping / Gîte', value: 'camping' },
          ],
        },
        { name: 'welcomeMessage', type: 'textarea', label: 'Message de bienvenue' },
        { name: 'menuPdfUrl', type: 'text', label: 'Lien du Menu (PDF ou Web)' },
        { name: 'wifiName', type: 'text', label: 'Nom du réseau Wi-Fi' },
        { name: 'wifiPassword', type: 'text', label: 'Mot de passe Wi-Fi' },
        { name: 'googleReviewUrl', type: 'text', label: 'Lien Avis Google' },
        { name: 'tripadvisorUrl', type: 'text', label: 'Lien TripAdvisor' },
        { name: 'enablePostcardGift', type: 'checkbox', label: 'Proposer une carte postale souvenir offerte' },
        { name: 'postcardCode', type: 'text', label: 'Code cadeau carte postale' },
      ],
    },
    {
      name: 'corporateEventData',
      type: 'group',
      label: 'Événementiel Corporate & Séminaire',
      admin: {
        condition: isVertical('corporate_event'),
      },
      fields: [
        { name: 'eventName', type: 'text', label: 'Nom de l\'événement' },
        { name: 'companyName', type: 'text', label: 'Entreprise organisatrice' },
        { name: 'eventDate', type: 'text', label: 'Date de l\'événement' },
        { name: 'location', type: 'text', label: 'Lieu / Salle' },
        { name: 'welcomeMessage', type: 'textarea', label: 'Message d\'accueil' },
        { name: 'wifiCode', type: 'text', label: 'Code Wi-Fi invités' },
        { name: 'scheduleUrl', type: 'text', label: 'Lien du programme complet' },
        { name: 'slidesUrl', type: 'text', label: 'Lien des présentations / PDF' },
        { name: 'liveWallEnabled', type: 'checkbox', label: 'Activer le Live Wall photo collaboratif' },
        { name: 'galleryCode', type: 'text', label: 'Code / Slug Galerie Pixshare' },
      ],
    },
    {
      name: 'ugcRetailData',
      type: 'group',
      label: 'Retail & Concours Photo UGC',
      admin: {
        condition: isVertical('ugc_retail'),
      },
      fields: [
        { name: 'brandName', type: 'text', label: 'Nom de la marque' },
        { name: 'campaignTitle', type: 'text', label: 'Titre de l\'opération promo' },
        { name: 'productName', type: 'text', label: 'Nom du produit' },
        { name: 'instructions', type: 'textarea', label: 'Consignes de participation' },
        { name: 'rewardDiscountCode', type: 'text', label: 'Code promo / Bon de réduction offert' },
        { name: 'rewardDescription', type: 'text', label: 'Description du cadeau' },
        { name: 'rulesUrl', type: 'text', label: 'Lien du règlement du jeu' },
        { name: 'supportEmail', type: 'text', label: 'Email support client' },
      ],
    },
    {
      name: 'fieldServiceData',
      type: 'group',
      label: 'Field Service & Maintenance',
      admin: {
        condition: isVertical('field_service'),
      },
      fields: [
        { name: 'assetName', type: 'text', label: 'Nom de l\'équipement / Machine' },
        { name: 'assetId', type: 'text', label: 'Numéro de série / ID Asset' },
        { name: 'category', type: 'text', label: 'Catégorie d\'équipement' },
        { name: 'location', type: 'text', label: 'Emplacement (Bâtiment, Salle)' },
        {
          name: 'status',
          type: 'select',
          label: 'Statut de l\'équipement',
          options: [
            { label: 'Opérationnel', value: 'operational' },
            { label: 'Maintenance requise', value: 'maintenance_required' },
            { label: 'Hors service', value: 'out_of_service' },
          ],
        },
        { name: 'lastInspectionDate', type: 'text', label: 'Date dernière inspection' },
        { name: 'nextInspectionDate', type: 'text', label: 'Prochaine inspection prévue' },
        { name: 'documentationUrl', type: 'text', label: 'Lien fiche technique / Manuel PDF' },
        { name: 'contactTechnicianPhone', type: 'text', label: 'Téléphone astreinte technique' },
        { name: 'emergencyContact', type: 'text', label: 'Numéro d\'urgence' },
        { name: 'maintenanceNotes', type: 'textarea', label: 'Consignes & notes de maintenance' },
      ],
    },
    {
      name: 'smartRouting',
      type: 'group',
      label: 'Smart Routing & Programmation Dynamique',
      fields: [
        {
          name: 'mode',
          type: 'select',
          label: 'Mode de routage dynamique',
          defaultValue: 'none',
          options: [
            { label: 'Désactivé (Contenu fixe)', value: 'none' },
            { label: 'Règles Horaires (Petit-Déjeuner, Déjeuner, Soir)', value: 'time_slots' },
            { label: 'Chronologie Événement (Avant, Pendant, Après)', value: 'event_timeline' },
            { label: 'A/B Testing 50/50', value: 'ab_test' },
          ],
        },
        {
          name: 'timeRules',
          type: 'array',
          label: 'Créneaux horaires programmés',
          fields: [
            { name: 'label', type: 'text', label: 'Nom du créneau (ex: Menu Déjeuner)' },
            { name: 'startTime', type: 'text', label: 'Heure de début (ex: 12:00)' },
            { name: 'endTime', type: 'text', label: 'Heure de fin (ex: 15:00)' },
            { name: 'targetSlug', type: 'text', label: 'Slug alternatif ou redirection' },
            { name: 'customHeadline', type: 'text', label: 'Titre / Message d\'accroche spécifique' },
          ],
        },
        {
          name: 'eventSchedule',
          type: 'group',
          label: 'Chronologie de l\'événement',
          fields: [
            { name: 'eventStartDate', type: 'text', label: 'Date/Heure de début événement (ex: 2025-10-15T09:00)' },
            { name: 'eventEndDate', type: 'text', label: 'Date/Heure de fin événement (ex: 2025-10-17T18:00)' },
            { name: 'beforeEventTargetSlug', type: 'text', label: 'Slug Avant événement (Compte à rebours)' },
            { name: 'duringEventTargetSlug', type: 'text', label: 'Slug Pendant événement (Live Wall)' },
            { name: 'afterEventTargetSlug', type: 'text', label: 'Slug Après événement (Formulaire satisfaction)' },
          ],
        },
        {
          name: 'abTest',
          type: 'group',
          label: 'A/B Testing (Split de trafic)',
          fields: [
            { name: 'enabled', type: 'checkbox', label: 'Activer le test A/B' },
            { name: 'variantASlug', type: 'text', label: 'Slug Variante A' },
            { name: 'variantBSlug', type: 'text', label: 'Slug Variante B' },
            { name: 'splitRatio', type: 'number', label: 'Pourcentage Variante A (ex: 50)' },
          ],
        },
      ],
    },
  ],
}


