'use client'

import { useRef, type ReactNode } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'

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
import {
  BG_PRESETS,
  CORNER_DOT_OPTIONS,
  CORNER_SQUARE_OPTIONS,
  DOT_STYLE_OPTIONS,
  FG_PRESETS,
  SIZE_OPTIONS,
  type QrCornerDotStyle,
  type QrCornerSquareStyle,
  type QrDotStyle,
  type QrErrorLevel,
  type QrShape,
  type QrStyle,
} from '@/lib/qr/style'
import { cn } from '@/lib/utils'

import {
  CornerDotIcon,
  CornerSquareIcon,
  DotStyleIcon,
  ShapeButton,
} from './shape-icons'

type Props = {
  value: QrStyle
  onChange: (next: QrStyle) => void
  /** Hide size/export controls when parent handles them differently */
  showExportSize?: boolean
  className?: string
  onError?: (message: string | null) => void
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
      <Label htmlFor={htmlFor} className="text-slate-700">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
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
  const effective = value || '#0f172a'
  const isInherited = allowEmpty && !value

  return (
    <Field label={label} hint={isInherited ? emptyLabel : undefined}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={effective}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-md border border-slate-200 bg-white p-1"
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
              'h-7 w-7 rounded-full border border-slate-200',
              value === c && 'ring-2 ring-slate-900 ring-offset-2',
            )}
            style={{ backgroundColor: c }}
            aria-label={`Couleur ${c}`}
          />
        ))}
      </div>
    </Field>
  )
}

/**
 * Reusable QR appearance editor — modules, eyes, colors, logo.
 * Controlled via `value` / `onChange` so it can be embedded in admin forms.
 */
export function QrStyleForm({
  value,
  onChange,
  showExportSize = true,
  className,
  onError,
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

  return (
    <div className={cn('space-y-8', className)}>
      {/* Modules */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Modules (carrés)</h3>
          <p className="text-xs text-slate-500">Forme des points qui composent le QR.</p>
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
        <ColorField
          label="Couleur des modules"
          value={value.dotsColor}
          onChange={(dotsColor) => patch({ dotsColor })}
          presets={FG_PRESETS}
        />
      </section>

      {/* Eyes outer */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Yeux — contour</h3>
          <p className="text-xs text-slate-500">Cadre des trois motifs de repérage (coins).</p>
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
        <ColorField
          label="Couleur du contour"
          value={value.cornersSquareColor}
          onChange={(cornersSquareColor) => patch({ cornersSquareColor })}
          presets={FG_PRESETS}
          allowEmpty
          emptyLabel="Identique à la couleur des modules."
        />
      </section>

      {/* Eyes inner */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Yeux — centre</h3>
          <p className="text-xs text-slate-500">Point central des motifs de repérage.</p>
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
        <ColorField
          label="Couleur du centre"
          value={value.cornersDotColor}
          onChange={(cornersDotColor) => patch({ cornersDotColor })}
          presets={FG_PRESETS}
          allowEmpty
          emptyLabel="Identique à la couleur des modules."
        />
      </section>

      {/* Background + shape */}
      <section className="grid gap-5 sm:grid-cols-2">
        <ColorField
          label="Couleur de fond"
          value={value.backgroundColor}
          onChange={(backgroundColor) => patch({ backgroundColor })}
          presets={BG_PRESETS}
        />
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
                  'flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors',
                  value.shape === opt.value
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>
      </section>

      {/* Logo */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Logo</h3>
          <p className="text-xs text-slate-500">Image centrée (PNG/JPG/SVG, max 2 Mo).</p>
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
                className="h-10 w-10 rounded-lg border border-slate-200 object-contain"
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
            <Field label={`Taille du logo (${Math.round(value.logoSize * 100)}%)`}>
              <input
                type="range"
                min={0.15}
                max={0.4}
                step={0.01}
                value={value.logoSize}
                onChange={(e) => patch({ logoSize: Number(e.target.value) })}
                className="w-full accent-slate-900"
              />
            </Field>
            <Field label={`Marge logo (${value.logoMargin}px)`}>
              <input
                type="range"
                min={0}
                max={16}
                step={1}
                value={value.logoMargin}
                onChange={(e) => patch({ logoMargin: Number(e.target.value) })}
                className="w-full accent-slate-900"
              />
            </Field>
            <div className="sm:col-span-2">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={value.hideBackgroundDots}
                  onChange={(e) => patch({ hideBackgroundDots: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                />
                Masquer les modules derrière le logo
              </label>
            </div>
          </div>
        ) : null}
      </section>

      {/* Advanced */}
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
              <SelectItem value="L">L — ~7% (faible)</SelectItem>
              <SelectItem value="M">M — ~15% (recommandé)</SelectItem>
              <SelectItem value="Q">Q — ~25%</SelectItem>
              <SelectItem value="H">H — ~30% (logo)</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        {showExportSize ? (
          <Field label="Taille d’export (px)">
            <Select
              value={String(value.size)}
              onValueChange={(v) => patch({ size: Number(v) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {s} × {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ) : null}

        <Field label={`Marge / quiet zone (${value.margin}px)`}>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={value.margin}
            onChange={(e) => patch({ margin: Number(e.target.value) })}
            className="w-full accent-slate-900"
          />
        </Field>
      </section>
    </div>
  )
}
