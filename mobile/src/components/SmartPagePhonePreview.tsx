import React, { useMemo } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import type { FormState } from '../lib/form-state'
import { VERTICAL_LABELS } from '../lib/utils'
import { colors, spacing } from '../theme/colors'

type PreviewCopy = {
  eyebrow: string
  title: string
  subtitle?: string
  body?: string
  cta?: string
  meta?: string[]
}

function previewCopyFromState(state: FormState): PreviewCopy {
  const fallbackTitle = state.title.trim() || 'Sans titre'
  const label = VERTICAL_LABELS[state.vertical]

  switch (state.vertical) {
    case 'generic':
      return {
        eyebrow: label,
        title: state.genericHeadline.trim() || fallbackTitle,
        subtitle: state.genericSubheadline.trim() || undefined,
        body: state.genericBody.trim() || undefined,
        cta: state.genericCtaLabel.trim() || (state.genericCtaUrl ? 'En savoir plus' : undefined),
      }
    case 'redirect':
      return {
        eyebrow: label,
        title: fallbackTitle,
        subtitle: state.redirectLabel.trim() || 'Redirection',
        body: state.redirectTargetUrl.trim() || 'URL cible non renseignée',
        cta: 'Ouvrir le lien',
      }
    case 'art':
      return {
        eyebrow: state.exhibitionName.trim() || label,
        title: fallbackTitle,
        subtitle: state.artistName.trim() || undefined,
        body: state.artDescription.trim() || undefined,
        cta: state.artPrice.trim()
          ? `${state.artPrice.trim()} ${state.currency.trim() || '€'}`
          : 'Découvrir',
        meta: [state.artYear, state.medium].filter(Boolean) as string[],
      }
    case 'immo':
      return {
        eyebrow: state.propertyType.trim() || label,
        title: fallbackTitle,
        subtitle: [state.city, state.address].filter(Boolean).join(' · ') || undefined,
        body: state.welcomeMessage.trim() || undefined,
        cta: state.price.trim() ? state.price.trim() : state.bookingUrl ? 'Réserver' : undefined,
        meta: [state.surface && `${state.surface} m²`, state.rooms && `${state.rooms} pièces`].filter(
          Boolean,
        ) as string[],
      }
    case 'vcard':
      return {
        eyebrow: state.company.trim() || label,
        title: state.fullName.trim() || [state.firstName, state.lastName].filter(Boolean).join(' ') || fallbackTitle,
        subtitle: state.jobTitle.trim() || undefined,
        body: state.bio.trim() || undefined,
        cta: 'Enregistrer le contact',
        meta: [state.email, state.phone].filter(Boolean) as string[],
      }
    case 'product':
      return {
        eyebrow: state.brandName.trim() || label,
        title: state.productName.trim() || fallbackTitle,
        subtitle: state.modelNumber.trim() || undefined,
        body: state.productDescription.trim() || undefined,
        cta: state.manualUrl ? 'Voir la notice' : 'Support',
      }
    case 'feedback':
      return {
        eyebrow: state.feedbackCompanyName.trim() || label,
        title: state.feedbackHeading.trim() || fallbackTitle,
        subtitle: 'Votre avis compte',
        cta: 'Laisser un avis',
      }
    case 'tourism':
      return {
        eyebrow: state.locationName.trim() || label,
        title: state.placeName.trim() || fallbackTitle,
        body: state.tourismDescription.trim() || undefined,
        cta: state.tourismAudioGuideUrl ? 'Audio-guide' : 'Explorer',
        meta: state.openingHours.trim() ? [state.openingHours.trim()] : undefined,
      }
    case 'chrd':
      return {
        eyebrow: state.establishmentType.trim() || label,
        title: state.establishmentName.trim() || fallbackTitle,
        body: state.chrdWelcomeMessage.trim() || undefined,
        cta: state.menuPdfUrl ? 'Voir le menu' : 'Bienvenue',
        meta: state.chrdWifiName.trim() ? [`Wi-Fi · ${state.chrdWifiName.trim()}`] : undefined,
      }
    case 'corporate_event':
      return {
        eyebrow: state.eventCompanyName.trim() || label,
        title: state.eventName.trim() || fallbackTitle,
        subtitle: [state.eventDate, state.eventLocation].filter(Boolean).join(' · ') || undefined,
        body: state.eventWelcomeMessage.trim() || undefined,
        cta: 'Rejoindre l’événement',
      }
    case 'ugc_retail':
      return {
        eyebrow: state.ugcBrandName.trim() || label,
        title: state.campaignTitle.trim() || fallbackTitle,
        subtitle: state.ugcProductName.trim() || undefined,
        body: state.instructions.trim() || undefined,
        cta: state.rewardDiscountCode.trim()
          ? `Code ${state.rewardDiscountCode.trim()}`
          : 'Participer',
      }
    case 'field_service':
      return {
        eyebrow: state.category.trim() || label,
        title: state.assetName.trim() || fallbackTitle,
        subtitle: state.assetId.trim() ? `ID ${state.assetId.trim()}` : undefined,
        body: state.fieldLocation.trim() || undefined,
        cta: state.documentationUrl ? 'Documentation' : 'Signaler',
        meta: state.fieldStatus.trim() ? [state.fieldStatus.trim()] : undefined,
      }
    default:
      return { eyebrow: label, title: fallbackTitle }
  }
}

type Props = {
  state: FormState
  /** When set, web can load the live published page in an iframe */
  liveUrl?: string | null
  preferLive?: boolean
}

/** Outer bezel (~iPhone proportions). */
const PHONE_W = 300
const PHONE_H = 620
/** borderWidth×2 + padding×2 */
const PHONE_CHROME = 8 * 2 + 4 * 2
/** Real phone CSS size so responsive pages layout as on mobile. */
const MOBILE_VIEWPORT_W = 390
const MOBILE_VIEWPORT_H = 844
/** Status bar + Dynamic Island band (frame px). */
const SAFE_TOP = 44

export function SmartPagePhonePreview({ state, liveUrl, preferLive = false }: Props) {
  const copy = useMemo(() => previewCopyFromState(state), [state])
  const primary = state.primaryColor?.trim() || colors.ink
  const showLive = Boolean(preferLive && liveUrl && Platform.OS === 'web' && state.status === 'published')

  const screenW = PHONE_W - PHONE_CHROME
  const screenH = PHONE_H - PHONE_CHROME
  const contentH = screenH - SAFE_TOP
  const scale = screenW / MOBILE_VIEWPORT_W
  const viewportH = Math.max(MOBILE_VIEWPORT_H, Math.ceil(contentH / scale))

  return (
    <View style={styles.wrap} accessibilityLabel="Aperçu smartphone de la Smart Page">
      <View style={styles.phone}>
        <View style={[styles.phoneSafeArea, { height: SAFE_TOP }]} pointerEvents="none">
          <View style={styles.dynamicIsland} />
        </View>
        <View style={[styles.screen, { height: contentH }]}>
          {showLive ? (
            <View style={[styles.viewport, { width: screenW, height: contentH }]}>
              {/* @ts-expect-error iframe is web-only */}
              <iframe
                title="Aperçu Smart Page"
                src={liveUrl!}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: MOBILE_VIEWPORT_W,
                  height: viewportH,
                  border: 'none',
                  background: '#fff',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  display: 'block',
                }}
              />
            </View>
          ) : (
            <View style={[styles.page, { backgroundColor: '#F8FAFC' }]}>
              <View style={[styles.hero, { backgroundColor: primary }]}>
                <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
                <Text style={styles.heroTitle} numberOfLines={3}>
                  {copy.title}
                </Text>
                {copy.subtitle ? (
                  <Text style={styles.heroSubtitle} numberOfLines={2}>
                    {copy.subtitle}
                  </Text>
                ) : null}
              </View>

              <View style={styles.body}>
                <View style={styles.bodyMain}>
                  {copy.meta && copy.meta.length > 0 ? (
                    <View style={styles.metaRow}>
                      {copy.meta.slice(0, 3).map((item) => (
                        <View key={item} style={styles.metaChip}>
                          <Text style={styles.metaChipText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {copy.body ? (
                    <Text style={styles.bodyText} numberOfLines={8}>
                      {copy.body}
                    </Text>
                  ) : (
                    <Text style={styles.bodyPlaceholder}>
                      Remplissez le contenu pour voir l’aperçu de la page scannée.
                    </Text>
                  )}

                  {copy.cta ? (
                    <View style={[styles.cta, { backgroundColor: primary }]}>
                      <Text style={styles.ctaText} numberOfLines={1}>
                        {copy.cta}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.footerHint}>
                  <View style={styles.homeIndicator} />
                  <Text style={styles.footerText}>Aperçu · {VERTICAL_LABELS[state.vertical]}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  phone: {
    width: PHONE_W,
    height: PHONE_H,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#0F172A',
    backgroundColor: '#0F172A',
    padding: 4,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  phoneSafeArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    zIndex: 2,
  },
  dynamicIsland: {
    width: 108,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  screen: {
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  viewport: {
    overflow: 'hidden',
    position: 'relative',
  },
  page: {
    flex: 1,
    height: '100%',
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 26,
    gap: 8,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.72)',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.84)',
    lineHeight: 21,
  },
  body: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  bodyMain: {
    gap: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaChip: {
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate600,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate600,
  },
  bodyPlaceholder: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.slate400,
    fontStyle: 'italic',
  },
  cta: {
    marginTop: 4,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  footerHint: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  homeIndicator: {
    width: 108,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.slate300,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.slate400,
    letterSpacing: 0.2,
  },
})
