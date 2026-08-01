export type LandingPageVertical =
  | 'generic'
  | 'art'
  | 'immo'
  | 'vcard'
  | 'product'
  | 'feedback'
  | 'tourism'
  | 'chrd'
  | 'corporate_event'
  | 'ugc_retail'
  | 'field_service'

export type LandingPageStatus = 'draft' | 'published'

export type DpeRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export interface MediaAsset {
  id: string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export interface LandingPageTheme {
  primaryColor?: string | null
  logo?: MediaAsset | string | null
}

export interface ArtData {
  // Artiste
  artistName?: string | null
  artistBio?: string | null
  artistNationality?: string | null
  artistBirthYear?: string | null

  // Œuvre
  year?: string | null
  medium?: string | null
  dimensions?: string | null
  series?: string | null            // Série / collection
  edition?: string | null           // Édition (ex: 3/10)
  certificate?: string | null       // Certificat d'authenticité
  description?: string | null       // Description / note de l'artiste

  // Prix & marché
  price?: number | null
  currency?: string | null          // EUR, USD, GBP…
  sold?: boolean | null             // Vendu
  available?: boolean | null        // Disponible à la vente

  // Exposition & localisation
  exhibitionName?: string | null    // Nom de l'exposition
  exhibitionLocation?: string | null
  exhibitionDates?: string | null

  // Médias
  videoUrl?: string | null
  audioGuideUrl?: string | null     // Audio-guide / podcast

  // Liens
  instagramUsername?: string | null
  websiteUrl?: string | null
  shopUrl?: string | null           // Lien d'achat direct
  contactEmail?: string | null      // Contact pour acquisition
}

export interface ImmoData {
  // Infos de base
  price?: number | null
  surface?: number | null
  rooms?: number | null
  dpe?: DpeRating | null
  bookingUrl?: string | null

  // Type de bien et localisation
  propertyType?: 'apartment' | 'house' | 'gite' | 'villa' | 'studio' | null
  address?: string | null
  city?: string | null

  // Accueil
  welcomeMessage?: string | null
  checkInTime?: string | null
  checkOutTime?: string | null
  checkInInstructions?: string | null

  // WiFi
  wifiName?: string | null
  wifiPassword?: string | null

  // Règles & équipements
  houseRules?: string | null
  amenities?: { name: string; id?: string | null }[] | string[] | null

  // Conseils locaux
  localTips?: string | null

  // Contacts
  hostName?: string | null
  hostPhone?: string | null
  hostEmail?: string | null
  emergencyPhone?: string | null
}

export interface VCardData {
  // Identité
  fullName?: string | null
  firstName?: string | null
  lastName?: string | null
  jobTitle?: string | null
  company?: string | null
  bio?: string | null

  // Coordonnées personnelles
  phone?: string | null
  email?: string | null
  website?: string | null
  address?: string | null

  // Coordonnées professionnelles
  phoneWork?: string | null
  emailWork?: string | null

  // Réseaux sociaux
  linkedinUrl?: string | null
  twitterUrl?: string | null
  instagramUrl?: string | null
  githubUrl?: string | null
  youtubeUrl?: string | null

  // Prise de rendez-vous
  calendlyUrl?: string | null

  // Branding
  coverColor?: string | null
}

export interface ProductData {
  productName?: string | null
  brandName?: string | null
  modelNumber?: string | null
  description?: string | null
  manualUrl?: string | null
  videoTutorialUrl?: string | null
  troubleshootingUrl?: string | null
  warrantyDuration?: string | null
  warrantyDetails?: string | null
  registrationUrl?: string | null
  supportEmail?: string | null
  supportPhone?: string | null
  quickStartSteps?: { title: string; description: string; id?: string | null }[] | null
}

export interface FeedbackData {
  companyName?: string | null
  heading?: string | null
  subheading?: string | null
  googleReviewUrl?: string | null
  tripadvisorUrl?: string | null
  trustpilotUrl?: string | null
  customReviewUrl?: string | null
  customReviewLabel?: string | null
  enableDirectForm?: boolean | null
  directFormEmail?: string | null
  promptQuestion?: string | null
}

export interface TourismData {
  placeName?: string | null
  locationName?: string | null
  historicPeriod?: string | null
  description?: string | null
  audioGuideUrl?: string | null
  videoUrl?: string | null
  latitude?: string | null
  longitude?: string | null
  address?: string | null
  openingHours?: string | null
  entryFee?: string | null
  websiteUrl?: string | null
  contactPhone?: string | null
  pointsOfInterest?: { name: string; description: string; id?: string | null }[] | null
}

export interface ChrdData {
  establishmentName?: string | null
  establishmentType?: 'hotel' | 'restaurant' | 'bar' | 'camping' | null
  welcomeMessage?: string | null
  menuPdfUrl?: string | null
  wifiName?: string | null
  wifiPassword?: string | null
  googleReviewUrl?: string | null
  tripadvisorUrl?: string | null
  enablePostcardGift?: boolean | null
  postcardCode?: string | null
  menuCategories?: { categoryName: string; itemsSummary: string; id?: string | null }[] | null
}

export interface CorporateEventData {
  eventName?: string | null
  companyName?: string | null
  eventDate?: string | null
  location?: string | null
  welcomeMessage?: string | null
  wifiCode?: string | null
  scheduleUrl?: string | null
  slidesUrl?: string | null
  liveWallEnabled?: boolean | null
  galleryCode?: string | null
  agendaItems?: { time: string; title: string; speaker?: string; id?: string | null }[] | null
}

export interface UgcRetailData {
  brandName?: string | null
  campaignTitle?: string | null
  productName?: string | null
  instructions?: string | null
  rewardDiscountCode?: string | null
  rewardDescription?: string | null
  rulesUrl?: string | null
  supportEmail?: string | null
}

export interface FieldServiceData {
  assetName?: string | null
  assetId?: string | null
  category?: string | null
  location?: string | null
  status?: 'operational' | 'maintenance_required' | 'out_of_service' | null
  lastInspectionDate?: string | null
  nextInspectionDate?: string | null
  documentationUrl?: string | null
  contactTechnicianPhone?: string | null
  emergencyContact?: string | null
  maintenanceNotes?: string | null
}

export interface GenericData {
  headline?: string | null
  subheadline?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null
  websiteUrl?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  sections?: { title: string; body: string; id?: string | null }[] | null
}

export interface LandingPage {
  id: string
  title: string
  slug: string
  status: LandingPageStatus
  vertical: LandingPageVertical
  theme?: LandingPageTheme | null
  genericData?: GenericData | null
  artData?: ArtData | null
  immoData?: ImmoData | null
  vcardData?: VCardData | null
  productData?: ProductData | null
  feedbackData?: FeedbackData | null
  tourismData?: TourismData | null
  chrdData?: ChrdData | null
  corporateEventData?: CorporateEventData | null
  ugcRetailData?: UgcRetailData | null
  fieldServiceData?: FieldServiceData | null
  updatedAt?: string | null
  createdAt?: string | null
}

export type LandingPageInput = Omit<LandingPage, 'id' | 'updatedAt' | 'createdAt'>

export interface LandingPageTemplateProps {
  pageData: LandingPage
}

