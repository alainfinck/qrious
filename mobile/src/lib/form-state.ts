import type {
  DpeRating,
  LandingPage,
  LandingPageInput,
  LandingPageVertical,
} from '../types/landing-page'
import { generateRandomSlug, slugify } from '../lib/utils'

export type FormState = {
  title: string
  slug: string
  status: 'draft' | 'published'
  vertical: LandingPageVertical
  primaryColor: string
  // generic
  genericHeadline: string
  genericSubheadline: string
  genericBody: string
  genericCtaLabel: string
  genericCtaUrl: string
  genericWebsiteUrl: string
  genericContactEmail: string
  // redirect
  redirectTargetUrl: string
  redirectLabel: string
  // art
  artistName: string
  artistBio: string
  artYear: string
  medium: string
  dimensions: string
  artDescription: string
  artPrice: string
  currency: string
  exhibitionName: string
  videoUrl: string
  audioGuideUrl: string
  instagramUsername: string
  websiteUrl: string
  contactEmail: string
  // immo
  price: string
  surface: string
  rooms: string
  dpe: string
  bookingUrl: string
  propertyType: string
  address: string
  city: string
  welcomeMessage: string
  wifiName: string
  wifiPassword: string
  hostName: string
  hostPhone: string
  // vcard
  fullName: string
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  bio: string
  phone: string
  email: string
  website: string
  linkedinUrl: string
  // product
  productName: string
  brandName: string
  modelNumber: string
  productDescription: string
  manualUrl: string
  supportEmail: string
  // feedback
  feedbackCompanyName: string
  feedbackHeading: string
  googleReviewUrl: string
  tripadvisorUrl: string
  // tourism
  placeName: string
  locationName: string
  tourismDescription: string
  tourismAudioGuideUrl: string
  openingHours: string
  // chrd
  establishmentName: string
  establishmentType: string
  chrdWelcomeMessage: string
  menuPdfUrl: string
  chrdWifiName: string
  chrdWifiPassword: string
  // corporate
  eventName: string
  eventCompanyName: string
  eventDate: string
  eventLocation: string
  eventWelcomeMessage: string
  wifiCode: string
  // ugc
  ugcBrandName: string
  campaignTitle: string
  ugcProductName: string
  instructions: string
  rewardDiscountCode: string
  // field
  assetName: string
  assetId: string
  category: string
  fieldLocation: string
  fieldStatus: string
  documentationUrl: string
  contactTechnicianPhone: string
  // smart routing
  smartRoutingMode: string
  slot1Label: string
  slot1Start: string
  slot1End: string
  slot1Target: string
  abTestEnabled: boolean
  variantASlug: string
  variantBSlug: string
  splitRatio: string
}

export function emptyFormState(vertical: LandingPageVertical = 'generic'): FormState {
  return {
    title: '',
    slug: generateRandomSlug(4),
    status: 'draft',
    vertical,
    primaryColor: '#0f172a',
    genericHeadline: '',
    genericSubheadline: '',
    genericBody: '',
    genericCtaLabel: '',
    genericCtaUrl: '',
    genericWebsiteUrl: '',
    genericContactEmail: '',
    redirectTargetUrl: '',
    redirectLabel: '',
    artistName: '',
    artistBio: '',
    artYear: '',
    medium: '',
    dimensions: '',
    artDescription: '',
    artPrice: '',
    currency: 'EUR',
    exhibitionName: '',
    videoUrl: '',
    audioGuideUrl: '',
    instagramUsername: '',
    websiteUrl: '',
    contactEmail: '',
    price: '',
    surface: '',
    rooms: '',
    dpe: '',
    bookingUrl: '',
    propertyType: '',
    address: '',
    city: '',
    welcomeMessage: '',
    wifiName: '',
    wifiPassword: '',
    hostName: '',
    hostPhone: '',
    fullName: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    bio: '',
    phone: '',
    email: '',
    website: '',
    linkedinUrl: '',
    productName: '',
    brandName: '',
    modelNumber: '',
    productDescription: '',
    manualUrl: '',
    supportEmail: '',
    feedbackCompanyName: '',
    feedbackHeading: 'Votre avis compte !',
    googleReviewUrl: '',
    tripadvisorUrl: '',
    placeName: '',
    locationName: '',
    tourismDescription: '',
    tourismAudioGuideUrl: '',
    openingHours: '',
    establishmentName: '',
    establishmentType: '',
    chrdWelcomeMessage: '',
    menuPdfUrl: '',
    chrdWifiName: '',
    chrdWifiPassword: '',
    eventName: '',
    eventCompanyName: '',
    eventDate: '',
    eventLocation: '',
    eventWelcomeMessage: '',
    wifiCode: '',
    ugcBrandName: '',
    campaignTitle: '',
    ugcProductName: '',
    instructions: '',
    rewardDiscountCode: '',
    assetName: '',
    assetId: '',
    category: '',
    fieldLocation: '',
    fieldStatus: '',
    documentationUrl: '',
    contactTechnicianPhone: '',
    smartRoutingMode: 'none',
    slot1Label: '',
    slot1Start: '',
    slot1End: '',
    slot1Target: '',
    abTestEnabled: false,
    variantASlug: '',
    variantBSlug: '',
    splitRatio: '50',
  }
}

export function formStateFromPage(page: LandingPage): FormState {
  const base = emptyFormState(page.vertical)
  return {
    ...base,
    title: page.title,
    slug: page.slug,
    status: page.status,
    vertical: page.vertical,
    primaryColor: page.theme?.primaryColor || '#0f172a',
    genericHeadline: page.genericData?.headline || '',
    genericSubheadline: page.genericData?.subheadline || '',
    genericBody: page.genericData?.body || '',
    genericCtaLabel: page.genericData?.ctaLabel || '',
    genericCtaUrl: page.genericData?.ctaUrl || '',
    genericWebsiteUrl: page.genericData?.websiteUrl || '',
    genericContactEmail: page.genericData?.contactEmail || '',
    redirectTargetUrl: page.redirectData?.targetUrl || '',
    redirectLabel: page.redirectData?.label || '',
    artistName: page.artData?.artistName || '',
    artistBio: page.artData?.artistBio || '',
    artYear: page.artData?.year || '',
    medium: page.artData?.medium || '',
    dimensions: page.artData?.dimensions || '',
    artDescription: page.artData?.description || '',
    artPrice: page.artData?.price != null ? String(page.artData.price) : '',
    currency: page.artData?.currency || 'EUR',
    exhibitionName: page.artData?.exhibitionName || '',
    videoUrl: page.artData?.videoUrl || '',
    audioGuideUrl: page.artData?.audioGuideUrl || '',
    instagramUsername: page.artData?.instagramUsername || '',
    websiteUrl: page.artData?.websiteUrl || '',
    contactEmail: page.artData?.contactEmail || '',
    price: page.immoData?.price != null ? String(page.immoData.price) : '',
    surface: page.immoData?.surface != null ? String(page.immoData.surface) : '',
    rooms: page.immoData?.rooms != null ? String(page.immoData.rooms) : '',
    dpe: page.immoData?.dpe || '',
    bookingUrl: page.immoData?.bookingUrl || '',
    propertyType: page.immoData?.propertyType || '',
    address: page.immoData?.address || '',
    city: page.immoData?.city || '',
    welcomeMessage: page.immoData?.welcomeMessage || '',
    wifiName: page.immoData?.wifiName || '',
    wifiPassword: page.immoData?.wifiPassword || '',
    hostName: page.immoData?.hostName || '',
    hostPhone: page.immoData?.hostPhone || '',
    fullName: page.vcardData?.fullName || '',
    firstName: page.vcardData?.firstName || '',
    lastName: page.vcardData?.lastName || '',
    jobTitle: page.vcardData?.jobTitle || '',
    company: page.vcardData?.company || '',
    bio: page.vcardData?.bio || '',
    phone: page.vcardData?.phone || '',
    email: page.vcardData?.email || '',
    website: page.vcardData?.website || '',
    linkedinUrl: page.vcardData?.linkedinUrl || '',
    productName: page.productData?.productName || '',
    brandName: page.productData?.brandName || '',
    modelNumber: page.productData?.modelNumber || '',
    productDescription: page.productData?.description || '',
    manualUrl: page.productData?.manualUrl || '',
    supportEmail: page.productData?.supportEmail || '',
    feedbackCompanyName: page.feedbackData?.companyName || '',
    feedbackHeading: page.feedbackData?.heading || 'Votre avis compte !',
    googleReviewUrl: page.feedbackData?.googleReviewUrl || '',
    tripadvisorUrl: page.feedbackData?.tripadvisorUrl || '',
    placeName: page.tourismData?.placeName || '',
    locationName: page.tourismData?.locationName || '',
    tourismDescription: page.tourismData?.description || '',
    tourismAudioGuideUrl: page.tourismData?.audioGuideUrl || '',
    openingHours: page.tourismData?.openingHours || '',
    establishmentName: page.chrdData?.establishmentName || '',
    establishmentType: page.chrdData?.establishmentType || '',
    chrdWelcomeMessage: page.chrdData?.welcomeMessage || '',
    menuPdfUrl: page.chrdData?.menuPdfUrl || '',
    chrdWifiName: page.chrdData?.wifiName || '',
    chrdWifiPassword: page.chrdData?.wifiPassword || '',
    eventName: page.corporateEventData?.eventName || '',
    eventCompanyName: page.corporateEventData?.companyName || '',
    eventDate: page.corporateEventData?.eventDate || '',
    eventLocation: page.corporateEventData?.location || '',
    eventWelcomeMessage: page.corporateEventData?.welcomeMessage || '',
    wifiCode: page.corporateEventData?.wifiCode || '',
    ugcBrandName: page.ugcRetailData?.brandName || '',
    campaignTitle: page.ugcRetailData?.campaignTitle || '',
    ugcProductName: page.ugcRetailData?.productName || '',
    instructions: page.ugcRetailData?.instructions || '',
    rewardDiscountCode: page.ugcRetailData?.rewardDiscountCode || '',
    assetName: page.fieldServiceData?.assetName || '',
    assetId: page.fieldServiceData?.assetId || '',
    category: page.fieldServiceData?.category || '',
    fieldLocation: page.fieldServiceData?.location || '',
    fieldStatus: page.fieldServiceData?.status || '',
    documentationUrl: page.fieldServiceData?.documentationUrl || '',
    contactTechnicianPhone: page.fieldServiceData?.contactTechnicianPhone || '',
    smartRoutingMode: page.smartRouting?.mode || 'none',
    slot1Label: page.smartRouting?.timeRules?.[0]?.label || '',
    slot1Start: page.smartRouting?.timeRules?.[0]?.startTime || '',
    slot1End: page.smartRouting?.timeRules?.[0]?.endTime || '',
    slot1Target: page.smartRouting?.timeRules?.[0]?.targetSlug || '',
    abTestEnabled: Boolean(page.smartRouting?.abTest?.enabled),
    variantASlug: page.smartRouting?.abTest?.variantASlug || '',
    variantBSlug: page.smartRouting?.abTest?.variantBSlug || '',
    splitRatio: String(page.smartRouting?.abTest?.splitRatio ?? 50),
  }
}

export function toLandingPageInput(state: FormState): LandingPageInput {
  const slug = slugify(state.slug || state.title)
  const timeRules =
    state.slot1Label && state.slot1Start && state.slot1End
      ? [
          {
            label: state.slot1Label,
            startTime: state.slot1Start,
            endTime: state.slot1End,
            targetSlug: state.slot1Target || null,
          },
        ]
      : null

  return {
    title: state.title,
    slug,
    status: state.status,
    vertical: state.vertical,
    theme: { primaryColor: state.primaryColor || '#0f172a' },
    smartRouting: {
      mode: (state.smartRoutingMode as 'none' | 'time_slots' | 'event_timeline' | 'ab_test') || 'none',
      timeRules,
      abTest: {
        enabled: state.abTestEnabled,
        variantASlug: state.variantASlug || null,
        variantBSlug: state.variantBSlug || null,
        splitRatio: state.splitRatio ? Number(state.splitRatio) : 50,
      },
    },
    genericData:
      state.vertical === 'generic'
        ? {
            headline: state.genericHeadline || null,
            subheadline: state.genericSubheadline || null,
            body: state.genericBody || null,
            ctaLabel: state.genericCtaLabel || null,
            ctaUrl: state.genericCtaUrl || null,
            websiteUrl: state.genericWebsiteUrl || null,
            contactEmail: state.genericContactEmail || null,
          }
        : undefined,
    redirectData:
      state.vertical === 'redirect'
        ? {
            targetUrl: state.redirectTargetUrl || '',
            label: state.redirectLabel || null,
          }
        : undefined,
    artData:
      state.vertical === 'art'
        ? {
            artistName: state.artistName || null,
            artistBio: state.artistBio || null,
            year: state.artYear || null,
            medium: state.medium || null,
            dimensions: state.dimensions || null,
            description: state.artDescription || null,
            price: state.artPrice ? Number(state.artPrice) : null,
            currency: state.currency || 'EUR',
            exhibitionName: state.exhibitionName || null,
            videoUrl: state.videoUrl || null,
            audioGuideUrl: state.audioGuideUrl || null,
            instagramUsername: state.instagramUsername || null,
            websiteUrl: state.websiteUrl || null,
            contactEmail: state.contactEmail || null,
          }
        : undefined,
    immoData:
      state.vertical === 'immo'
        ? {
            price: state.price ? Number(state.price) : null,
            surface: state.surface ? Number(state.surface) : null,
            rooms: state.rooms ? Number(state.rooms) : null,
            dpe: (state.dpe as DpeRating) || null,
            bookingUrl: state.bookingUrl || null,
            propertyType:
              (state.propertyType as 'apartment' | 'house' | 'gite' | 'villa' | 'studio') || null,
            address: state.address || null,
            city: state.city || null,
            welcomeMessage: state.welcomeMessage || null,
            wifiName: state.wifiName || null,
            wifiPassword: state.wifiPassword || null,
            hostName: state.hostName || null,
            hostPhone: state.hostPhone || null,
          }
        : undefined,
    vcardData:
      state.vertical === 'vcard'
        ? {
            fullName: state.fullName || null,
            firstName: state.firstName || null,
            lastName: state.lastName || null,
            jobTitle: state.jobTitle || null,
            company: state.company || null,
            bio: state.bio || null,
            phone: state.phone || null,
            email: state.email || null,
            website: state.website || null,
            linkedinUrl: state.linkedinUrl || null,
          }
        : undefined,
    productData:
      state.vertical === 'product'
        ? {
            productName: state.productName || null,
            brandName: state.brandName || null,
            modelNumber: state.modelNumber || null,
            description: state.productDescription || null,
            manualUrl: state.manualUrl || null,
            supportEmail: state.supportEmail || null,
          }
        : undefined,
    feedbackData:
      state.vertical === 'feedback'
        ? {
            companyName: state.feedbackCompanyName || null,
            heading: state.feedbackHeading || 'Votre avis compte !',
            googleReviewUrl: state.googleReviewUrl || null,
            tripadvisorUrl: state.tripadvisorUrl || null,
          }
        : undefined,
    tourismData:
      state.vertical === 'tourism'
        ? {
            placeName: state.placeName || null,
            locationName: state.locationName || null,
            description: state.tourismDescription || null,
            audioGuideUrl: state.tourismAudioGuideUrl || null,
            openingHours: state.openingHours || null,
          }
        : undefined,
    chrdData:
      state.vertical === 'chrd'
        ? {
            establishmentName: state.establishmentName || null,
            establishmentType:
              (state.establishmentType as 'hotel' | 'restaurant' | 'bar' | 'camping') || null,
            welcomeMessage: state.chrdWelcomeMessage || null,
            menuPdfUrl: state.menuPdfUrl || null,
            wifiName: state.chrdWifiName || null,
            wifiPassword: state.chrdWifiPassword || null,
          }
        : undefined,
    corporateEventData:
      state.vertical === 'corporate_event'
        ? {
            eventName: state.eventName || null,
            companyName: state.eventCompanyName || null,
            eventDate: state.eventDate || null,
            location: state.eventLocation || null,
            welcomeMessage: state.eventWelcomeMessage || null,
            wifiCode: state.wifiCode || null,
          }
        : undefined,
    ugcRetailData:
      state.vertical === 'ugc_retail'
        ? {
            brandName: state.ugcBrandName || null,
            campaignTitle: state.campaignTitle || null,
            productName: state.ugcProductName || null,
            instructions: state.instructions || null,
            rewardDiscountCode: state.rewardDiscountCode || null,
          }
        : undefined,
    fieldServiceData:
      state.vertical === 'field_service'
        ? {
            assetName: state.assetName || null,
            assetId: state.assetId || null,
            category: state.category || null,
            location: state.fieldLocation || null,
            status:
              (state.fieldStatus as 'operational' | 'maintenance_required' | 'out_of_service') ||
              null,
            documentationUrl: state.documentationUrl || null,
            contactTechnicianPhone: state.contactTechnicianPhone || null,
          }
        : undefined,
  }
}

export const VERTICAL_OPTIONS: {
  value: LandingPageVertical
  label: string
  model: string
  category: string
  description: string
  fields: string[]
}[] = [
  {
    value: 'generic',
    label: 'Générique',
    model: 'Page libre',
    category: 'Général',
    description: 'Landing page polyvalente avec texte libre, boutons et sections.',
    fields: ['Titre', 'Texte', 'Boutons', 'Sections'],
  },
  {
    value: 'redirect',
    label: 'Redirection URL',
    model: 'Lien direct',
    category: 'Général',
    description: 'Redirige vers une URL externe avec comptage automatique des scans.',
    fields: ['URL cible', 'Label', 'Stats scans'],
  },
  {
    value: 'chrd',
    label: 'CHRD (Hôtel/Resto)',
    model: 'Menu & Expérience',
    category: 'Hospitalité & Commerce',
    description: 'Menu numérique PDF, Wi-Fi instantané et cartes postales virtuelles.',
    fields: ['Établissement', 'Menu PDF', 'Wi-Fi', 'Carte Postale'],
  },
  {
    value: 'art',
    label: 'Art & Galerie',
    model: 'Fiche œuvre',
    category: 'Art & Événements',
    description: 'Fiche d’œuvre, bio artiste, audio-guide et demande d’acquisition.',
    fields: ['Artiste', 'Œuvre', 'Prix', 'Expo'],
  },
  {
    value: 'immo',
    label: 'Immobilier & Gîte',
    model: 'Bien / location',
    category: 'Immobilier & Services',
    description: 'Présentation de bien, livret d’accueil, Wi-Fi et contacts.',
    fields: ['Bien', 'Accueil', 'WiFi', 'Contacts'],
  },
  {
    value: 'vcard',
    label: 'vCard Pro',
    model: 'Carte de visite',
    category: 'Général',
    description: 'Carte de visite digitale avec sauvegarde contact et prise de RDV.',
    fields: ['Identité', 'Coords', 'Réseaux', 'RDV'],
  },
  {
    value: 'product',
    label: 'Produit & Notice',
    model: 'Manuel produit',
    category: 'Immobilier & Services',
    description: 'Notice d’utilisation, garantie, manuels PDF et assistance.',
    fields: ['Infos', 'Manuels', 'Garantie', 'Support'],
  },
  {
    value: 'feedback',
    label: 'Avis & Satisfaction',
    model: 'Collecte d’avis',
    category: 'Hospitalité & Commerce',
    description: 'Collecte d’avis Google/TripAdvisor et filtre de réclamations.',
    fields: ['Messages', 'Plateformes', 'Privé'],
  },
  {
    value: 'tourism',
    label: 'Tourisme & Guide',
    model: 'Fiche lieu',
    category: 'Art & Événements',
    description: 'Guide touristique enrichi avec points d’intérêt et infos pratiques.',
    fields: ['Lieu', 'Médias', 'Pratique', 'À voir'],
  },
  {
    value: 'corporate_event',
    label: 'Événement Corporate',
    model: 'Séminaire & Live',
    category: 'Art & Événements',
    description: 'Programme live, Live Wall photo et Wi-Fi événementiel.',
    fields: ['Événement', 'Live Wall', 'Programme', 'Wi-Fi'],
  },
  {
    value: 'ugc_retail',
    label: 'Retail & Concours UGC',
    model: 'Jeu Photo & Promo',
    category: 'Hospitalité & Commerce',
    description: 'Concours photo client, codes promo et collecte de leads.',
    fields: ['Marque', 'Partage Photo', 'Code Promo', 'Règlement'],
  },
  {
    value: 'field_service',
    label: 'Field Service & Machine',
    model: 'Maintenance',
    category: 'Immobilier & Services',
    description: 'Fiche maintenance d’équipement, inspections et incidents.',
    fields: ['Équipement', 'Inspect', 'Documentation', 'Tickets'],
  },
]
