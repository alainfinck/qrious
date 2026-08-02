import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {
  Frame,
  ImagePlus,
  Layers,
  Palette,
  Shapes,
  Sparkles,
  Trash2,
} from 'lucide-react-native'

import {
  CornerDotIcon,
  CornerSquareIcon,
  DotStyleIcon,
  FrameStyleIcon,
  ShapeButton,
} from './shape-icons'
import { Input } from './ui'
import {
  applyTemplate,
  BG_PRESETS,
  CORNER_DOT_OPTIONS,
  CORNER_SQUARE_OPTIONS,
  DOT_STYLE_OPTIONS,
  FG_PRESETS,
  STYLE_TEMPLATES,
  type QrCornerDotStyle,
  type QrCornerSquareStyle,
  type QrDotStyle,
  type QrFrameStyle,
  type QrShape,
  type QrStyle,
  type QrStyleTemplate,
} from '../lib/qr-style'
import { colors, spacing } from '../theme/colors'

const TABS = [
  { id: 'templates', label: 'Styles', icon: Sparkles },
  { id: 'frame', label: 'Cadre', icon: Frame },
  { id: 'shapes', label: 'Formes', icon: Shapes },
  { id: 'colors', label: 'Couleurs', icon: Palette },
  { id: 'logo', label: 'Logo', icon: Layers },
] as const

const FRAME_OPTIONS: { value: QrFrameStyle; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'bottom-text', label: 'Texte bas' },
  { value: 'top-text', label: 'Texte haut' },
  { value: 'balloon', label: 'Bulle' },
  { value: 'phone-mockup', label: 'Phone' },
  { value: 'badge', label: 'Badge' },
  { value: 'polaroid', label: 'Polaroid' },
  { value: 'simple-border', label: 'Bordure' },
  { value: 'circle-frame', label: 'Cercle' },
  { value: 'ticket', label: 'Ticket' },
  { value: 'ribbon', label: 'Ruban' },
  { value: 'arrow', label: 'Flèche' },
]

type Props = {
  value: QrStyle
  onChange: (next: QrStyle) => void
  activeTemplateId?: string | null
  onTemplateApply?: (template: QrStyleTemplate) => void
  onError?: (message: string | null) => void
}

export function QrStyleEditor({
  value,
  onChange,
  activeTemplateId,
  onTemplateApply,
  onError,
}: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('templates')

  const patch = (partial: Partial<QrStyle>) => onChange({ ...value, ...partial })

  async function pickLogo() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      base64: true,
    })
    if (result.canceled || !result.assets[0]) return
    const asset = result.assets[0]
    if ((asset.fileSize ?? 0) > 2_000_000) {
      onError?.('Logo trop lourd (max 2 Mo).')
      return
    }
    const mime = asset.mimeType || 'image/png'
    const dataUrl = `data:${mime};base64,${asset.base64}`
    onError?.(null)
    patch({ logoDataUrl: dataUrl, errorCorrectionLevel: 'H' })
  }

  return (
    <View style={styles.root}>
      <View style={styles.tabs}>
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <Pressable
              key={t.id}
              onPress={() => setTab(t.id)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Icon size={14} color={active ? colors.white : colors.slate600} />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{t.label}</Text>
            </Pressable>
          )
        })}
      </View>

      {tab === 'templates' ? (
        <View style={styles.grid}>
          {STYLE_TEMPLATES.map((tpl) => {
            const active = activeTemplateId === tpl.id
            return (
              <Pressable
                key={tpl.id}
                onPress={() => {
                  onChange(applyTemplate(tpl, value))
                  onTemplateApply?.(tpl)
                }}
                style={[styles.templateCard, active && styles.templateCardActive]}
              >
                <View style={styles.swatchRow}>
                  <View style={[styles.swatch, { backgroundColor: tpl.swatch[0] }]} />
                  <View style={[styles.swatch, { backgroundColor: tpl.swatch[1] }]} />
                </View>
                <Text style={[styles.templateName, active && { color: colors.white }]}>{tpl.name}</Text>
                <Text
                  style={[styles.templateDesc, active && { color: 'rgba(255,255,255,0.7)' }]}
                  numberOfLines={2}
                >
                  {tpl.description}
                </Text>
              </Pressable>
            )
          })}
        </View>
      ) : null}

      {tab === 'frame' ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cadres print</Text>
            <Text style={styles.sectionHint}>CTA intégré pour flyers, stickers et packaging.</Text>
          </View>
          <View style={styles.tileGrid}>
            {FRAME_OPTIONS.map((opt) => {
              const active = value.frameStyle === opt.value
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => patch({ frameStyle: opt.value })}
                  style={[styles.frameTile, active && styles.frameTileActive]}
                >
                  <FrameStyleIcon style={opt.value} selected={active} />
                  <Text style={[styles.frameTileLabel, active && styles.frameTileLabelActive]}>
                    {opt.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>
          {value.frameStyle !== 'none' ? (
            <>
              <Input
                label="Texte du cadre"
                value={value.frameText}
                onChangeText={(v) => patch({ frameText: v })}
              />
              <ColorRow
                label="Couleur cadre"
                value={value.frameColor}
                onChange={(v) => patch({ frameColor: v })}
                presets={FG_PRESETS}
              />
              <ColorRow
                label="Couleur texte"
                value={value.frameTextColor}
                onChange={(v) => patch({ frameTextColor: v })}
                presets={BG_PRESETS}
              />
            </>
          ) : null}
        </View>
      ) : null}

      {tab === 'shapes' ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Modules</Text>
            <Text style={styles.sectionHint}>Forme des points qui composent le QR.</Text>
          </View>
          <View style={styles.tileGrid}>
            {DOT_STYLE_OPTIONS.map((opt) => {
              const active = value.dotsType === opt.value
              return (
                <ShapeButton
                  key={opt.value}
                  label={opt.label}
                  selected={active}
                  onPress={() => patch({ dotsType: opt.value as QrDotStyle })}
                >
                  <DotStyleIcon type={opt.value} color={active ? colors.white : colors.slate900} />
                </ShapeButton>
              )
            })}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Forme globale</Text>
          </View>
          <View style={styles.shapeToggleRow}>
            {(
              [
                { value: 'square' as QrShape, label: 'Carrée' },
                { value: 'circle' as QrShape, label: 'Ronde' },
              ] as const
            ).map((opt) => {
              const active = value.shape === opt.value
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => patch({ shape: opt.value })}
                  style={[styles.shapeToggle, active && styles.shapeToggleActive]}
                >
                  <Text style={[styles.shapeToggleText, active && styles.shapeToggleTextActive]}>
                    {opt.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Yeux — contour</Text>
            <Text style={styles.sectionHint}>Cadre des trois motifs de repérage.</Text>
          </View>
          <View style={styles.tileGrid}>
            {CORNER_SQUARE_OPTIONS.map((opt) => {
              const active = value.cornersSquareType === opt.value
              return (
                <ShapeButton
                  key={opt.value}
                  label={opt.label}
                  selected={active}
                  onPress={() => patch({ cornersSquareType: opt.value as QrCornerSquareStyle })}
                >
                  <CornerSquareIcon
                    type={opt.value}
                    color={active ? colors.white : colors.slate900}
                  />
                </ShapeButton>
              )
            })}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Yeux — centre</Text>
            <Text style={styles.sectionHint}>Point central des motifs de repérage.</Text>
          </View>
          <View style={styles.tileGrid}>
            {CORNER_DOT_OPTIONS.map((opt) => {
              const active = value.cornersDotType === opt.value
              return (
                <ShapeButton
                  key={opt.value}
                  label={opt.label}
                  selected={active}
                  onPress={() => patch({ cornersDotType: opt.value as QrCornerDotStyle })}
                >
                  <CornerDotIcon type={opt.value} color={active ? colors.white : colors.slate900} />
                </ShapeButton>
              )
            })}
          </View>
        </View>
      ) : null}

      {tab === 'colors' ? (
        <View style={styles.section}>
          <ColorRow
            label="Modules"
            value={value.dotsColor}
            onChange={(v) => patch({ dotsColor: v, dotsGradient: null })}
            presets={FG_PRESETS}
          />
          <ColorRow
            label="Fond"
            value={value.backgroundColor}
            onChange={(v) => patch({ backgroundColor: v, backgroundGradient: null })}
            presets={BG_PRESETS}
          />
          <ColorRow
            label="Coins (auto si vide)"
            value={value.cornersSquareColor}
            onChange={(v) => patch({ cornersSquareColor: v })}
            presets={FG_PRESETS}
            allowEmpty
          />
          <View style={styles.rowBetween}>
            <Text style={styles.switchLabel}>Fond transparent</Text>
            <Switch
              value={value.transparentBackground}
              onValueChange={(v) => patch({ transparentBackground: v })}
            />
          </View>
        </View>
      ) : null}

      {tab === 'logo' ? (
        <View style={styles.section}>
          {value.logoDataUrl ? (
            <View style={styles.logoPreview}>
              <Image source={{ uri: value.logoDataUrl }} style={styles.logoImage} />
              <Pressable onPress={() => patch({ logoDataUrl: null })} style={styles.removeLogo}>
                <Trash2 size={16} color={colors.danger} />
                <Text style={styles.removeLogoText}>Retirer</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => void pickLogo()} style={styles.uploadBtn}>
              <ImagePlus size={18} color={colors.slate700} />
              <Text style={styles.uploadText}>Ajouter un logo</Text>
            </Pressable>
          )}
          <Text style={styles.hint}>Max 2 Mo · force la correction d’erreur H</Text>
        </View>
      ) : null}
    </View>
  )
}

function ColorRow({
  label,
  value,
  onChange,
  presets,
  allowEmpty,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  presets: string[]
  allowEmpty?: boolean
}) {
  return (
    <View style={styles.colorBlock}>
      <Text style={styles.groupLabel}>{label}</Text>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={allowEmpty ? 'Auto' : '#0b1220'}
        autoCapitalize="none"
      />
      <View style={styles.presetRow}>
        {allowEmpty ? (
          <Pressable
            onPress={() => onChange('')}
            style={[styles.preset, !value && styles.presetActive, styles.presetAuto]}
          >
            <Text style={styles.presetAutoText}>A</Text>
          </Pressable>
        ) : null}
        {presets.map((c) => (
          <Pressable
            key={c}
            onPress={() => onChange(c)}
            style={[styles.preset, { backgroundColor: c }, value === c && styles.presetActive]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: spacing.md },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 4 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  tabActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  tabLabel: { fontSize: 12, fontWeight: '700', color: colors.slate600 },
  tabLabelActive: { color: colors.white },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  templateCard: {
    width: '47%',
    minWidth: 140,
    flexGrow: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    padding: 12,
    gap: 6,
  },
  templateCardActive: { backgroundColor: colors.slate900, borderColor: colors.slate900 },
  swatchRow: { flexDirection: 'row', gap: 6 },
  swatch: { width: 22, height: 22, borderRadius: 7, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' },
  templateName: { fontWeight: '700', fontSize: 13, color: colors.ink },
  templateDesc: { fontSize: 11, color: colors.slate500, lineHeight: 15 },
  section: { gap: spacing.md },
  sectionHeader: { gap: 2 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: colors.ink },
  sectionHint: { fontSize: 11, color: colors.slate500 },
  groupLabel: { fontSize: 12, fontWeight: '700', color: colors.slate700 },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frameTile: {
    width: '30%',
    minWidth: 88,
    flexGrow: 1,
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  frameTileActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  frameTileLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.ink,
    textAlign: 'center',
  },
  frameTileLabelActive: {
    color: colors.white,
    fontWeight: '700',
  },
  shapeToggleRow: { flexDirection: 'row', gap: 8 },
  shapeToggle: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    paddingVertical: 12,
  },
  shapeToggleActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  shapeToggleText: { fontSize: 13, fontWeight: '600', color: colors.slate600 },
  shapeToggleTextActive: { color: colors.white, fontWeight: '700' },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: { fontWeight: '600', color: colors.slate700 },
  colorBlock: { gap: 8 },
  presetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  preset: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  presetActive: { borderWidth: 2, borderColor: colors.signal },
  presetAuto: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.slate100 },
  presetAutoText: { fontSize: 11, fontWeight: '800', color: colors.slate600 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderStyle: 'dashed',
    paddingVertical: 16,
    backgroundColor: colors.slate50,
  },
  uploadText: { fontWeight: '700', color: colors.slate700 },
  logoPreview: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoImage: { width: 56, height: 56, borderRadius: 10 },
  removeLogo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  removeLogoText: { color: colors.danger, fontWeight: '600' },
  hint: { fontSize: 11, color: colors.slate400 },
})
