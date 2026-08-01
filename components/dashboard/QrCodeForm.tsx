'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { slugify } from '@/lib/dashboard/utils'
import type { LandingPage, LandingPageVertical } from '@/types/landing-page'

interface QrCodeFormProps {
  page?: LandingPage
  action: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>
  submitLabel: string
}

export function QrCodeForm({ page, action, submitLabel }: QrCodeFormProps) {
  const [title, setTitle] = useState(page?.title ?? '')
  const [slug, setSlug] = useState(page?.slug ?? '')
  const [vertical, setVertical] = useState<LandingPageVertical>(page?.vertical ?? 'art')
  const [status, setStatus] = useState<'draft' | 'published'>(page?.status ?? 'draft')
  const [dpe, setDpe] = useState(page?.immoData?.dpe ?? '')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  const previewSlug = useMemo(() => slugify(slug || title || 'mon-qr-code'), [slug, title])

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    setSuccess(false)
    formData.set('vertical', vertical)
    formData.set('status', status)
    formData.set('slug', previewSlug)
    if (dpe) formData.set('dpe', dpe)

    const result = await action(formData)
    if (result && 'error' in result && result.error) {
      setError(result.error)
      setPending(false)
    } else if (result && 'success' in result && result.success) {
      setSuccess(true)
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>Nommez votre QR code et choisissez son univers métier.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!page) setSlug(slugify(e.target.value))
              }}
              placeholder="Ex. Carte galerie — Exposition 2026"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="mon-artwork-2026"
            />
            <p className="text-xs text-muted-foreground">/{previewSlug}</p>
          </div>

          <div className="space-y-2">
            <Label>Univers</Label>
            <Select value={vertical} onValueChange={(v) => setVertical(v as LandingPageVertical)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="immo">Immobilier / Gîte</SelectItem>
                <SelectItem value="vcard">Carte de visite</SelectItem>
                <SelectItem value="product">Manuel / Produit</SelectItem>
                <SelectItem value="feedback">Avis / Feedback</SelectItem>
                <SelectItem value="tourism">Tourisme / Patrimoine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Statut</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as 'draft' | 'published')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="primaryColor">Couleur de marque</Label>
            <Input
              id="primaryColor"
              name="primaryColor"
              defaultValue={page?.theme?.primaryColor || '#0f172a'}
              placeholder="#0f172a"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Contenu de la landing page</CardTitle>
          <CardDescription>Champs affichés après le scan du QR code.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={vertical}>
            <TabsList className="mb-4">
              <TabsTrigger value="art">Art</TabsTrigger>
              <TabsTrigger value="immo">Immo</TabsTrigger>
              <TabsTrigger value="vcard">vCard</TabsTrigger>
              <TabsTrigger value="product">Produit</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="tourism">Tourisme</TabsTrigger>
            </TabsList>

            <TabsContent value="art" className="space-y-6">
              {/* ── Artiste ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">🎨</span> L&apos;artiste
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="artistName" label="Nom de l'artiste" defaultValue={page?.artData?.artistName} placeholder="Claude Monet" className="sm:col-span-2" />
                  <Field id="artistNationality" label="Nationalité" defaultValue={page?.artData?.artistNationality} placeholder="Français" />
                  <Field id="artistBirthYear" label="Année de naissance" defaultValue={page?.artData?.artistBirthYear} placeholder="1985" />
                  <TextAreaField
                    id="artistBio"
                    label="Biographie"
                    defaultValue={page?.artData?.artistBio}
                    className="sm:col-span-2"
                    placeholder="Artiste plasticien formé aux Beaux-Arts de Paris, il développe depuis 2010 une pratique autour de la lumière et du mouvement…"
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Œuvre ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">🖼️</span> L&apos;œuvre
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="artYear" label="Année de création" defaultValue={page?.artData?.year} placeholder="2024" />
                  <Field id="medium" label="Médium / Technique" defaultValue={page?.artData?.medium} placeholder="Huile sur toile" />
                  <Field id="dimensions" label="Dimensions" defaultValue={page?.artData?.dimensions} placeholder="80 × 60 cm" />
                  <Field id="series" label="Série / Collection" defaultValue={page?.artData?.series} placeholder="Série Lumière bleue" />
                  <Field id="edition" label="Édition / Numérotation" defaultValue={page?.artData?.edition} placeholder="3/10" />
                  <Field id="certificate" label="Certificat d'authenticité" defaultValue={page?.artData?.certificate} placeholder="Certificat signé" />
                  <TextAreaField
                    id="artDescription"
                    label="Note de l'artiste / Description"
                    defaultValue={page?.artData?.description}
                    className="sm:col-span-2"
                    placeholder="Cette œuvre explore la tension entre le vide et la matière, jouant avec les effets de lumière rasante…"
                    rows={4}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Prix & marché ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">💶</span> Prix & disponibilité
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="artPrice" label="Prix" type="number" defaultValue={page?.artData?.price?.toString()} placeholder="1200" />
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <select
                      id="currency"
                      name="currency"
                      defaultValue={page?.artData?.currency ?? 'EUR'}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="EUR">€ EUR</option>
                      <option value="USD">$ USD</option>
                      <option value="GBP">£ GBP</option>
                      <option value="CHF">CHF</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="available" name="available" defaultChecked={page?.artData?.available ?? true} className="h-4 w-4 rounded border-slate-300" />
                    <Label htmlFor="available">Disponible à la vente</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="sold" name="sold" defaultChecked={page?.artData?.sold ?? false} className="h-4 w-4 rounded border-slate-300" />
                    <Label htmlFor="sold">Vendu</Label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Exposition ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">🏛️</span> Exposition / Galerie
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="exhibitionName" label="Nom de l'exposition" defaultValue={page?.artData?.exhibitionName} placeholder="Art Paris 2025" className="sm:col-span-2" />
                  <Field id="exhibitionLocation" label="Lieu / Galerie" defaultValue={page?.artData?.exhibitionLocation} placeholder="Galerie du Soleil, Paris" />
                  <Field id="exhibitionDates" label="Dates" defaultValue={page?.artData?.exhibitionDates} placeholder="15 jan. – 10 mars 2025" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Médias & liens ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">🔗</span> Médias & liens
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="videoUrl" label="URL vidéo (YouTube/Vimeo)" defaultValue={page?.artData?.videoUrl} placeholder="https://youtube.com/…" className="sm:col-span-2" />
                  <Field id="audioGuideUrl" label="Audio-guide (MP3/Soundcloud)" defaultValue={page?.artData?.audioGuideUrl} placeholder="https://soundcloud.com/…" className="sm:col-span-2" />
                  <Field id="instagramUsername" label="Instagram (handle)" defaultValue={page?.artData?.instagramUsername} placeholder="@nom_artiste" />
                  <Field id="websiteUrl" label="Site web de l'artiste" defaultValue={page?.artData?.websiteUrl} placeholder="https://artiste.fr" />
                  <Field id="shopUrl" label="Lien d'achat direct" defaultValue={page?.artData?.shopUrl} placeholder="https://shop.artiste.fr/oeuvre" className="sm:col-span-2" />
                  <Field id="contactEmail" label="Email contact acquisition" type="email" defaultValue={page?.artData?.contactEmail} placeholder="contact@galerie.fr" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="immo" className="space-y-6">
              {/* ── Infos du bien ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🏠</span> Informations du bien
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Type de bien</Label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      defaultValue={page?.immoData?.propertyType ?? ''}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Sélectionner…</option>
                      <option value="apartment">Appartement</option>
                      <option value="house">Maison</option>
                      <option value="gite">Gîte</option>
                      <option value="villa">Villa</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>
                  <Field id="city" label="Ville" defaultValue={page?.immoData?.city} />
                  <Field id="address" label="Adresse" defaultValue={page?.immoData?.address} className="sm:col-span-2" />
                  <Field id="price" label="Prix (€/nuit ou total)" type="number" defaultValue={page?.immoData?.price?.toString()} />
                  <Field id="surface" label="Surface (m²)" type="number" defaultValue={page?.immoData?.surface?.toString()} />
                  <Field id="rooms" label="Pièces" type="number" defaultValue={page?.immoData?.rooms?.toString()} />
                  <div className="space-y-2">
                    <Label htmlFor="dpe">DPE</Label>
                    <Select value={dpe || undefined} onValueChange={setDpe}>
                      <SelectTrigger id="dpe">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Field id="bookingUrl" label="URL réservation / contact" defaultValue={page?.immoData?.bookingUrl} className="sm:col-span-2" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Accueil ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🔑</span> Accueil des voyageurs
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextAreaField
                    id="welcomeMessage"
                    label="Message de bienvenue"
                    defaultValue={page?.immoData?.welcomeMessage}
                    className="sm:col-span-2"
                    placeholder="Bienvenue dans notre gîte ! Nous espérons que votre séjour…"
                    rows={3}
                  />
                  <Field id="checkInTime" label="Heure d'arrivée" defaultValue={page?.immoData?.checkInTime} placeholder="15h00" />
                  <Field id="checkOutTime" label="Heure de départ" defaultValue={page?.immoData?.checkOutTime} placeholder="11h00" />
                  <TextAreaField
                    id="checkInInstructions"
                    label="Instructions d'arrivée"
                    defaultValue={page?.immoData?.checkInInstructions}
                    className="sm:col-span-2"
                    placeholder="La clé se trouve dans la boîte à clé, code : 1234. Digicode du portail : 5678."
                    rows={4}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── WiFi ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📶</span> WiFi
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="wifiName" label="Nom du réseau (SSID)" defaultValue={page?.immoData?.wifiName} placeholder="MonReseau_WiFi" />
                  <Field id="wifiPassword" label="Mot de passe" defaultValue={page?.immoData?.wifiPassword} placeholder="motdepasse123" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Règles ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📋</span> Règles de la maison
                </h3>
                <TextAreaField
                  id="houseRules"
                  label="Règles (une par ligne)"
                  defaultValue={page?.immoData?.houseRules}
                  placeholder={"Pas de fumée à l'intérieur\nPas d'animaux\nSilence après 22h\nPoubelles le mardi"}
                  rows={5}
                />
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Équipements ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">✨</span> Équipements disponibles
                </h3>
                <TextAreaField
                  id="amenities"
                  label="Équipements (un par ligne)"
                  defaultValue={page?.immoData?.amenities?.map((a) => (typeof a === 'string' ? a : a.name)).join('\n')}
                  placeholder={"Piscine\nParking privé\nWiFi\nLave-vaisselle\nMachine à laver\nBarbecue\nVélos disponibles"}
                  rows={5}
                />
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Conseils locaux ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🗺️</span> Conseils locaux & activités
                </h3>
                <TextAreaField
                  id="localTips"
                  label="Suggestions"
                  defaultValue={page?.immoData?.localTips}
                  placeholder={"Restaurant La Terrasse (5 min à pied) — incontournable !\nRandonnée du lac (départ 200m, durée 2h)\nMarché le samedi matin"}
                  rows={5}
                />
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Contacts ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📞</span> Contacts
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="hostName" label="Nom de l'hôte" defaultValue={page?.immoData?.hostName} placeholder="Marie Dupont" />
                  <Field id="hostPhone" label="Téléphone hôte" defaultValue={page?.immoData?.hostPhone} placeholder="+33 6 00 00 00 00" />
                  <Field id="hostEmail" label="Email hôte" type="email" defaultValue={page?.immoData?.hostEmail} placeholder="marie@example.com" />
                  <Field id="emergencyPhone" label="Numéro d'urgence" defaultValue={page?.immoData?.emergencyPhone} placeholder="15 / 18 / 112" />
                </div>
              </div>
            </TabsContent>


            <TabsContent value="vcard" className="space-y-6">
              {/* ── Identité ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">👤</span> Identité
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="firstName" label="Prénom" defaultValue={page?.vcardData?.firstName} placeholder="Marie" />
                  <Field id="lastName" label="Nom de famille" defaultValue={page?.vcardData?.lastName} placeholder="Dupont" />
                  <Field id="fullName" label="Nom complet affiché" defaultValue={page?.vcardData?.fullName} placeholder="Marie Dupont" className="sm:col-span-2" />
                  <Field id="jobTitle" label="Fonction / Poste" defaultValue={page?.vcardData?.jobTitle} placeholder="Directrice Marketing" />
                  <Field id="company" label="Entreprise" defaultValue={page?.vcardData?.company} placeholder="Acme Corp" />
                  <TextAreaField
                    id="bio"
                    label="Bio / Présentation"
                    defaultValue={page?.vcardData?.bio}
                    className="sm:col-span-2"
                    placeholder="Passionnée par l'innovation, j'accompagne les entreprises dans leur transformation digitale…"
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Coordonnées ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">📱</span> Coordonnées
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="phone" label="Téléphone personnel" defaultValue={page?.vcardData?.phone} placeholder="+33 6 00 00 00 00" />
                  <Field id="phoneWork" label="Téléphone professionnel" defaultValue={page?.vcardData?.phoneWork} placeholder="+33 1 00 00 00 00" />
                  <Field id="email" label="Email personnel" type="email" defaultValue={page?.vcardData?.email} placeholder="marie@gmail.com" />
                  <Field id="emailWork" label="Email professionnel" type="email" defaultValue={page?.vcardData?.emailWork} placeholder="marie@acme.com" />
                  <Field id="website" label="Site web" defaultValue={page?.vcardData?.website} placeholder="https://marie-dupont.fr" className="sm:col-span-2" />
                  <Field id="vcardAddress" label="Adresse" defaultValue={page?.vcardData?.address} placeholder="12 rue de la Paix, 75001 Paris" className="sm:col-span-2" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Réseaux sociaux ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">🌐</span> Réseaux sociaux
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="linkedinUrl" label="LinkedIn" defaultValue={page?.vcardData?.linkedinUrl} placeholder="https://linkedin.com/in/marie-dupont" className="sm:col-span-2" />
                  <Field id="twitterUrl" label="Twitter / X" defaultValue={page?.vcardData?.twitterUrl} placeholder="https://x.com/mariedupont" />
                  <Field id="instagramUrl" label="Instagram" defaultValue={page?.vcardData?.instagramUrl} placeholder="https://instagram.com/marie" />
                  <Field id="githubUrl" label="GitHub" defaultValue={page?.vcardData?.githubUrl} placeholder="https://github.com/marie" />
                  <Field id="youtubeUrl" label="YouTube" defaultValue={page?.vcardData?.youtubeUrl} placeholder="https://youtube.com/@marie" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Prise de RDV & Branding ── */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-base">📅</span> Rendez-vous & apparence
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="calendlyUrl" label="Lien prise de RDV" defaultValue={page?.vcardData?.calendlyUrl} placeholder="https://calendly.com/marie" className="sm:col-span-2" />
                  <Field id="coverColor" label="Couleur de la carte (hex)" defaultValue={page?.vcardData?.coverColor} placeholder="#1e3a5f" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="product" className="space-y-6">
              {/* ── Infos Produit ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📦</span> Informations du Produit
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="productName" label="Nom du produit" defaultValue={page?.productData?.productName} placeholder="Ex: Casque Bluetooth ANC" />
                  <Field id="brandName" label="Marque" defaultValue={page?.productData?.brandName} placeholder="Ex: Sony" />
                  <Field id="modelNumber" label="Modèle / SKU" defaultValue={page?.productData?.modelNumber} placeholder="Ex: WH-1000XM4" className="sm:col-span-2" />
                  <TextAreaField
                    id="productDescription"
                    label="Description"
                    defaultValue={page?.productData?.description}
                    className="sm:col-span-2"
                    placeholder="Casque sans fil à réduction de bruit active haute performance..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Manuels & Support ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📖</span> Manuels & Support
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="manualUrl" label="URL du Manuel (PDF)" defaultValue={page?.productData?.manualUrl} placeholder="https://example.com/manual.pdf" className="sm:col-span-2" />
                  <Field id="videoTutorialUrl" label="URL Tutoriel Vidéo" defaultValue={page?.productData?.videoTutorialUrl} placeholder="https://youtube.com/watch?v=..." className="sm:col-span-2" />
                  <Field id="troubleshootingUrl" label="URL FAQ / Dépannage" defaultValue={page?.productData?.troubleshootingUrl} placeholder="https://example.com/support" className="sm:col-span-2" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Garantie ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🛡️</span> Garantie & Enregistrement
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="warrantyDuration" label="Durée de la garantie" defaultValue={page?.productData?.warrantyDuration} placeholder="Ex: 2 ans" />
                  <Field id="registrationUrl" label="URL d'enregistrement" defaultValue={page?.productData?.registrationUrl} placeholder="https://example.com/register" />
                  <TextAreaField
                    id="warrantyDetails"
                    label="Détails de la garantie"
                    defaultValue={page?.productData?.warrantyDetails}
                    className="sm:col-span-2"
                    placeholder="La garantie couvre les défauts de fabrication..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Contacts Support ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📞</span> Contact Support
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="supportEmail" label="E-mail support" type="email" defaultValue={page?.productData?.supportEmail} placeholder="support@brand.com" />
                  <Field id="supportPhone" label="Téléphone support" defaultValue={page?.productData?.supportPhone} placeholder="+33 1 00 00 00 00" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Démarrage rapide ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🚀</span> Étapes de démarrage rapide (Une étape par ligne sous le format `Titre : Explication`)
                </h3>
                <TextAreaField
                  id="quickStartSteps"
                  label="Étapes de démarrage rapide"
                  defaultValue={page?.productData?.quickStartSteps?.map(s => `${s.title} : ${s.description}`).join('\n')}
                  placeholder={"Étape 1 : Allumer le casque en maintenant le bouton power 3 secondes.\nÉtape 2 : Activer le Bluetooth sur votre téléphone et choisir le modèle.\nÉtape 3 : Lancer l'application pour calibrer la réduction de bruit."}
                  rows={6}
                />
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              {/* ── Infos Client ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🏢</span> Établissement & Messages
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="companyName" label="Nom de l'établissement / entreprise" defaultValue={page?.feedbackData?.companyName} placeholder="Ex: Restaurant Le Bistrot" className="sm:col-span-2" />
                  <Field id="feedbackHeading" label="Titre de la page" defaultValue={page?.feedbackData?.heading ?? 'Votre avis compte !'} placeholder="Votre avis compte !" className="sm:col-span-2" />
                  <TextAreaField
                    id="feedbackSubheading"
                    label="Sous-titre / Message d'accueil"
                    defaultValue={page?.feedbackData?.subheading ?? 'Aidez-nous à nous améliorer en partageant votre expérience.'}
                    className="sm:col-span-2"
                    placeholder="Aidez-nous à nous améliorer en partageant votre expérience."
                    rows={2}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Plateformes d'avis ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">⭐</span> Plateformes d'avis publiques
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="googleReviewUrl" label="Lien d'avis Google (direct)" defaultValue={page?.feedbackData?.googleReviewUrl} placeholder="https://search.google.com/local/writereview?..." className="sm:col-span-2" />
                  <Field id="tripadvisorUrl" label="Lien d'avis TripAdvisor" defaultValue={page?.feedbackData?.tripadvisorUrl} placeholder="https://tripadvisor.fr/..." className="sm:col-span-2" />
                  <Field id="trustpilotUrl" label="Lien d'avis Trustpilot" defaultValue={page?.feedbackData?.trustpilotUrl} placeholder="https://trustpilot.com/evaluate/..." className="sm:col-span-2" />
                  <Field id="customReviewUrl" label="Lien autre plateforme d'avis" defaultValue={page?.feedbackData?.customReviewUrl} placeholder="https://..." />
                  <Field id="customReviewLabel" label="Nom de la plateforme d'avis" defaultValue={page?.feedbackData?.customReviewLabel} placeholder="Ex: Facebook" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Formulaire privé ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📩</span> Feedback privé (notes basses)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="enableDirectForm" name="enableDirectForm" defaultChecked={page?.feedbackData?.enableDirectForm ?? true} className="h-4 w-4 rounded border-slate-300" />
                    <Label htmlFor="enableDirectForm">Activer le formulaire de contact privé pour les notes de 1 à 3 étoiles</Label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="directFormEmail" label="E-mail de destination des retours" defaultValue={page?.feedbackData?.directFormEmail} placeholder="contact@bistrot.com" />
                    <Field id="promptQuestion" label="Question posée dans le formulaire" defaultValue={page?.feedbackData?.promptQuestion ?? "Qu'aurions-nous pu mieux faire ?"} placeholder="Qu'aurions-nous pu mieux faire ?" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tourism" className="space-y-6">
              {/* ── Infos Lieu ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🏛️</span> Lieu & Description
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="placeName" label="Nom du lieu / monument" defaultValue={page?.tourismData?.placeName} placeholder="Ex: Cathédrale Notre-Dame" />
                  <Field id="locationName" label="Ville / Localisation" defaultValue={page?.tourismData?.locationName} placeholder="Ex: Paris" />
                  <Field id="historicPeriod" label="Époque / Siècle" defaultValue={page?.tourismData?.historicPeriod} placeholder="Ex: XIIe - XIVe siècle" className="sm:col-span-2" />
                  <TextAreaField
                    id="tourismDescription"
                    label="Histoire & Description"
                    defaultValue={page?.tourismData?.description}
                    className="sm:col-span-2"
                    placeholder="La construction de la cathédrale commence sous l'impulsion de l'évêque Maurice de Sully..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Médias & Liens ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🔗</span> Médias & Liens officiels
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="tourismAudioGuideUrl" label="Lien Audio-guide (MP3/Soundcloud)" defaultValue={page?.tourismData?.audioGuideUrl} placeholder="https://..." className="sm:col-span-2" />
                  <Field id="tourismVideoUrl" label="Lien Vidéo de présentation" defaultValue={page?.tourismData?.videoUrl} placeholder="https://youtube.com/..." className="sm:col-span-2" />
                  <Field id="tourismWebsiteUrl" label="Site web officiel" defaultValue={page?.tourismData?.websiteUrl} placeholder="https://..." />
                  <Field id="contactPhone" label="Téléphone de contact" defaultValue={page?.tourismData?.contactPhone} placeholder="+33 1 00 00 00 00" />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Coordonnées & Pratique ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">📍</span> Infos Pratiques & Géolocalisation
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="tourismAddress" label="Adresse complète" defaultValue={page?.tourismData?.address} placeholder="Ex: 6 Parvis Notre-Dame, 75004 Paris" className="sm:col-span-2" />
                  <Field id="latitude" label="Latitude" defaultValue={page?.tourismData?.latitude} placeholder="Ex: 48.8530" />
                  <Field id="longitude" label="Longitude" defaultValue={page?.tourismData?.longitude} placeholder="Ex: 2.3499" />
                  <Field id="entryFee" label="Tarifs d'entrée" defaultValue={page?.tourismData?.entryFee} placeholder="Ex: Gratuit pour la nef / 10€ pour les tours" className="sm:col-span-2" />
                  <TextAreaField
                    id="openingHours"
                    label="Horaires d'ouverture"
                    defaultValue={page?.tourismData?.openingHours}
                    className="sm:col-span-2"
                    placeholder="Tous les jours de 8h00 à 18h45"
                    rows={2}
                  />
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* ── Points d'intérêt ── */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-base">🔍</span> Points d'intérêt à observer (Un point par ligne sous le format `Nom : Description`)
                </h3>
                <TextAreaField
                  id="pointsOfInterest"
                  label="Points d'intérêt notables"
                  defaultValue={page?.tourismData?.pointsOfInterest?.map(poi => `${poi.name} : ${poi.description}`).join('\n')}
                  placeholder={"La Rosace Ouest : Vitrail exceptionnel datant du XIIIe siècle représentant la Vierge Marie.\nLes Chimères : Statues sculptées par Viollet-le-Duc ornant la galerie supérieure.\nLe Grand Orgue : Un des plus célèbres instruments du monde avec plus de 8 000 tuyaux."}
                  rows={6}
                />
              </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Modifications enregistrées avec succès.
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? 'Enregistrement…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  defaultValue,
  type = 'text',
  className,
  placeholder,
}: {
  id: string
  label: string
  defaultValue?: string | null
  type?: string
  className?: string
  placeholder?: string
}) {
  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} defaultValue={defaultValue ?? ''} placeholder={placeholder} />
    </div>
  )
}

function TextAreaField({
  id,
  label,
  defaultValue,
  className,
  placeholder,
  rows = 4,
}: {
  id: string
  label: string
  defaultValue?: string | null
  className?: string
  placeholder?: string
  rows?: number
}) {
  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
}
