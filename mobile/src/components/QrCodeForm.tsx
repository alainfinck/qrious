import React, { useMemo, useRef, useState } from 'react'
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { Link } from 'expo-router'
import {
  ArrowUpRight,
  Box,
  Building2,
  Calendar,
  Check,
  Compass,
  Download,
  FileType,
  LayoutGrid,
  Palette,
  QrCode,
  ShoppingBag,
  Shuffle,
  Sparkles,
  Star,
  User,
  Utensils,
  Wrench,
  type LucideIcon,
} from 'lucide-react-native'

import { Badge, Button, Input } from './ui'
import { QrStyleEditor } from './QrStyleEditor'
import { QrStyledPreview, type QrExportExtension, type QrPreviewHandle } from './QrStyledPreview'
import { SmartPagePhonePreview } from './SmartPagePhonePreview'
import { StaticContentFields } from './StaticContentFields'
import { VerticalFields } from './VerticalFields'
import {
  VERTICAL_OPTIONS,
  emptyFormState,
  formStateFromPage,
  toLandingPageInput,
  type FormState,
} from '../lib/form-state'
import {
  buildStaticQrPayload,
  defaultStaticPayload,
  isStaticPayloadReady,
  type StaticQrContentType,
  type StaticQrPayload,
} from '../lib/qr-payload'
import {
  STYLE_TEMPLATES,
  applyTemplate,
  type QrStyle,
  type QrStyleTemplate,
} from '../lib/qr-style'
import { generateRandomSlug, getQrTargetUrl, STATUS_LABELS, VERTICAL_LABELS } from '../lib/utils'
import { colors, spacing } from '../theme/colors'
import type { LandingPage, LandingPageInput, LandingPageVertical } from '../types/landing-page'

type QrMode = 'smart' | 'static'

const SMART_STEPS = [
  { id: 'identity', label: 'Identité' },
  { id: 'content', label: 'Contenu' },
  { id: 'design', label: 'Design' },
  { id: 'publish', label: 'Publication' },
] as const

const STATIC_STEPS = [
  { id: 'content', label: 'Contenu' },
  { id: 'design', label: 'Design' },
] as const

const INITIAL_TEMPLATE = STYLE_TEMPLATES.find((t) => t.id === 'signal')!
const INITIAL_STYLE = applyTemplate(INITIAL_TEMPLATE)

const VERTICAL_ICONS: Record<LandingPageVertical, LucideIcon> = {
  generic: LayoutGrid,
  redirect: ArrowUpRight,
  art: Palette,
  immo: Building2,
  vcard: User,
  product: Box,
  feedback: Star,
  tourism: Compass,
  chrd: Utensils,
  corporate_event: Calendar,
  ugc_retail: ShoppingBag,
  field_service: Wrench,
}

type Props = {
  page?: LandingPage
  initialVertical?: LandingPageVertical
  initialStaticType?: StaticQrContentType
  /** Prefill URL (type url) — sites partenaires / deep links */
  initialUrl?: string
  /** Verrouille le contenu sur une URL (pas de changement de type) */
  lockUrl?: boolean
  /** Mode invité (éditeur public) : export OK, publication → compte */
  guestMode?: boolean
  /**
   * Mode iframe / site externe : pas d’upsell compte, chrome allégé.
   * Combiné à guestMode pour l’export statique.
   */
  embedMode?: boolean
  submitLabel: string
  onSubmit: (data: LandingPageInput) => Promise<void>
  onDelete?: () => Promise<void>
}

function initialStaticState(
  initialStaticType: StaticQrContentType,
  initialUrl?: string,
  lockUrl?: boolean,
): { type: StaticQrContentType; payload: StaticQrPayload } {
  if (initialUrl && (lockUrl || initialStaticType === 'url')) {
    return { type: 'url', payload: { type: 'url', data: { url: initialUrl } } }
  }
  return { type: initialStaticType, payload: defaultStaticPayload(initialStaticType) }
}

export function QrCodeForm({
  page,
  initialVertical,
  initialStaticType = 'url',
  initialUrl,
  lockUrl = false,
  guestMode = false,
  embedMode = false,
  submitLabel,
  onSubmit,
  onDelete,
}: Props) {
  const { width } = useWindowDimensions()
  const wide = width >= 960
  const [mode, setMode] = useState<QrMode>(guestMode || embedMode ? 'static' : 'smart')
  const [step, setStep] = useState(0)
  const [state, setState] = useState<FormState>(() =>
    page ? formStateFromPage(page) : emptyFormState(initialVertical || 'generic'),
  )
  const boot = initialStaticState(initialStaticType, initialUrl, lockUrl)
  const [staticType, setStaticType] = useState<StaticQrContentType>(boot.type)
  const [staticPayload, setStaticPayload] = useState<StaticQrPayload>(boot.payload)
  const [qrStyle, setQrStyle] = useState<QrStyle>(INITIAL_STYLE)
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(INITIAL_TEMPLATE.id)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [previewTab, setPreviewTab] = useState<'qr' | 'page'>('qr')
  const previewInstanceRef = useRef<QrPreviewHandle | null>(null)

  const steps = mode === 'smart' ? SMART_STEPS : STATIC_STEPS
  const currentStepId = steps[step]?.id

  React.useEffect(() => {
    if (mode !== 'smart') return
    if (currentStepId === 'content' || currentStepId === 'identity') {
      setPreviewTab('page')
    } else if (currentStepId === 'design') {
      setPreviewTab('qr')
    }
  }, [mode, currentStepId])

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const publicUrl = useMemo(
    () => (state.slug ? getQrTargetUrl(state.slug) : getQrTargetUrl('slug')),
    [state.slug],
  )

  const encodedPayload = useMemo(() => {
    if (mode === 'static') {
      return isStaticPayloadReady(staticPayload) ? buildStaticQrPayload(staticPayload) : ''
    }
    return publicUrl
  }, [mode, staticPayload, publicUrl])

  const verticalMeta = useMemo(
    () => VERTICAL_OPTIONS.find((v) => v.value === state.vertical) ?? VERTICAL_OPTIONS[0],
    [state.vertical],
  )
  const ActiveIcon = VERTICAL_ICONS[state.vertical] ?? LayoutGrid
  const isLastStep = step >= steps.length - 1

  function switchMode(next: QrMode) {
    setMode(next)
    setStep(0)
    setError(null)
  }

  function handleStyleChange(next: QrStyle) {
    setQrStyle(next)
    setActiveTemplateId(null)
    if (next.dotsColor) setField('primaryColor', next.dotsColor)
  }

  function handleTemplateApply(tpl: QrStyleTemplate) {
    setActiveTemplateId(tpl.id)
  }

  async function handleExport(extension: QrExportExtension) {
    if (!encodedPayload) {
      setError('Renseignez le contenu avant d’exporter')
      return
    }
    if (Platform.OS !== 'web' || !previewInstanceRef.current) {
      setError('Export disponible sur la version web de l’app')
      return
    }
    if (extension === 'jpeg' && qrStyle.transparentBackground) {
      setError('JPEG ne supporte pas la transparence')
      return
    }
    setExporting(true)
    setError(null)
    try {
      await previewInstanceRef.current.download({
        name: `qrious-qr-${mode === 'static' ? staticType : state.slug || 'smart'}`,
        extension,
      })
    } catch {
      setError(`Export ${extension.toUpperCase()} impossible`)
    } finally {
      setExporting(false)
    }
  }

  async function handleExportPdf() {
    if (!encodedPayload) {
      setError('Renseignez le contenu avant d’exporter')
      return
    }
    if (Platform.OS !== 'web' || !previewInstanceRef.current) {
      setError('Export disponible sur la version web de l’app')
      return
    }
    setExporting(true)
    setError(null)
    try {
      const blob = await previewInstanceRef.current.getRawData('png')
      if (!blob) throw new Error('no blob')
      const { jsPDF } = await import('jspdf/dist/jspdf.es.min.js')
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image()
        el.onload = () => resolve(el)
        el.onerror = reject
        el.src = dataUrl
      })
      const maxMm = 90
      const ratio = img.width / img.height
      const w = ratio >= 1 ? maxMm : maxMm * ratio
      const h = ratio >= 1 ? maxMm / ratio : maxMm
      const pdf = new jsPDF({
        orientation: w >= h ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [w + 20, h + 20],
      })
      pdf.addImage(dataUrl, 'PNG', 10, 10, w, h)
      pdf.save(`qrious-qr-${mode === 'static' ? staticType : state.slug || 'smart'}.pdf`)
    } catch {
      setError('Export PDF impossible')
    } finally {
      setExporting(false)
    }
  }

  async function handleSubmit() {
    if (!state.title.trim()) {
      setError('Le titre est obligatoire')
      setStep(0)
      return
    }
    if (state.vertical === 'redirect' && !state.redirectTargetUrl.trim()) {
      setError('L’URL de redirection est obligatoire')
      const contentIdx = SMART_STEPS.findIndex((s) => s.id === 'content')
      setStep(contentIdx >= 0 ? contentIdx : 1)
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSubmit(
        toLandingPageInput({
          ...state,
          primaryColor: qrStyle.dotsColor || state.primaryColor,
        }),
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l’enregistrement')
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={[styles.wrap, wide && styles.wrapWide]}>
      <View style={[styles.main, wide && { flex: 1.4 }]}>
        {guestMode || embedMode ? (
          <>
            {!embedMode ? (
              <>
                <View style={styles.guestModeBanner}>
                  <QrCode size={16} color={colors.signal} />
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.guestModeTitle}>QR statique — prêt à exporter</Text>
                    <Text style={styles.guestModeHint}>
                      Contenu figé dans le code · Wi‑Fi, vCard, lien, texte…
                    </Text>
                  </View>
                </View>
                <View style={styles.smartUpsell}>
                  <View style={styles.smartUpsellIcon}>
                    <Sparkles size={16} color={colors.ink} />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.smartUpsellTitle}>Besoin d’une Smart Page ?</Text>
                    <Text style={styles.smartUpsellText}>
                      URL dynamique, contenu éditable, analytics — disponible après connexion.
                    </Text>
                  </View>
                  <Link href="/register" asChild>
                    <Pressable style={styles.smartUpsellCta}>
                      <Text style={styles.smartUpsellCtaText}>Créer un compte</Text>
                    </Pressable>
                  </Link>
                </View>
              </>
            ) : lockUrl ? (
              <View style={styles.guestModeBanner}>
                <QrCode size={16} color={colors.signal} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.guestModeTitle}>Personnalisez votre QR</Text>
                  <Text style={styles.guestModeHint}>
                    L’URL de destination est fixée · styles, formes et logo libres
                  </Text>
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <View style={styles.modeRow}>
              <Pressable
                onPress={() => switchMode('static')}
                style={[styles.modeBtn, mode === 'static' && styles.modeBtnActive]}
              >
                <QrCode size={15} color={mode === 'static' ? colors.white : colors.slate700} />
                <Text style={[styles.modeBtnText, mode === 'static' && styles.modeBtnTextActive]}>
                  Statique
                </Text>
              </Pressable>
              <Pressable
                onPress={() => switchMode('smart')}
                style={[styles.modeBtn, mode === 'smart' && styles.modeBtnActive]}
              >
                <Sparkles size={15} color={mode === 'smart' ? colors.white : colors.slate700} />
                <Text style={[styles.modeBtnText, mode === 'smart' && styles.modeBtnTextActive]}>
                  Smart Page
                </Text>
              </Pressable>
            </View>
            <Text style={styles.modeHint}>
              {mode === 'static'
                ? 'Contenu figé dans le QR — idéal Wi-Fi, vCard, lien direct.'
                : 'Landing éditable + analytics — destination modifiable sans réimprimer.'}
            </Text>
          </>
        )}

        <View style={styles.steps}>
          {steps.map((s, index) => {
            const active = step === index
            const done = step > index
            const isLast = index === steps.length - 1
            return (
              <React.Fragment key={s.id}>
                <Pressable
                  onPress={() => setStep(index)}
                  style={styles.stepItem}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <View
                    style={[
                      styles.stepIndex,
                      done && styles.stepIndexDone,
                      active && styles.stepIndexActive,
                    ]}
                  >
                    {done ? (
                      <Check size={14} color={colors.ink} strokeWidth={3} />
                    ) : (
                      <Text
                        style={[
                          styles.stepIndexText,
                          (active || done) && styles.stepIndexTextActive,
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      done && styles.stepLabelDone,
                      active && styles.stepLabelActive,
                    ]}
                    numberOfLines={1}
                  >
                    {s.label}
                  </Text>
                </Pressable>
                {!isLast ? (
                  <View style={[styles.stepConnector, step > index && styles.stepConnectorDone]} />
                ) : null}
              </React.Fragment>
            )
          })}
        </View>

        <ScrollView contentContainerStyle={styles.formBody} keyboardShouldPersistTaps="handled">
          {mode === 'smart' && currentStepId === 'identity' ? (
            <SmartIdentityStep
              state={state}
              setField={setField}
              verticalMeta={verticalMeta}
              ActiveIcon={ActiveIcon}
            />
          ) : null}

          {mode === 'static' && currentStepId === 'content' ? (
            <StaticContentFields
              contentType={staticType}
              payload={staticPayload}
              lockUrl={lockUrl}
              onTypeChange={(type) => {
                if (lockUrl) return
                setStaticType(type)
                setStaticPayload(defaultStaticPayload(type))
              }}
              onPayloadChange={setStaticPayload}
            />
          ) : null}

          {mode === 'smart' && currentStepId === 'content' ? (
            <VerticalFields state={state} setField={setField} />
          ) : null}

          {currentStepId === 'design' ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Éditeur visuel</Text>
              <Text style={styles.universHint}>
                Templates, cadres, formes, couleurs et logo.
              </Text>
              <QrStyleEditor
                value={qrStyle}
                onChange={handleStyleChange}
                activeTemplateId={activeTemplateId}
                onTemplateApply={handleTemplateApply}
                onError={setError}
              />
            </View>
          ) : null}

          {mode === 'smart' && currentStepId === 'publish' ? (
            <PublishStep state={state} setField={setField} />
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.footerActions}>
            {step > 0 ? (
              <Button label="Précédent" variant="secondary" onPress={() => setStep((s) => s - 1)} />
            ) : (
              <View />
            )}
            {!isLastStep ? (
              <Button label="Suivant" onPress={() => setStep((s) => s + 1)} />
            ) : mode === 'static' ? (
              <Button
                label={exporting ? 'Export…' : 'Télécharger PNG'}
                loading={exporting}
                onPress={() => void handleExport('png')}
              />
            ) : (
              <Button label={submitLabel} loading={saving} onPress={() => void handleSubmit()} />
            )}
          </View>

          {onDelete && mode === 'smart' ? (
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
        <View style={styles.previewHead}>
          <Text style={styles.previewTitle}>Aperçu</Text>
          <Text style={styles.previewSubtitle}>
            {mode === 'static' ? 'QR statique · payload direct' : 'Smart Page · URL dynamique'}
          </Text>
        </View>

        {mode === 'smart' ? (
          <View style={styles.previewTabs}>
            <Pressable
              onPress={() => setPreviewTab('qr')}
              style={[styles.previewTab, previewTab === 'qr' && styles.previewTabActive]}
            >
              <Text style={[styles.previewTabText, previewTab === 'qr' && styles.previewTabTextActive]}>
                QR code
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setPreviewTab('page')}
              style={[styles.previewTab, previewTab === 'page' && styles.previewTabActive]}
            >
              <Text
                style={[styles.previewTabText, previewTab === 'page' && styles.previewTabTextActive]}
              >
                Page smartphone
              </Text>
            </Pressable>
          </View>
        ) : null}

        {mode === 'smart' ? (
          <View style={styles.previewModelRow}>
            <View style={styles.previewModelIcon}>
              <ActiveIcon size={18} color={colors.signal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.previewModelLabel}>{verticalMeta.label}</Text>
              <Text style={styles.previewModelMeta}>
                {verticalMeta.model} · {verticalMeta.category}
              </Text>
            </View>
          </View>
        ) : (
          <Badge label={`Statique · ${staticType}`} tone="accent" />
        )}

        {mode === 'static' || previewTab === 'qr' ? (
          <>
            <QrStyledPreview
              data={encodedPayload}
              style={qrStyle}
              displaySize={mode === 'smart' ? 260 : 300}
              onReadyInstance={(instance) => {
                previewInstanceRef.current = instance
              }}
            />

            {mode === 'smart' ? (
              <>
                <Text style={styles.previewPageTitle} numberOfLines={2}>
                  {state.title.trim() || 'Sans titre'}
                </Text>
                <View style={styles.previewBadges}>
                  <Badge label={VERTICAL_LABELS[state.vertical]} tone="accent" />
                  <Badge
                    label={STATUS_LABELS[state.status]}
                    tone={state.status === 'published' ? 'success' : 'warning'}
                  />
                </View>
                <View style={styles.urlBox}>
                  <Text style={styles.urlLabel}>URL scannée</Text>
                  <Text style={styles.url} numberOfLines={2}>
                    /{state.slug || 'slug'}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.urlBox}>
                <Text style={styles.urlLabel}>Payload</Text>
                <Text style={styles.url} numberOfLines={3}>
                  {encodedPayload || '—'}
                </Text>
              </View>
            )}
          </>
        ) : (
          <SmartPagePhonePreview
            state={state}
            liveUrl={page?.slug ? publicUrl : null}
            preferLive={Boolean(page?.status === 'published')}
          />
        )}

        {Platform.OS === 'web' && (mode === 'static' || previewTab === 'qr') ? (
          <View style={styles.exportBlock}>
            <Button
              label={exporting ? 'Export…' : 'PNG HD'}
              variant="primary"
              loading={exporting}
              disabled={!encodedPayload || exporting}
              icon={<Download size={16} color={colors.white} />}
              onPress={() => void handleExport('png')}
            />
            <View style={styles.exportRow}>
              <Pressable
                disabled={!encodedPayload || exporting}
                onPress={() => void handleExport('svg')}
                style={[styles.exportChip, (!encodedPayload || exporting) && styles.exportChipDisabled]}
              >
                <Text style={styles.exportChipText}>SVG</Text>
              </Pressable>
              <Pressable
                disabled={!encodedPayload || exporting}
                onPress={() => void handleExportPdf()}
                style={[styles.exportChip, (!encodedPayload || exporting) && styles.exportChipDisabled]}
              >
                <FileType size={14} color={colors.slate700} />
                <Text style={styles.exportChipText}>PDF</Text>
              </Pressable>
              <Pressable
                disabled={!encodedPayload || exporting || qrStyle.transparentBackground}
                onPress={() => void handleExport('jpeg')}
                style={[
                  styles.exportChip,
                  (!encodedPayload || exporting || qrStyle.transparentBackground) &&
                    styles.exportChipDisabled,
                ]}
              >
                <Text style={styles.exportChipText}>JPEG</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        <Button
          label={copied ? 'Copié !' : mode === 'static' ? 'Copier le payload' : 'Copier l’URL'}
          variant="ghost"
          onPress={async () => {
            await Clipboard.setStringAsync(encodedPayload || publicUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
        />
      </View>
    </View>
  )
}

function SmartIdentityStep({
  state,
  setField,
  verticalMeta,
  ActiveIcon,
}: {
  state: FormState
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  verticalMeta: (typeof VERTICAL_OPTIONS)[number]
  ActiveIcon: LucideIcon
}) {
  return (
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
        <Pressable style={styles.shuffle} onPress={() => setField('slug', generateRandomSlug(4))}>
          <Shuffle size={18} color={colors.slate600} />
        </Pressable>
      </View>

      <View style={styles.universHeader}>
        <Text style={styles.sectionTitle}>Modèle Smart Page</Text>
        <Text style={styles.universHint}>
          Définit la structure et les fonctionnalités de la page scannée.
        </Text>
      </View>

      <View style={styles.selectedModel}>
        <View style={styles.selectedModelIcon}>
          <ActiveIcon size={22} color={colors.signal} />
        </View>
        <View style={{ flex: 1, gap: 6 }}>
          <View style={styles.selectedModelBadges}>
            <Text style={styles.selectedModelTitle}>{verticalMeta.label}</Text>
            <View style={styles.modelChip}>
              <Text style={styles.modelChipText}>{verticalMeta.model}</Text>
            </View>
            <View style={[styles.modelChip, styles.modelChipCategory]}>
              <Text style={[styles.modelChipText, { color: colors.success }]}>
                {verticalMeta.category}
              </Text>
            </View>
          </View>
          <Text style={styles.selectedModelDesc}>{verticalMeta.description}</Text>
          <View style={styles.fieldChips}>
            <Text style={styles.fieldChipsLabel}>Champs inclus</Text>
            {verticalMeta.fields.map((f) => (
              <View key={f} style={styles.fieldChip}>
                <Text style={styles.fieldChipText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.verticalGrid}>
        {VERTICAL_OPTIONS.map((option) => {
          const active = state.vertical === option.value
          const Icon = VERTICAL_ICONS[option.value] ?? LayoutGrid
          return (
            <Pressable
              key={option.value}
              onPress={() => setField('vertical', option.value)}
              style={[styles.verticalCard, active && styles.verticalCardActive]}
            >
              <View style={styles.verticalCardTop}>
                <View style={[styles.verticalIconWrap, active && styles.verticalIconWrapActive]}>
                  <Icon size={18} color={active ? colors.signal : colors.slate700} />
                </View>
                {active ? (
                  <View style={styles.selectedPill}>
                    <Check size={11} color={colors.ink} strokeWidth={3} />
                    <Text style={styles.selectedPillText}>OK</Text>
                  </View>
                ) : (
                  <Text style={styles.verticalModel}>{option.model}</Text>
                )}
              </View>
              <Text style={styles.verticalLabel}>{option.label}</Text>
              <Text style={styles.verticalDesc} numberOfLines={2}>
                {option.description}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

function PublishStep({
  state,
  setField,
}: {
  state: FormState
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Statut</Text>
      <View style={styles.statusRow}>
        {(['draft', 'published'] as const).map((status) => (
          <Pressable
            key={status}
            onPress={() => setField('status', status)}
            style={[styles.statusChip, state.status === status && styles.statusChipActive]}
          >
            <Text
              style={[styles.statusChipText, state.status === status && { color: colors.white }]}
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
      <Text style={styles.universHint}>
        Contenu fixe = mode none. Ou programmez des créneaux / A/B.
      </Text>
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
        <Switch value={state.abTestEnabled} onValueChange={(v) => setField('abTestEnabled', v)} />
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
  )
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xl },
  wrapWide: { flexDirection: 'row', alignItems: 'flex-start' },
  main: { flex: 1, gap: spacing.lg },
  modeRow: { flexDirection: 'row', gap: 8 },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    paddingVertical: 12,
  },
  modeBtnActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  modeBtnText: { fontSize: 14, fontWeight: '700', color: colors.slate700 },
  modeBtnTextActive: { color: colors.white },
  modeHint: { fontSize: 12, color: colors.slate500, lineHeight: 17, marginTop: -4 },
  guestModeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
  },
  guestModeTitle: { fontSize: 14, fontWeight: '700', color: colors.ink },
  guestModeHint: { fontSize: 12, color: colors.slate500, lineHeight: 16 },
  smartUpsell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(18, 196, 168, 0.35)',
    backgroundColor: 'rgba(18, 196, 168, 0.08)',
  },
  smartUpsellIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.signal,
  },
  smartUpsellTitle: { fontSize: 13, fontWeight: '700', color: colors.ink },
  smartUpsellText: { fontSize: 12, color: colors.slate600, lineHeight: 16 },
  smartUpsellCta: {
    borderRadius: 10,
    backgroundColor: colors.ink,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  smartUpsellCtaText: { fontSize: 12, fontWeight: '700', color: colors.white },
  guestHint: {
    fontSize: 12,
    color: colors.signal,
    lineHeight: 17,
    backgroundColor: colors.slate100,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 0,
    paddingVertical: 4,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  stepIndex: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.slate200,
  },
  stepIndexActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  stepIndexDone: {
    backgroundColor: colors.signal,
    borderColor: colors.signal,
  },
  stepIndexText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.slate500,
  },
  stepIndexTextActive: {
    color: colors.white,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate500,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.ink,
    fontWeight: '800',
  },
  stepLabelDone: {
    color: colors.slate700,
  },
  stepConnector: {
    flex: 0.55,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.slate200,
    marginBottom: 22,
    marginHorizontal: 2,
  },
  stepConnectorDone: {
    backgroundColor: colors.signal,
  },
  formBody: { gap: spacing.lg, paddingBottom: 40 },
  section: { gap: spacing.md },
  sectionTitle: { marginTop: 8, fontSize: 16, fontWeight: '700', color: colors.ink },
  universHeader: { gap: 4, marginTop: 4 },
  universHint: { fontSize: 12, color: colors.slate500, lineHeight: 17 },
  selectedModel: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
  },
  selectedModelIcon: {
    height: 48,
    width: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  selectedModelBadges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  selectedModelTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  modelChip: {
    borderRadius: 999,
    backgroundColor: colors.slate100,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  modelChipCategory: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  modelChipText: { fontSize: 11, fontWeight: '600', color: colors.slate700 },
  selectedModelDesc: { fontSize: 12, color: colors.slate600, lineHeight: 17 },
  fieldChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.slate200,
  },
  fieldChipsLabel: { fontSize: 11, fontWeight: '600', color: colors.slate400, marginRight: 2 },
  fieldChip: {
    borderRadius: 6,
    backgroundColor: colors.slate100,
    borderWidth: 1,
    borderColor: colors.slate200,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  fieldChipText: { fontSize: 11, fontWeight: '500', color: colors.slate700 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'flex-end' },
  shuffle: {
    height: 44,
    width: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  verticalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  verticalCard: {
    width: '47%',
    minWidth: 150,
    flexGrow: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    padding: 14,
    gap: 6,
  },
  verticalCardActive: {
    backgroundColor: colors.white,
    borderColor: colors.signal,
    borderWidth: 2,
  },
  verticalCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  verticalIconWrap: {
    height: 36,
    width: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate100,
  },
  verticalIconWrapActive: { backgroundColor: 'rgba(18, 196, 168, 0.2)' },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 999,
    backgroundColor: colors.signal,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  selectedPillText: { fontSize: 10, fontWeight: '800', color: colors.ink },
  verticalModel: { fontSize: 10, fontWeight: '600', color: colors.slate400 },
  verticalLabel: { fontWeight: '700', color: colors.ink, fontSize: 13, lineHeight: 17 },
  verticalDesc: { fontSize: 11, color: colors.slate500, lineHeight: 15 },
  statusRow: { flexDirection: 'row', gap: 8 },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  statusChipActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  statusChipText: { fontWeight: '600', color: colors.slate700 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchLabel: { fontWeight: '600', color: colors.slate700 },
  footerActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  error: { color: colors.danger, fontWeight: '600' },
  preview: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  previewHead: { alignSelf: 'stretch', gap: 2 },
  previewTitle: { fontSize: 16, fontWeight: '700', color: colors.ink },
  previewSubtitle: { fontSize: 12, color: colors.slate500 },
  previewTabs: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.slate100,
    gap: 4,
  },
  previewTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 9,
  },
  previewTabActive: {
    backgroundColor: colors.white,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  previewTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slate500,
  },
  previewTabTextActive: {
    color: colors.ink,
  },
  previewModelRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  previewModelIcon: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
  },
  previewModelLabel: { fontSize: 13, fontWeight: '700', color: colors.ink },
  previewModelMeta: { fontSize: 11, color: colors.slate500, marginTop: 2 },
  previewPageTitle: { fontSize: 15, fontWeight: '700', color: colors.ink, textAlign: 'center' },
  previewBadges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  urlBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  urlLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.slate400,
  },
  url: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'monospace',
    color: colors.slate800,
    textAlign: 'center',
  },
  exportBlock: { alignSelf: 'stretch', gap: 8 },
  exportRow: { flexDirection: 'row', gap: 8 },
  exportChip: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
  },
  exportChipDisabled: { opacity: 0.45 },
  exportChipText: { fontSize: 12, fontWeight: '700', color: colors.slate700 },
})
