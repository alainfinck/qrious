'use client'

import { useRef, type ReactNode } from 'react'
import {
  Frame,
  ImagePlus,
  Layers,
  Palette,
  Shapes,
  Sparkles,
  Trash2,
  Check,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  applyTemplate,
  BG_PRESETS,
  CORNER_DOT_OPTIONS,
  CORNER_SQUARE_OPTIONS,
  DOT_STYLE_OPTIONS,
  FG_PRESETS,
  SIZE_OPTIONS,
  STYLE_TEMPLATES,
  type QrCornerDotStyle,
  type QrCornerSquareStyle,
  type QrDotStyle,
  type QrErrorLevel,
  type QrFrameStyle,
  type QrGradient,
  type QrShape,
  type QrStyle,
  type QrStyleTemplate,
} from '@/lib/qr/style'
import { cn } from '@/lib/utils'

import {
  CornerDotIcon,
  CornerSquareIcon,
  DotStyleIcon,
  FrameStyleIcon,
  ShapeButton,
} from './shape-icons'

type Props = {
  value: QrStyle
  onChange: (next: QrStyle) => void
  showExportSize?: boolean
  className?: string
  onError?: (message: string | null) => void
  /** Highlight which template is active (by id), if any */
  activeTemplateId?: string | null
  onTemplateApply?: (template: QrStyleTemplate) => void
}

function Field({
  label,
  children,
  htmlFor,
  hint,
}: {
  label: string
  children: ReactNode
  htmlFor?: string
  hint?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-mq-ink">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-mq-muted">{hint}</p> : null}
    </div>
  )
}

function ColorField({
  label,
  value,
  onChange,
  presets,
  allowEmpty,
  emptyLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  presets: string[]
  allowEmpty?: boolean
  emptyLabel?: string
}) {
  const effective = value || '#0b1220'
  const isInherited = allowEmpty && !value

  return (
    <Field label={label} hint={isInherited ? emptyLabel : undefined}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={effective}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border border-mq-ink/10 bg-white p-1"
          aria-label={label}
        />
        <Input
          value={isInherited ? '' : value}
          placeholder={allowEmpty ? 'Auto' : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm uppercase"
        />
        {allowEmpty && value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange('')}>
            Auto
          </Button>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {presets.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={cn(
              'h-7 w-7 rounded-full border border-mq-ink/10 transition',
              value === c && 'ring-2 ring-mq-signal ring-offset-2',
            )}
            style={{ backgroundColor: c }}
            aria-label={`Couleur ${c}`}
          />
        ))}
      </div>
    </Field>
  )
}

function GradientEditor({
  label,
  value,
  onChange,
  onClear,
}: {
  label: string
  value: QrGradient | null
  onChange: (g: QrGradient) => void
  onClear: () => void
}) {
  const g = value ?? {
    type: 'linear' as const,
    rotation: 135,
    color1: '#0b1220',
    color2: '#12c4a8',
  }
  const enabled = Boolean(value)

  return (
    <div className="space-y-3 rounded-xl border border-mq-ink/10 bg-mq-mist/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-mq-ink">{label}</p>
          <p className="text-xs text-mq-muted">Linéaire ou radial, deux couleurs.</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-mq-ink">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => {
              if (e.target.checked) onChange(g)
              else onClear()
            }}
            className="h-4 w-4 rounded border-mq-ink/20 accent-mq-signal-deep"
          />
          Activer
        </label>
      </div>

      {enabled ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Type">
            <div className="flex gap-2">
              {(['linear', 'radial'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange({ ...g, type: t })}
                  className={cn(
                    'flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition',
                    g.type === t
                      ? 'border-mq-ink bg-mq-ink font-semibold text-white'
                      : 'border-mq-ink/10 bg-white text-mq-muted hover:border-mq-ink/20',
                  )}
                >
                  {t === 'linear' ? 'Linéaire' : 'Radial'}
                </button>
              ))}
            </div>
          </Field>
          {g.type === 'linear' ? (
            <Field label={`Angle (${g.rotation}°)`}>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={g.rotation}
                onChange={(e) => onChange({ ...g, rotation: Number(e.target.value) })}
                className="w-full accent-mq-signal-deep"
              />
            </Field>
          ) : (
            <div />
          )}
          <ColorField
            label="Couleur 1"
            value={g.color1}
            onChange={(color1) => onChange({ ...g, color1 })}
            presets={FG_PRESETS}
          />
          <ColorField
            label="Couleur 2"
            value={g.color2}
            onChange={(color2) => onChange({ ...g, color2 })}
            presets={FG_PRESETS}
          />
          <div
            className="sm:col-span-2 h-8 rounded-lg border border-mq-ink/10"
            style={{
              background:
                g.type === 'radial'
                  ? `radial-gradient(circle, ${g.color1}, ${g.color2})`
                  : `linear-gradient(${g.rotation}deg, ${g.color1}, ${g.color2})`,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

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

/**
 * Reusable QR appearance editor — templates, frames, shapes, colors, logo.
 */
export function QrStyleForm({
  value,
  onChange,
  showExportSize = true,
  className,
  onError,
  activeTemplateId,
  onTemplateApply,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const patch = (partial: Partial<QrStyle>) => onChange({ ...value, ...partial })

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onError?.('Le logo doit être une image (PNG, JPG, SVG…).')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      onError?.('Le logo ne doit pas dépasser 2 Mo.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      patch({
        logoDataUrl: String(reader.result),
        errorCorrectionLevel: 'H',
      })
      onError?.(null)
    }
    reader.readAsDataURL(file)
  }

  const applyTpl = (tpl: QrStyleTemplate) => {
    const next = applyTemplate(tpl, value)
    onChange(next)
    onTemplateApply?.(tpl)
  }

  return (
    <Tabs defaultValue="templates" className={cn('w-full space-y-5', className)}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="templates" className="flex-col gap-0.5 px-1 sm:flex-row sm:gap-1.5">
          <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-80" />
          Styles
        </TabsTrigger>
        <TabsTrigger value="frame" className="flex-col gap-0.5 px-1 sm:flex-row sm:gap-1.5">
          <Frame className="h-3.5 w-3.5 shrink-0 opacity-80" />
          Cadre
        </TabsTrigger>
        <TabsTrigger value="shapes" className="flex-col gap-0.5 px-1 sm:flex-row sm:gap-1.5">
          <Shapes className="h-3.5 w-3.5 shrink-0 opacity-80" />
          Formes
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex-col gap-0.5 px-1 sm:flex-row sm:gap-1.5">
          <Palette className="h-3.5 w-3.5 shrink-0 opacity-80" />
          Couleurs
        </TabsTrigger>
        <TabsTrigger value="logo" className="flex-col gap-0.5 px-1 sm:flex-row sm:gap-1.5">
          <Layers className="h-3.5 w-3.5 shrink-0 opacity-80" />
          Logo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="templates" className="mt-4 space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-mq-ink">Kits de design</h3>
          <p className="text-xs text-mq-muted">
            Choisissez une pastille — affinez ensuite dans les autres onglets.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-5 sm:justify-start sm:gap-x-5">
          {STYLE_TEMPLATES.map((tpl) => {
            const selected = activeTemplateId === tpl.id
            const [c1, c2] = tpl.swatch
            const isGradient = Boolean(tpl.style.dotsGradient)
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => applyTpl(tpl)}
                title={tpl.description}
                aria-pressed={selected}
                className="group flex w-[4.5rem] flex-col items-center gap-2 text-center sm:w-20"
              >
                <span className="relative inline-flex">
                  <span
                    className={cn(
                      'relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 sm:h-16 sm:w-16',
                      selected
                        ? 'scale-105 ring-[3px] ring-mq-ink ring-offset-2 ring-offset-white'
                        : 'ring-1 ring-mq-ink/10 hover:scale-105 hover:ring-mq-signal/50',
                    )}
                    style={{
                      background: isGradient
                        ? `linear-gradient(135deg, ${c1}, ${c2})`
                        : c2,
                      boxShadow: selected
                        ? '0 12px 28px -14px rgba(11,18,32,0.55)'
                        : '0 8px 20px -16px rgba(11,18,32,0.35)',
                    }}
                  >
                    {/* Mini QR-ish center disc */}
                    <span
                      className="absolute inset-[22%] rounded-full shadow-inner"
                      style={{
                        background: isGradient
                          ? `linear-gradient(135deg, ${c1}, ${c2})`
                          : `linear-gradient(145deg, ${c1} 55%, ${c2} 55%)`,
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                      }}
                    />
                    <span
                      className="relative z-[1] h-[38%] w-[38%] rounded-[4px]"
                      style={{
                        backgroundColor: isGradient ? '#ffffff' : c1,
                        opacity: isGradient ? 0.95 : 1,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                      }}
                    />
                    {selected ? (
                      <span className="absolute -bottom-0.5 -right-0.5 z-[2] flex h-5 w-5 items-center justify-center rounded-full bg-mq-signal text-mq-ink shadow-sm ring-2 ring-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    ) : null}
                  </span>
                </span>
                <span
                  className={cn(
                    'text-[11px] font-semibold leading-tight transition-colors sm:text-xs',
                    selected ? 'text-mq-ink' : 'text-mq-muted group-hover:text-mq-ink',
                  )}
                >
                  {tpl.name}
                </span>
              </button>
            )
          })}
        </div>

        {activeTemplateId ? (
          <p className="rounded-xl border border-mq-ink/8 bg-mq-mist/50 px-3.5 py-2.5 text-xs text-mq-muted">
            <span className="font-semibold text-mq-ink">
              {STYLE_TEMPLATES.find((t) => t.id === activeTemplateId)?.name}
            </span>
            {' — '}
            {STYLE_TEMPLATES.find((t) => t.id === activeTemplateId)?.description}
          </p>
        ) : null}
      </TabsContent>

      <TabsContent value="frame" className="mt-4 space-y-6">
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-mq-ink">Cadres print</h3>
            <p className="text-xs text-mq-muted">CTA intégré pour flyers, stickers et packaging.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {FRAME_OPTIONS.map((opt) => {
              const selected = value.frameStyle === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => patch({ frameStyle: opt.value })}
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 rounded-xl border p-2.5 text-center transition-all',
                    selected
                      ? 'border-mq-ink bg-mq-ink text-white shadow-sm'
                      : 'border-mq-ink/10 bg-white text-mq-ink hover:border-mq-signal/40 hover:bg-mq-mist/40',
                  )}
                >
                  <FrameStyleIcon style={opt.value} selected={selected} />
                  <span className={cn('text-[11px] leading-tight', selected ? 'font-bold' : 'font-medium')}>
                    {opt.label}
                  </span>
                </button>
              )
            })}
          </div>

          {value.frameStyle !== 'none' ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Texte d’appel à l’action">
                  <Input
                    value={value.frameText}
                    onChange={(e) => patch({ frameText: e.target.value })}
                    placeholder="SCAN ME"
                    maxLength={20}
                  />
                </Field>
              </div>
              <ColorField
                label="Couleur du cadre"
                value={value.frameColor}
                onChange={(c) => patch({ frameColor: c })}
                presets={FG_PRESETS}
              />
              <ColorField
                label="Couleur du texte"
                value={value.frameTextColor}
                onChange={(c) => patch({ frameTextColor: c })}
                presets={['#ffffff', '#0b1220', '#f3faf7', '#12c4a8']}
              />
            </div>
          ) : null}
        </section>
      </TabsContent>

      <TabsContent value="shapes" className="mt-4 space-y-8">
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-mq-ink">Modules</h3>
            <p className="text-xs text-mq-muted">Forme des points qui composent le QR.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {DOT_STYLE_OPTIONS.map((opt) => (
              <ShapeButton
                key={opt.value}
                label={opt.label}
                selected={value.dotsType === opt.value}
                onClick={() => patch({ dotsType: opt.value as QrDotStyle })}
              >
                <DotStyleIcon type={opt.value} />
              </ShapeButton>
            ))}
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          <Field label="Forme globale">
            <div className="flex gap-2">
              {(
                [
                  { value: 'square' as QrShape, label: 'Carrée' },
                  { value: 'circle' as QrShape, label: 'Ronde' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => patch({ shape: opt.value })}
                  className={cn(
                    'flex-1 rounded-xl border px-3 py-2.5 text-sm transition-all',
                    value.shape === opt.value
                      ? 'border-mq-ink bg-mq-ink font-bold text-white'
                      : 'border-mq-ink/10 bg-white text-mq-muted hover:border-mq-ink/20',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-mq-ink">Yeux — contour</h3>
            <p className="text-xs text-mq-muted">Cadre des trois motifs de repérage.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {CORNER_SQUARE_OPTIONS.map((opt) => (
              <ShapeButton
                key={opt.value}
                label={opt.label}
                selected={value.cornersSquareType === opt.value}
                onClick={() => patch({ cornersSquareType: opt.value as QrCornerSquareStyle })}
              >
                <CornerSquareIcon type={opt.value} />
              </ShapeButton>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-mq-ink">Yeux — centre</h3>
            <p className="text-xs text-mq-muted">Point central des motifs de repérage.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {CORNER_DOT_OPTIONS.map((opt) => (
              <ShapeButton
                key={opt.value}
                label={opt.label}
                selected={value.cornersDotType === opt.value}
                onClick={() => patch({ cornersDotType: opt.value as QrCornerDotStyle })}
              >
                <CornerDotIcon type={opt.value} />
              </ShapeButton>
            ))}
          </div>
        </section>
      </TabsContent>

      <TabsContent value="colors" className="mt-4 space-y-6">
        <section className="grid gap-5 sm:grid-cols-2">
          <ColorField
            label="Couleur des modules"
            value={value.dotsColor}
            onChange={(dotsColor) => patch({ dotsColor, dotsGradient: null })}
            presets={FG_PRESETS}
          />
          <ColorField
            label="Couleur de fond"
            value={value.backgroundColor}
            onChange={(backgroundColor) =>
              patch({
                backgroundColor,
                backgroundGradient: null,
                transparentBackground: false,
              })
            }
            presets={BG_PRESETS}
          />
        </section>

        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-mq-ink">
          <input
            type="checkbox"
            checked={value.transparentBackground}
            onChange={(e) =>
              patch({
                transparentBackground: e.target.checked,
                backgroundGradient: e.target.checked ? null : value.backgroundGradient,
              })
            }
            className="h-4 w-4 rounded border-mq-ink/20 accent-mq-signal-deep"
          />
          Fond transparent (PNG / SVG)
        </label>

        <GradientEditor
          label="Dégradé des modules"
          value={value.dotsGradient}
          onChange={(dotsGradient) => patch({ dotsGradient })}
          onClear={() => patch({ dotsGradient: null })}
        />

        <GradientEditor
          label="Dégradé de fond"
          value={value.transparentBackground ? null : value.backgroundGradient}
          onChange={(backgroundGradient) =>
            patch({ backgroundGradient, transparentBackground: false })
          }
          onClear={() => patch({ backgroundGradient: null })}
        />

        <section className="grid gap-5 sm:grid-cols-2">
          <ColorField
            label="Couleur contour des yeux"
            value={value.cornersSquareColor}
            onChange={(cornersSquareColor) => patch({ cornersSquareColor })}
            presets={FG_PRESETS}
            allowEmpty
            emptyLabel="Identique aux modules."
          />
          <ColorField
            label="Couleur centre des yeux"
            value={value.cornersDotColor}
            onChange={(cornersDotColor) => patch({ cornersDotColor })}
            presets={FG_PRESETS}
            allowEmpty
            emptyLabel="Identique aux modules."
          />
        </section>
      </TabsContent>

      <TabsContent value="logo" className="mt-4 space-y-8">
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-mq-ink">Logo central</h3>
            <p className="text-xs text-mq-muted">PNG / JPG / SVG, max 2 Mo. Correction forcée en H.</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoUpload(e.target.files?.[0])}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-mq-ink/15"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {value.logoDataUrl ? 'Changer le logo' : 'Ajouter un logo'}
            </Button>
            {value.logoDataUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value.logoDataUrl}
                  alt="Logo"
                  className="h-10 w-10 rounded-lg border border-mq-ink/10 object-contain"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    patch({ logoDataUrl: null })
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Retirer
                </Button>
              </>
            ) : null}
          </div>

          {value.logoDataUrl ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`Taille (${Math.round(value.logoSize * 100)}%)`}>
                <input
                  type="range"
                  min={0.15}
                  max={0.4}
                  step={0.01}
                  value={value.logoSize}
                  onChange={(e) => patch({ logoSize: Number(e.target.value) })}
                  className="w-full accent-mq-signal-deep"
                />
              </Field>
              <Field label={`Marge (${value.logoMargin}px)`}>
                <input
                  type="range"
                  min={0}
                  max={16}
                  step={1}
                  value={value.logoMargin}
                  onChange={(e) => patch({ logoMargin: Number(e.target.value) })}
                  className="w-full accent-mq-signal-deep"
                />
              </Field>
              <div className="sm:col-span-2">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-mq-ink">
                  <input
                    type="checkbox"
                    checked={value.hideBackgroundDots}
                    onChange={(e) => patch({ hideBackgroundDots: e.target.checked })}
                    className="h-4 w-4 rounded border-mq-ink/20 accent-mq-signal-deep"
                  />
                  Masquer les modules derrière le logo
                </label>
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Niveau de correction"
            hint={value.logoDataUrl ? 'Forcé sur H tant qu’un logo est présent.' : undefined}
          >
            <Select
              value={value.logoDataUrl ? 'H' : value.errorCorrectionLevel}
              onValueChange={(v) => patch({ errorCorrectionLevel: v as QrErrorLevel })}
              disabled={Boolean(value.logoDataUrl)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">L — ~7%</SelectItem>
                <SelectItem value="M">M — ~15% (recommandé)</SelectItem>
                <SelectItem value="Q">Q — ~25%</SelectItem>
                <SelectItem value="H">H — ~30% (logo)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {showExportSize ? (
            <Field label="Taille d’export">
              <Select value={String(value.size)} onValueChange={(v) => patch({ size: Number(v) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SIZE_OPTIONS.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s} × {s} px
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : null}

          <Field label={`Quiet zone (${value.margin}px)`}>
            <input
              type="range"
              min={0}
              max={40}
              step={1}
              value={value.margin}
              onChange={(e) => patch({ margin: Number(e.target.value) })}
              className="w-full accent-mq-signal-deep"
            />
          </Field>
        </section>
      </TabsContent>
    </Tabs>
  )
}
