import Link from 'next/link'
import { QrCode, BarChart3, Users, Eye, Star, Palette, Smartphone, Download, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { Badge } from '@/components/ui/badge'

export default function DemoPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        {/* Hero Demo Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-100 border-0">
                  Démo Interactive
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                  Découvrez Qrious.fr en action
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  Explorez notre plateforme et voyez comment transformer vos œuvres d'art en expériences interactives avec des QR codes personnalisés.
                </p>
                
                <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">2 min</div>
                    <div className="text-sm font-medium text-slate-500">Création d'un QR</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm font-medium text-slate-500">Personnalisable</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">24h</div>
                    <div className="text-sm font-medium text-slate-500">Support inclus</div>
                  </div>
                </div>
              </div>
              
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
                  <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex gap-6 text-sm font-medium">
                      <span className="text-slate-900">Dashboard</span>
                      <span className="text-slate-400">QR Codes</span>
                      <span className="text-slate-400">Analytics</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="font-bold text-slate-900">12</div>
                        <div className="text-xs text-slate-500">QR Codes</div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <div className="font-bold text-slate-900">854</div>
                        <div className="text-xs text-slate-500">Scans</div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="font-bold text-slate-900">357</div>
                        <div className="text-xs text-slate-500">Visiteurs</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center flex flex-col items-center justify-center aspect-square max-w-[240px] mx-auto shadow-sm">
                      <div className="h-32 w-32 border-4 border-slate-900 rounded-xl flex items-center justify-center mb-4 relative">
                        <QrCode className="h-20 w-20 text-slate-900" />
                        <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
                      </div>
                      <p className="font-medium text-slate-600">Scannez pour découvrir</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Dashboard */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 shadow-xl overflow-hidden">
              <div className="bg-white border-b border-slate-100 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Tableau de bord Qrious.fr</h3>
                  <p className="text-sm text-slate-500">Interface de démonstration</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Nouveau QR</Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white border-0">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🎨', label: 'QR Codes', value: '12' },
                    { icon: '👁️', label: 'Total Scans', value: '854' },
                    { icon: '👥', label: 'Visiteurs', value: '357' },
                    { icon: '⭐', label: 'Satisfaction', value: '98%' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl shrink-0">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="font-bold text-xl text-slate-900">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left Column: Form */}
                  <div className="md:col-span-2 space-y-6">
                    <h5 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                      Créer un nouveau QR Code
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Titre de l'œuvre</label>
                        <input type="text" disabled value="Nuit étoilée" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Artiste</label>
                        <input type="text" disabled value="Vincent Van Gogh" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <textarea disabled rows={3} value="Une peinture à l'huile sur toile réalisée en 1889, représentant la vue depuis la fenêtre de la chambre de l'artiste à l'asile de Saint-Rémy-de-Provence." className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed resize-none"></textarea>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Catégorie</label>
                        <input type="text" disabled value="Peinture" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Année</label>
                        <input type="text" disabled value="1889" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: QR Preview */}
                  <div className="space-y-6">
                    <h5 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                      QR Code généré
                    </h5>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 text-center shadow-sm">
                      <div className="h-40 w-40 border-4 border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                        <QrCode className="h-24 w-24 text-slate-900" />
                        <div className="absolute inset-0 border-4 border-white rounded-xl"></div>
                      </div>
                      <p className="text-sm font-medium text-slate-500">Scannez ce QR code pour voir la fiche d'œuvre</p>
                    </div>
                  </div>
                </div>

                {/* Recent QR Codes */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <h5 className="text-lg font-bold text-slate-900">QR Codes récents</h5>
                  <div className="grid gap-4">
                    {[
                      { title: 'Nuit étoilée', artist: 'Vincent Van Gogh', scans: 145, date: '15/05/2024', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=100' },
                      { title: 'La Joconde', artist: 'Leonardo Da Vinci', scans: 89, date: '10/05/2024', placeholder: '🎨' },
                      { title: 'Le Penseur', artist: 'Auguste Rodin', scans: 56, date: '05/05/2024', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988e3?q=80&w=100' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                              {item.placeholder}
                            </div>
                          )}
                          <div>
                            <h6 className="font-bold text-slate-900">{item.title}</h6>
                            <p className="text-sm text-slate-500">{item.artist}</p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
                          <div><strong className="text-slate-900">{item.scans}</strong> scans</div>
                          <div>{item.date}</div>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0">Voir</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 me-4">
                <Link href="/register">Commencer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#pricing">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Fonctionnalités démo</h2>
              <p className="text-lg text-slate-600">Découvrez les principales fonctionnalités de Qrious</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl mb-6">
                  📊
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-4">Statistiques en temps réel</h5>
                <p className="text-slate-600">Suivez les scans, visites et interactions de vos QR codes avec des graphiques détaillés.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl mb-6">
                  🎨
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-4">Personnalisation avancée</h5>
                <p className="text-slate-600">Adaptez l'apparence de vos fiches d'œuvres avec votre style et votre identité visuelle.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-slate-100">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl mb-6">
                  📱
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-4">Design responsive</h5>
                <p className="text-slate-600">Vos fiches d'œuvres s'adaptent parfaitement à tous les appareils et écrans.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
