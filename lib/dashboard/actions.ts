'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { slugify } from '@/lib/dashboard/utils'
import {
  createLandingPage,
  deleteLandingPage,
  updateLandingPage,
} from '@/lib/payload'
import type { DpeRating, LandingPageInput, LandingPageVertical } from '@/types/landing-page'
import { isAuthenticated } from '@/lib/auth/session'

async function requireAuth() {
  if (!(await isAuthenticated())) {
    throw new Error('Non autorisé')
  }
}

export type QrCodeFormState = {
  title: string
  slug: string
  status: 'draft' | 'published'
  vertical: LandingPageVertical
  primaryColor: string
  artData: {
    artistName: string
    artistBio: string
    artistNationality: string
    artistBirthYear: string
    year: string
    medium: string
    dimensions: string
    series: string
    edition: string
    certificate: string
    description: string
    price: string
    currency: string
    available: string
    sold: string
    exhibitionName: string
    exhibitionLocation: string
    exhibitionDates: string
    videoUrl: string
    audioGuideUrl: string
    instagramUsername: string
    websiteUrl: string
    shopUrl: string
    contactEmail: string
  }
  immoData: {
    price: string
    surface: string
    rooms: string
    dpe: string
    bookingUrl: string
    propertyType: string
    address: string
    city: string
    welcomeMessage: string
    checkInTime: string
    checkOutTime: string
    checkInInstructions: string
    wifiName: string
    wifiPassword: string
    houseRules: string
    amenities: string
    localTips: string
    hostName: string
    hostPhone: string
    hostEmail: string
    emergencyPhone: string
  }
  vcardData: {
    fullName: string
    firstName: string
    lastName: string
    jobTitle: string
    company: string
    bio: string
    phone: string
    email: string
    website: string
    address: string
    phoneWork: string
    emailWork: string
    linkedinUrl: string
    twitterUrl: string
    instagramUrl: string
    githubUrl: string
    youtubeUrl: string
    calendlyUrl: string
    coverColor: string
  }
  productData: {
    productName: string
    brandName: string
    modelNumber: string
    description: string
    manualUrl: string
    videoTutorialUrl: string
    troubleshootingUrl: string
    warrantyDuration: string
    warrantyDetails: string
    registrationUrl: string
    supportEmail: string
    supportPhone: string
    quickStartSteps: string
  }
  feedbackData: {
    companyName: string
    heading: string
    subheading: string
    googleReviewUrl: string
    tripadvisorUrl: string
    trustpilotUrl: string
    customReviewUrl: string
    customReviewLabel: string
    enableDirectForm: string
    directFormEmail: string
    promptQuestion: string
  }
  tourismData: {
    placeName: string
    locationName: string
    historicPeriod: string
    description: string
    audioGuideUrl: string
    videoUrl: string
    latitude: string
    longitude: string
    address: string
    openingHours: string
    entryFee: string
    websiteUrl: string
    contactPhone: string
    pointsOfInterest: string
  }
}

function parseFormData(formData: FormData): QrCodeFormState {
  return {
    title: String(formData.get('title') ?? '').trim(),
    slug: String(formData.get('slug') ?? '').trim(),
    status: (formData.get('status') as 'draft' | 'published') || 'draft',
    vertical: (formData.get('vertical') as LandingPageVertical) || 'art',
    primaryColor: String(formData.get('primaryColor') ?? '#0f172a').trim(),
    artData: {
      artistName: String(formData.get('artistName') ?? '').trim(),
      artistBio: String(formData.get('artistBio') ?? '').trim(),
      artistNationality: String(formData.get('artistNationality') ?? '').trim(),
      artistBirthYear: String(formData.get('artistBirthYear') ?? '').trim(),
      year: String(formData.get('artYear') ?? '').trim(),
      medium: String(formData.get('medium') ?? '').trim(),
      dimensions: String(formData.get('dimensions') ?? '').trim(),
      series: String(formData.get('series') ?? '').trim(),
      edition: String(formData.get('edition') ?? '').trim(),
      certificate: String(formData.get('certificate') ?? '').trim(),
      description: String(formData.get('artDescription') ?? '').trim(),
      price: String(formData.get('artPrice') ?? '').trim(),
      currency: String(formData.get('currency') ?? 'EUR').trim(),
      available: String(formData.get('available') ?? '').trim(),
      sold: String(formData.get('sold') ?? '').trim(),
      exhibitionName: String(formData.get('exhibitionName') ?? '').trim(),
      exhibitionLocation: String(formData.get('exhibitionLocation') ?? '').trim(),
      exhibitionDates: String(formData.get('exhibitionDates') ?? '').trim(),
      videoUrl: String(formData.get('videoUrl') ?? '').trim(),
      audioGuideUrl: String(formData.get('audioGuideUrl') ?? '').trim(),
      instagramUsername: String(formData.get('instagramUsername') ?? '').trim(),
      websiteUrl: String(formData.get('websiteUrl') ?? '').trim(),
      shopUrl: String(formData.get('shopUrl') ?? '').trim(),
      contactEmail: String(formData.get('contactEmail') ?? '').trim(),
    },
    immoData: {
      price: String(formData.get('price') ?? '').trim(),
      surface: String(formData.get('surface') ?? '').trim(),
      rooms: String(formData.get('rooms') ?? '').trim(),
      dpe: String(formData.get('dpe') ?? '').trim(),
      bookingUrl: String(formData.get('bookingUrl') ?? '').trim(),
      propertyType: String(formData.get('propertyType') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
      city: String(formData.get('city') ?? '').trim(),
      welcomeMessage: String(formData.get('welcomeMessage') ?? '').trim(),
      checkInTime: String(formData.get('checkInTime') ?? '').trim(),
      checkOutTime: String(formData.get('checkOutTime') ?? '').trim(),
      checkInInstructions: String(formData.get('checkInInstructions') ?? '').trim(),
      wifiName: String(formData.get('wifiName') ?? '').trim(),
      wifiPassword: String(formData.get('wifiPassword') ?? '').trim(),
      houseRules: String(formData.get('houseRules') ?? '').trim(),
      amenities: String(formData.get('amenities') ?? '').trim(),
      localTips: String(formData.get('localTips') ?? '').trim(),
      hostName: String(formData.get('hostName') ?? '').trim(),
      hostPhone: String(formData.get('hostPhone') ?? '').trim(),
      hostEmail: String(formData.get('hostEmail') ?? '').trim(),
      emergencyPhone: String(formData.get('emergencyPhone') ?? '').trim(),
    },
    vcardData: {
      fullName: String(formData.get('fullName') ?? '').trim(),
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      jobTitle: String(formData.get('jobTitle') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
      bio: String(formData.get('bio') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      website: String(formData.get('website') ?? '').trim(),
      address: String(formData.get('vcardAddress') ?? '').trim(),
      phoneWork: String(formData.get('phoneWork') ?? '').trim(),
      emailWork: String(formData.get('emailWork') ?? '').trim(),
      linkedinUrl: String(formData.get('linkedinUrl') ?? '').trim(),
      twitterUrl: String(formData.get('twitterUrl') ?? '').trim(),
      instagramUrl: String(formData.get('instagramUrl') ?? '').trim(),
      githubUrl: String(formData.get('githubUrl') ?? '').trim(),
      youtubeUrl: String(formData.get('youtubeUrl') ?? '').trim(),
      calendlyUrl: String(formData.get('calendlyUrl') ?? '').trim(),
      coverColor: String(formData.get('coverColor') ?? '').trim(),
    },
    productData: {
      productName: String(formData.get('productName') ?? '').trim(),
      brandName: String(formData.get('brandName') ?? '').trim(),
      modelNumber: String(formData.get('modelNumber') ?? '').trim(),
      description: String(formData.get('productDescription') ?? '').trim(),
      manualUrl: String(formData.get('manualUrl') ?? '').trim(),
      videoTutorialUrl: String(formData.get('videoTutorialUrl') ?? '').trim(),
      troubleshootingUrl: String(formData.get('troubleshootingUrl') ?? '').trim(),
      warrantyDuration: String(formData.get('warrantyDuration') ?? '').trim(),
      warrantyDetails: String(formData.get('warrantyDetails') ?? '').trim(),
      registrationUrl: String(formData.get('registrationUrl') ?? '').trim(),
      supportEmail: String(formData.get('supportEmail') ?? '').trim(),
      supportPhone: String(formData.get('supportPhone') ?? '').trim(),
      quickStartSteps: String(formData.get('quickStartSteps') ?? '').trim(),
    },
    feedbackData: {
      companyName: String(formData.get('companyName') ?? '').trim(),
      heading: String(formData.get('feedbackHeading') ?? '').trim(),
      subheading: String(formData.get('feedbackSubheading') ?? '').trim(),
      googleReviewUrl: String(formData.get('googleReviewUrl') ?? '').trim(),
      tripadvisorUrl: String(formData.get('tripadvisorUrl') ?? '').trim(),
      trustpilotUrl: String(formData.get('trustpilotUrl') ?? '').trim(),
      customReviewUrl: String(formData.get('customReviewUrl') ?? '').trim(),
      customReviewLabel: String(formData.get('customReviewLabel') ?? '').trim(),
      enableDirectForm: String(formData.get('enableDirectForm') ?? '').trim(),
      directFormEmail: String(formData.get('directFormEmail') ?? '').trim(),
      promptQuestion: String(formData.get('promptQuestion') ?? '').trim(),
    },
    tourismData: {
      placeName: String(formData.get('placeName') ?? '').trim(),
      locationName: String(formData.get('locationName') ?? '').trim(),
      historicPeriod: String(formData.get('historicPeriod') ?? '').trim(),
      description: String(formData.get('tourismDescription') ?? '').trim(),
      audioGuideUrl: String(formData.get('tourismAudioGuideUrl') ?? '').trim(),
      videoUrl: String(formData.get('tourismVideoUrl') ?? '').trim(),
      latitude: String(formData.get('latitude') ?? '').trim(),
      longitude: String(formData.get('longitude') ?? '').trim(),
      address: String(formData.get('tourismAddress') ?? '').trim(),
      openingHours: String(formData.get('openingHours') ?? '').trim(),
      entryFee: String(formData.get('entryFee') ?? '').trim(),
      websiteUrl: String(formData.get('tourismWebsiteUrl') ?? '').trim(),
      contactPhone: String(formData.get('contactPhone') ?? '').trim(),
      pointsOfInterest: String(formData.get('pointsOfInterest') ?? '').trim(),
    },
  }
}

function toPayloadData(state: QrCodeFormState): LandingPageInput {
  const slug = slugify(state.slug || state.title)

  return {
    title: state.title,
    slug,
    status: state.status,
    vertical: state.vertical,
    theme: {
      primaryColor: state.primaryColor || '#0f172a',
    },
    artData:
      state.vertical === 'art'
        ? {
            artistName: state.artData.artistName || null,
            artistBio: state.artData.artistBio || null,
            artistNationality: state.artData.artistNationality || null,
            artistBirthYear: state.artData.artistBirthYear || null,
            year: state.artData.year || null,
            medium: state.artData.medium || null,
            dimensions: state.artData.dimensions || null,
            series: state.artData.series || null,
            edition: state.artData.edition || null,
            certificate: state.artData.certificate || null,
            description: state.artData.description || null,
            price: state.artData.price ? Number(state.artData.price) : null,
            currency: state.artData.currency || 'EUR',
            available: state.artData.available === 'on',
            sold: state.artData.sold === 'on',
            exhibitionName: state.artData.exhibitionName || null,
            exhibitionLocation: state.artData.exhibitionLocation || null,
            exhibitionDates: state.artData.exhibitionDates || null,
            videoUrl: state.artData.videoUrl || null,
            audioGuideUrl: state.artData.audioGuideUrl || null,
            instagramUsername: state.artData.instagramUsername || null,
            websiteUrl: state.artData.websiteUrl || null,
            shopUrl: state.artData.shopUrl || null,
            contactEmail: state.artData.contactEmail || null,
          }
        : undefined,
    immoData:
      state.vertical === 'immo'
        ? {
            price: state.immoData.price ? Number(state.immoData.price) : null,
            surface: state.immoData.surface ? Number(state.immoData.surface) : null,
            rooms: state.immoData.rooms ? Number(state.immoData.rooms) : null,
            dpe: (state.immoData.dpe as DpeRating) || null,
            bookingUrl: state.immoData.bookingUrl || null,
            propertyType: (state.immoData.propertyType as 'apartment' | 'house' | 'gite' | 'villa' | 'studio') || null,
            address: state.immoData.address || null,
            city: state.immoData.city || null,
            welcomeMessage: state.immoData.welcomeMessage || null,
            checkInTime: state.immoData.checkInTime || null,
            checkOutTime: state.immoData.checkOutTime || null,
            checkInInstructions: state.immoData.checkInInstructions || null,
            wifiName: state.immoData.wifiName || null,
            wifiPassword: state.immoData.wifiPassword || null,
            houseRules: state.immoData.houseRules || null,
            amenities: state.immoData.amenities
              ? state.immoData.amenities.split('\n').map((s) => ({ name: s.trim() })).filter((a) => a.name)
              : null,
            localTips: state.immoData.localTips || null,
            hostName: state.immoData.hostName || null,
            hostPhone: state.immoData.hostPhone || null,
            hostEmail: state.immoData.hostEmail || null,
            emergencyPhone: state.immoData.emergencyPhone || null,
          }
        : undefined,
    vcardData:
      state.vertical === 'vcard'
        ? {
            fullName: state.vcardData.fullName || null,
            firstName: state.vcardData.firstName || null,
            lastName: state.vcardData.lastName || null,
            jobTitle: state.vcardData.jobTitle || null,
            company: state.vcardData.company || null,
            bio: state.vcardData.bio || null,
            phone: state.vcardData.phone || null,
            email: state.vcardData.email || null,
            website: state.vcardData.website || null,
            address: state.vcardData.address || null,
            phoneWork: state.vcardData.phoneWork || null,
            emailWork: state.vcardData.emailWork || null,
            linkedinUrl: state.vcardData.linkedinUrl || null,
            twitterUrl: state.vcardData.twitterUrl || null,
            instagramUrl: state.vcardData.instagramUrl || null,
            githubUrl: state.vcardData.githubUrl || null,
            youtubeUrl: state.vcardData.youtubeUrl || null,
            calendlyUrl: state.vcardData.calendlyUrl || null,
            coverColor: state.vcardData.coverColor || null,
          }
        : undefined,
    productData:
      state.vertical === 'product'
        ? {
            productName: state.productData.productName || null,
            brandName: state.productData.brandName || null,
            modelNumber: state.productData.modelNumber || null,
            description: state.productData.description || null,
            manualUrl: state.productData.manualUrl || null,
            videoTutorialUrl: state.productData.videoTutorialUrl || null,
            troubleshootingUrl: state.productData.troubleshootingUrl || null,
            warrantyDuration: state.productData.warrantyDuration || null,
            warrantyDetails: state.productData.warrantyDetails || null,
            registrationUrl: state.productData.registrationUrl || null,
            supportEmail: state.productData.supportEmail || null,
            supportPhone: state.productData.supportPhone || null,
            quickStartSteps: state.productData.quickStartSteps
              ? state.productData.quickStartSteps
                  .split('\n')
                  .map((line) => {
                    const idx = line.indexOf(':')
                    if (idx === -1) return { title: line.trim(), description: '' }
                    return {
                      title: line.substring(0, idx).trim(),
                      description: line.substring(idx + 1).trim(),
                    }
                  })
                  .filter((step) => step.title)
              : null,
          }
        : undefined,
    feedbackData:
      state.vertical === 'feedback'
        ? {
            companyName: state.feedbackData.companyName || null,
            heading: state.feedbackData.heading || 'Votre avis compte !',
            subheading: state.feedbackData.subheading || null,
            googleReviewUrl: state.feedbackData.googleReviewUrl || null,
            tripadvisorUrl: state.feedbackData.tripadvisorUrl || null,
            trustpilotUrl: state.feedbackData.trustpilotUrl || null,
            customReviewUrl: state.feedbackData.customReviewUrl || null,
            customReviewLabel: state.feedbackData.customReviewLabel || null,
            enableDirectForm: state.feedbackData.enableDirectForm === 'on',
            directFormEmail: state.feedbackData.directFormEmail || null,
            promptQuestion: state.feedbackData.promptQuestion || 'Qu\'aurions-nous pu mieux faire ?',
          }
        : undefined,
    tourismData:
      state.vertical === 'tourism'
        ? {
            placeName: state.tourismData.placeName || null,
            locationName: state.tourismData.locationName || null,
            historicPeriod: state.tourismData.historicPeriod || null,
            description: state.tourismData.description || null,
            audioGuideUrl: state.tourismData.audioGuideUrl || null,
            videoUrl: state.tourismData.videoUrl || null,
            latitude: state.tourismData.latitude || null,
            longitude: state.tourismData.longitude || null,
            address: state.tourismData.address || null,
            openingHours: state.tourismData.openingHours || null,
            entryFee: state.tourismData.entryFee || null,
            websiteUrl: state.tourismData.websiteUrl || null,
            contactPhone: state.tourismData.contactPhone || null,
            pointsOfInterest: state.tourismData.pointsOfInterest
              ? state.tourismData.pointsOfInterest
                  .split('\n')
                  .map((line) => {
                    const idx = line.indexOf(':')
                    if (idx === -1) return { name: line.trim(), description: '' }
                    return {
                      name: line.substring(0, idx).trim(),
                      description: line.substring(idx + 1).trim(),
                    }
                  })
                  .filter((poi) => poi.name)
              : null,
          }
        : undefined,
  }
}

export async function createQrCodeAction(formData: FormData) {
  await requireAuth()

  const state = parseFormData(formData)

  if (!state.title) {
    return { error: 'Le titre est obligatoire' }
  }

  try {
    const page = await createLandingPage(toPayloadData(state))
    revalidatePath('/dashboard')
    redirect(`/dashboard/${page.id}`)
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Erreur lors de la création',
    }
  }
}

export async function updateQrCodeAction(id: string, formData: FormData) {
  await requireAuth()

  const state = parseFormData(formData)

  if (!state.title) {
    return { error: 'Le titre est obligatoire' }
  }

  try {
    await updateLandingPage(id, toPayloadData(state))
    revalidatePath('/dashboard')
    revalidatePath(`/dashboard/${id}`)
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour',
    }
  }
}

export async function deleteQrCodeAction(id: string) {
  await requireAuth()

  try {
    await deleteLandingPage(id)
    revalidatePath('/dashboard')
    redirect('/dashboard')
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Erreur lors de la suppression',
    }
  }
}

export async function togglePublishAction(id: string, currentStatus: 'draft' | 'published') {
  await requireAuth()

  const nextStatus = currentStatus === 'published' ? 'draft' : 'published'

  await updateLandingPage(id, { status: nextStatus })
  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/${id}`)
}
