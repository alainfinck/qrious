import React, { useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import * as Clipboard from 'expo-clipboard'
import { Shuffle } from 'lucide-react-native'

import { Badge, Button, Input, TextArea } from './ui'
import {
  VERTICAL_OPTIONS,
  emptyFormState,
  formStateFromPage,
  toLandingPageInput,
  type FormState,
} from '../lib/form-state'
import { generateRandomSlug, getQrTargetUrl, STATUS_LABELS, VERTICAL_LABELS } from '../lib/utils'
import { colors, spacing } from '../theme/colors'
import type { LandingPage, LandingPageInput, LandingPageVertical } from '../types/landing-page'

const STEPS = [
  { id: 'identity', label: 'Identité' },
  { id: 'content', label: 'Contenu' },
  { id: 'publish', label: 'Publication' },
] as const

type Props = {
  page?: LandingPage
  initialVertical?: LandingPageVertical
  submitLabel: string
  onSubmit: (data: LandingPageInput) => Promise<void>
  onDelete?: () => Promise<void>
}

export function QrCodeForm({ page, initialVertical, submitLabel, onSubmit, onDelete }: Props) {
  const { width } = useWindowDimensions()
  const wide = width >= 960
  const [step, setStep] = useState(0)
  const [state, setState] = useState<FormState>(() =>
    page ? formStateFromPage(page) : emptyFormState(initialVertical || 'generic'),
  )
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const publicUrl = useMemo(
    () => (state.slug ? getQrTargetUrl(state.slug) : getQrTargetUrl('slug')),
    [state.slug],
  )

  async function handleSubmit() {
    if (!state.title.trim()) {
      setError('Le titre est obligatoire')
      setStep(0)
      return
    }
    if (state.vertical === 'redirect' && !state.redirectTargetUrl.trim()) {
      setError('L’URL de redirection est obligatoire')
      setStep(1)
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSubmit(toLandingPageInput(state))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l’enregistrement')
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={[styles.wrap, wide && styles.wrapWide]}>
      <View style={[styles.main, wide && { flex: 1.4 }]}>
        <View style={styles.steps}>
          {STEPS.map((s, index) => (
            <Pressable
              key={s.id}
              onPress={() => setStep(index)}
              style={[styles.step, step === index && styles.stepActive]}
            >
              <Text style={[styles.stepLabel, step === index && styles.stepLabelActive]}>
                {index + 1}. {s.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.formBody} keyboardShouldPersistTaps="handled">
          {step === 0 ? (
            <View style={styles.section}>
              <Input
                label="Titre"
                value={state.title}
                onChangeText={(v) => setField('title', v)}
                placeholder="Ex: Menu du jour, Œuvre #12…"
              />
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Slug URL"
                    value={state.slug}
                    onChangeText={(v) => setField('slug', v)}
                    autoCapitalize="none"
                  />
                </View>
                <Pressable
                  style={styles.shuffle}
                  onPress={() => setField('slug', generateRandomSlug(4))}
                >
                  <Shuffle size={18} color={colors.slate600} />
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>Univers</Text>
              <View style={styles.verticalGrid}>
                {VERTICAL_OPTIONS.map((option) => {
                  const active = state.vertical === option.value
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => setField('vertical', option.value)}
                      style={[styles.verticalCard, active && styles.verticalCardActive]}
                    >
                      <Text style={[styles.verticalLabel, active && { color: colors.white }]}>
                        {option.label}
                      </Text>
                      <Text
                        style={[styles.verticalDesc, active && { color: 'rgba(255,255,255,0.75)' }]}
                      >
                        {option.description}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>
          ) : null}

          {step === 1 ? <VerticalFields state={state} setField={setField} /> : null}

          {step === 2 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Statut</Text>
              <View style={styles.statusRow}>
                {(['draft', 'published'] as const).map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => setField('status', status)}
                    style={[
                      styles.statusChip,
                      state.status === status && styles.statusChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusChipText,
                        state.status === status && { color: colors.white },
                      ]}
                    >
                      {STATUS_LABELS[status]}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Input
                label="Couleur de marque"
                value={state.primaryColor}
                onChangeText={(v) => setField('primaryColor', v)}
                autoCapitalize="none"
                placeholder="#0f172a"
              />

              <Text style={styles.sectionTitle}>Smart routing</Text>
              <Input
                label="Mode (none | time_slots | ab_test)"
                value={state.smartRoutingMode}
                onChangeText={(v) => setField('smartRoutingMode', v)}
                autoCapitalize="none"
              />
              {state.smartRoutingMode === 'time_slots' ? (
                <>
                  <Input
                    label="Créneau — label"
                    value={state.slot1Label}
                    onChangeText={(v) => setField('slot1Label', v)}
                  />
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Input
                        label="Début"
                        value={state.slot1Start}
                        onChangeText={(v) => setField('slot1Start', v)}
                        placeholder="07:00"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Input
                        label="Fin"
                        value={state.slot1End}
                        onChangeText={(v) => setField('slot1End', v)}
                        placeholder="11:00"
                      />
                    </View>
                  </View>
                  <Input
                    label="Slug cible"
                    value={state.slot1Target}
                    onChangeText={(v) => setField('slot1Target', v)}
                    autoCapitalize="none"
                  />
                </>
              ) : null}
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>A/B test</Text>
                <Switch
                  value={state.abTestEnabled}
                  onValueChange={(v) => setField('abTestEnabled', v)}
                />
              </View>
              {state.abTestEnabled ? (
                <>
                  <Input
                    label="Variant A slug"
                    value={state.variantASlug}
                    onChangeText={(v) => setField('variantASlug', v)}
                    autoCapitalize="none"
                  />
                  <Input
                    label="Variant B slug"
                    value={state.variantBSlug}
                    onChangeText={(v) => setField('variantBSlug', v)}
                    autoCapitalize="none"
                  />
                  <Input
                    label="Split %"
                    value={state.splitRatio}
                    onChangeText={(v) => setField('splitRatio', v)}
                    keyboardType="numeric"
                  />
                </>
              ) : null}
            </View>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.footerActions}>
            {step > 0 ? (
              <Button label="Précédent" variant="secondary" onPress={() => setStep((s) => s - 1)} />
            ) : (
              <View />
            )}
            {step < STEPS.length - 1 ? (
              <Button label="Suivant" onPress={() => setStep((s) => s + 1)} />
            ) : (
              <Button label={submitLabel} loading={saving} onPress={() => void handleSubmit()} />
            )}
          </View>

          {onDelete ? (
            <Button
              label="Supprimer"
              variant="danger"
              onPress={() => void onDelete()}
              disabled={saving}
            />
          ) : null}
        </ScrollView>
      </View>

      <View style={[styles.preview, wide && { flex: 1 }]}>
        <Text style={styles.previewTitle}>Aperçu QR</Text>
        <View style={styles.qrBox}>
          <QRCode value={publicUrl} size={180} color={state.primaryColor || '#0f172a'} />
        </View>
        <Badge label={VERTICAL_LABELS[state.vertical]} tone="accent" />
        <Badge
          label={STATUS_LABELS[state.status]}
          tone={state.status === 'published' ? 'success' : 'warning'}
        />
        <Text style={styles.url} numberOfLines={2}>
          {publicUrl}
        </Text>
        <Button
          label={copied ? 'Copié !' : 'Copier l’URL'}
          variant="secondary"
          onPress={async () => {
            await Clipboard.setStringAsync(publicUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
        />
      </View>
    </View>
  )
}

function VerticalFields({
  state,
  setField,
}: {
  state: FormState
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}) {
  switch (state.vertical) {
    case 'redirect':
      return (
        <View style={styles.section}>
          <Input
            label="URL cible"
            value={state.redirectTargetUrl}
            onChangeText={(v) => setField('redirectTargetUrl', v)}
            autoCapitalize="none"
            placeholder="https://"
          />
          <Input
            label="Label"
            value={state.redirectLabel}
            onChangeText={(v) => setField('redirectLabel', v)}
          />
        </View>
      )
    case 'art':
      return (
        <View style={styles.section}>
          <Input label="Artiste" value={state.artistName} onChangeText={(v) => setField('artistName', v)} />
          <TextArea label="Bio" value={state.artistBio} onChangeText={(v) => setField('artistBio', v)} />
          <Input label="Année" value={state.artYear} onChangeText={(v) => setField('artYear', v)} />
          <Input label="Technique" value={state.medium} onChangeText={(v) => setField('medium', v)} />
          <Input label="Dimensions" value={state.dimensions} onChangeText={(v) => setField('dimensions', v)} />
          <TextArea
            label="Description"
            value={state.artDescription}
            onChangeText={(v) => setField('artDescription', v)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Prix" value={state.artPrice} onChangeText={(v) => setField('artPrice', v)} keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Devise" value={state.currency} onChangeText={(v) => setField('currency', v)} />
            </View>
          </View>
          <Input label="Exposition" value={state.exhibitionName} onChangeText={(v) => setField('exhibitionName', v)} />
          <Input label="Vidéo URL" value={state.videoUrl} onChangeText={(v) => setField('videoUrl', v)} autoCapitalize="none" />
          <Input label="Audio-guide URL" value={state.audioGuideUrl} onChangeText={(v) => setField('audioGuideUrl', v)} autoCapitalize="none" />
          <Input label="Instagram" value={state.instagramUsername} onChangeText={(v) => setField('instagramUsername', v)} autoCapitalize="none" />
          <Input label="Site web" value={state.websiteUrl} onChangeText={(v) => setField('websiteUrl', v)} autoCapitalize="none" />
          <Input label="Email contact" value={state.contactEmail} onChangeText={(v) => setField('contactEmail', v)} autoCapitalize="none" />
        </View>
      )
    case 'immo':
      return (
        <View style={styles.section}>
          <Input label="Prix" value={state.price} onChangeText={(v) => setField('price', v)} keyboardType="numeric" />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Surface" value={state.surface} onChangeText={(v) => setField('surface', v)} keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Pièces" value={state.rooms} onChangeText={(v) => setField('rooms', v)} keyboardType="numeric" />
            </View>
          </View>
          <Input label="DPE" value={state.dpe} onChangeText={(v) => setField('dpe', v)} placeholder="A-G" />
          <Input label="Type" value={state.propertyType} onChangeText={(v) => setField('propertyType', v)} placeholder="apartment, house…" />
          <Input label="Adresse" value={state.address} onChangeText={(v) => setField('address', v)} />
          <Input label="Ville" value={state.city} onChangeText={(v) => setField('city', v)} />
          <TextArea label="Message d’accueil" value={state.welcomeMessage} onChangeText={(v) => setField('welcomeMessage', v)} />
          <Input label="Wi-Fi" value={state.wifiName} onChangeText={(v) => setField('wifiName', v)} />
          <Input label="Mot de passe Wi-Fi" value={state.wifiPassword} onChangeText={(v) => setField('wifiPassword', v)} />
          <Input label="Hôte" value={state.hostName} onChangeText={(v) => setField('hostName', v)} />
          <Input label="Tél. hôte" value={state.hostPhone} onChangeText={(v) => setField('hostPhone', v)} />
          <Input label="URL réservation" value={state.bookingUrl} onChangeText={(v) => setField('bookingUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'vcard':
      return (
        <View style={styles.section}>
          <Input label="Nom complet" value={state.fullName} onChangeText={(v) => setField('fullName', v)} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input label="Prénom" value={state.firstName} onChangeText={(v) => setField('firstName', v)} />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Nom" value={state.lastName} onChangeText={(v) => setField('lastName', v)} />
            </View>
          </View>
          <Input label="Poste" value={state.jobTitle} onChangeText={(v) => setField('jobTitle', v)} />
          <Input label="Société" value={state.company} onChangeText={(v) => setField('company', v)} />
          <TextArea label="Bio" value={state.bio} onChangeText={(v) => setField('bio', v)} />
          <Input label="Téléphone" value={state.phone} onChangeText={(v) => setField('phone', v)} />
          <Input label="Email" value={state.email} onChangeText={(v) => setField('email', v)} autoCapitalize="none" />
          <Input label="Site" value={state.website} onChangeText={(v) => setField('website', v)} autoCapitalize="none" />
          <Input label="LinkedIn" value={state.linkedinUrl} onChangeText={(v) => setField('linkedinUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'product':
      return (
        <View style={styles.section}>
          <Input label="Produit" value={state.productName} onChangeText={(v) => setField('productName', v)} />
          <Input label="Marque" value={state.brandName} onChangeText={(v) => setField('brandName', v)} />
          <Input label="Modèle" value={state.modelNumber} onChangeText={(v) => setField('modelNumber', v)} />
          <TextArea label="Description" value={state.productDescription} onChangeText={(v) => setField('productDescription', v)} />
          <Input label="Manuel URL" value={state.manualUrl} onChangeText={(v) => setField('manualUrl', v)} autoCapitalize="none" />
          <Input label="Support email" value={state.supportEmail} onChangeText={(v) => setField('supportEmail', v)} autoCapitalize="none" />
        </View>
      )
    case 'feedback':
      return (
        <View style={styles.section}>
          <Input label="Entreprise" value={state.feedbackCompanyName} onChangeText={(v) => setField('feedbackCompanyName', v)} />
          <Input label="Titre" value={state.feedbackHeading} onChangeText={(v) => setField('feedbackHeading', v)} />
          <Input label="Google Review URL" value={state.googleReviewUrl} onChangeText={(v) => setField('googleReviewUrl', v)} autoCapitalize="none" />
          <Input label="TripAdvisor URL" value={state.tripadvisorUrl} onChangeText={(v) => setField('tripadvisorUrl', v)} autoCapitalize="none" />
        </View>
      )
    case 'tourism':
      return (
        <View style={styles.section}>
          <Input label="Lieu" value={state.placeName} onChangeText={(v) => setField('placeName', v)} />
          <Input label="Localisation" value={state.locationName} onChangeText={(v) => setField('locationName', v)} />
          <TextArea label="Description" value={state.tourismDescription} onChangeText={(v) => setField('tourismDescription', v)} />
          <Input label="Audio-guide" value={state.tourismAudioGuideUrl} onChangeText={(v) => setField('tourismAudioGuideUrl', v)} autoCapitalize="none" />
          <Input label="Horaires" value={state.openingHours} onChangeText={(v) => setField('openingHours', v)} />
        </View>
      )
    case 'chrd':
      return (
        <View style={styles.section}>
          <Input label="Établissement" value={state.establishmentName} onChangeText={(v) => setField('establishmentName', v)} />
          <Input label="Type" value={state.establishmentType} onChangeText={(v) => setField('establishmentType', v)} placeholder="hotel, restaurant…" />
          <TextArea label="Message" value={state.chrdWelcomeMessage} onChangeText={(v) => setField('chrdWelcomeMessage', v)} />
          <Input label="Menu PDF URL" value={state.menuPdfUrl} onChangeText={(v) => setField('menuPdfUrl', v)} autoCapitalize="none" />
          <Input label="Wi-Fi" value={state.chrdWifiName} onChangeText={(v) => setField('chrdWifiName', v)} />
          <Input label="Mot de passe Wi-Fi" value={state.chrdWifiPassword} onChangeText={(v) => setField('chrdWifiPassword', v)} />
        </View>
      )
    case 'corporate_event':
      return (
        <View style={styles.section}>
          <Input label="Événement" value={state.eventName} onChangeText={(v) => setField('eventName', v)} />
          <Input label="Société" value={state.eventCompanyName} onChangeText={(v) => setField('eventCompanyName', v)} />
          <Input label="Date" value={state.eventDate} onChangeText={(v) => setField('eventDate', v)} />
          <Input label="Lieu" value={state.eventLocation} onChangeText={(v) => setField('eventLocation', v)} />
          <TextArea label="Message" value={state.eventWelcomeMessage} onChangeText={(v) => setField('eventWelcomeMessage', v)} />
          <Input label="Code Wi-Fi" value={state.wifiCode} onChangeText={(v) => setField('wifiCode', v)} />
        </View>
      )
    case 'ugc_retail':
      return (
        <View style={styles.section}>
          <Input label="Marque" value={state.ugcBrandName} onChangeText={(v) => setField('ugcBrandName', v)} />
          <Input label="Campagne" value={state.campaignTitle} onChangeText={(v) => setField('campaignTitle', v)} />
          <Input label="Produit" value={state.ugcProductName} onChangeText={(v) => setField('ugcProductName', v)} />
          <TextArea label="Instructions" value={state.instructions} onChangeText={(v) => setField('instructions', v)} />
          <Input label="Code promo" value={state.rewardDiscountCode} onChangeText={(v) => setField('rewardDiscountCode', v)} />
        </View>
      )
    case 'field_service':
      return (
        <View style={styles.section}>
          <Input label="Asset" value={state.assetName} onChangeText={(v) => setField('assetName', v)} />
          <Input label="ID" value={state.assetId} onChangeText={(v) => setField('assetId', v)} />
          <Input label="Catégorie" value={state.category} onChangeText={(v) => setField('category', v)} />
          <Input label="Localisation" value={state.fieldLocation} onChangeText={(v) => setField('fieldLocation', v)} />
          <Input label="Statut" value={state.fieldStatus} onChangeText={(v) => setField('fieldStatus', v)} placeholder="operational…" />
          <Input label="Documentation URL" value={state.documentationUrl} onChangeText={(v) => setField('documentationUrl', v)} autoCapitalize="none" />
          <Input label="Tél. technicien" value={state.contactTechnicianPhone} onChangeText={(v) => setField('contactTechnicianPhone', v)} />
        </View>
      )
    default:
      return (
        <View style={styles.section}>
          <Input label="Headline" value={state.genericHeadline} onChangeText={(v) => setField('genericHeadline', v)} />
          <Input label="Sous-titre" value={state.genericSubheadline} onChangeText={(v) => setField('genericSubheadline', v)} />
          <TextArea label="Corps" value={state.genericBody} onChangeText={(v) => setField('genericBody', v)} />
          <Input label="CTA label" value={state.genericCtaLabel} onChangeText={(v) => setField('genericCtaLabel', v)} />
          <Input label="CTA URL" value={state.genericCtaUrl} onChangeText={(v) => setField('genericCtaUrl', v)} autoCapitalize="none" />
          <Input label="Site web" value={state.genericWebsiteUrl} onChangeText={(v) => setField('genericWebsiteUrl', v)} autoCapitalize="none" />
          <Input label="Email" value={state.genericContactEmail} onChangeText={(v) => setField('genericContactEmail', v)} autoCapitalize="none" />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xl,
  },
  wrapWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  main: {
    flex: 1,
    gap: spacing.lg,
  },
  steps: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  step: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  stepActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate600,
  },
  stepLabelActive: {
    color: colors.white,
  },
  formBody: {
    gap: spacing.lg,
    paddingBottom: 40,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  shuffle: {
    height: 44,
    width: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginBottom: 0,
  },
  verticalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  verticalCard: {
    width: '47%',
    minWidth: 140,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    padding: 12,
    gap: 4,
  },
  verticalCardActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  verticalLabel: {
    fontWeight: '700',
    color: colors.ink,
    fontSize: 14,
  },
  verticalDesc: {
    fontSize: 12,
    color: colors.slate500,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  statusChipActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  statusChipText: {
    fontWeight: '600',
    color: colors.slate700,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchLabel: {
    fontWeight: '600',
    color: colors.slate700,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  error: {
    color: colors.danger,
    fontWeight: '600',
  },
  preview: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  previewTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  qrBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.slate50,
  },
  url: {
    fontSize: 12,
    color: colors.slate500,
    textAlign: 'center',
  },
})
