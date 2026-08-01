import Link from 'next/link'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'

export default function GaleriesPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
              <div className="space-y-8">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                  Pour les Galeries d'Art
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                  Transformez vos expositions en expériences interactives
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  Utilisez les QR codes comme outil marketing pour diffuser des informations détaillées sur vos artistes et leurs œuvres. Donnez à vos clients un accès instantané à des contenus enrichis qui valorisent votre collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                    <Link href="/demo">Voir la démo</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Demander une démo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
                  <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <div className="font-semibold text-slate-900">Galerie Moderne</div>
                    <div className="flex gap-4 text-sm font-medium">
                      <span className="text-slate-900">Artistes</span>
                      <span className="text-slate-400 hidden sm:inline">Expositions</span>
                      <span className="text-slate-400 hidden sm:inline">À propos</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                      <div className="flex gap-4 items-start">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                          👨‍🎨
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">Marie Dubois</h3>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            Artiste contemporaine reconnue pour ses œuvres explorant la relation entre technologie et humanité
                          </p>
                          <div className="flex gap-4 mt-4 text-xs font-medium text-slate-600">
                            <div><span className="text-slate-900 font-bold text-lg">24</span> œuvres</div>
                            <div><span className="text-slate-900 font-bold text-lg">156</span> visites</div>
                            <div><span className="text-slate-900 font-bold text-lg">89%</span> engagement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100 text-slate-400 font-bold text-xl mb-3">
                        QR
                      </div>
                      <p className="text-sm font-medium text-slate-500">Scannez pour découvrir l'artiste</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Un outil marketing puissant pour vos galeries</h2>
              <p className="mt-4 text-lg text-slate-600">
                Diffusez des informations enrichies et engagez vos visiteurs avec des contenus interactifs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '📱',
                  title: 'Informations instantanées',
                  desc: "Donnez à vos clients un accès immédiat aux informations détaillées sur chaque œuvre et artiste. Plus besoin de brochures papier !",
                  list: ["Biographies d'artistes complètes", "Descriptions détaillées des œuvres", "Prix et disponibilité en temps réel", "Vidéos et contenus multimédias"]
                },
                {
                  icon: '🎯',
                  title: 'Marketing interactif',
                  desc: "Transformez chaque visite en opportunité de vente avec des contenus marketing ciblés et des appels à l'action stratégiques.",
                  list: ["Liens vers les réseaux sociaux", "Boutons d'achat directs", "Newsletter et fidélisation", "Partage viral facilité"]
                },
                {
                  icon: '📊',
                  title: 'Analytics marketing',
                  desc: "Mesurez l'impact de vos expositions et optimisez votre stratégie marketing avec des données précises sur l'engagement.",
                  list: ["Suivi des interactions par œuvre", "Analyse du parcours client", "Rapports de performance", "Optimisation des conversions"]
                }
              ].map((benefit, i) => (
                <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <div className="text-4xl mb-6">{benefit.icon}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h4>
                  <p className="text-slate-600 mb-6 leading-relaxed">{benefit.desc}</p>
                  <ul className="space-y-3">
                    {benefit.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-12">
                  Informations enrichies pour vos clients
                </h2>
                <div className="space-y-8">
                  {[
                    { icon: '📖', title: "Fiches d'œuvres détaillées", desc: "Créez des descriptions complètes avec techniques, dimensions, prix et disponibilité" },
                    { icon: '👨‍🎨', title: "Profils d'artistes enrichis", desc: "Biographies, parcours, influences et autres œuvres de l'artiste" },
                    { icon: '🎥', title: "Contenus multimédias", desc: "Vidéos, interviews, making-of et visites virtuelles des ateliers" },
                    { icon: '💬', title: "Interactions sociales", desc: "Commentaires, partages et intégration avec les réseaux sociaux" }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-2xl">
                        {feature.icon}
                      </div>
                      <div>
                        <h5 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h5>
                        <p className="text-slate-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl overflow-hidden">
                  <div className="border-b border-slate-100 p-2 flex gap-2">
                    <div className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold text-slate-900">Artistes</div>
                    <div className="px-4 py-2 text-sm font-medium text-slate-500">Expositions</div>
                    <div className="px-4 py-2 text-sm font-medium text-slate-500">Analytics</div>
                  </div>
                  <div className="p-6 bg-slate-50 grid grid-cols-2 gap-4">
                    {[
                      { icon: '👩‍🎨', name: 'Sophie Martin', category: 'Sculpture' },
                      { icon: '👨‍🎨', name: 'Pierre Dubois', category: 'Peinture' },
                      { icon: '👩‍🎨', name: 'Emma Laurent', category: 'Photographie' },
                      { icon: '👨‍🎨', name: 'Thomas Moreau', category: 'Installation' }
                    ].map((artist, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                        <div className="h-16 w-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-2xl mb-3">
                          {artist.icon}
                        </div>
                        <h6 className="font-bold text-slate-900">{artist.name}</h6>
                        <span className="text-xs text-slate-500">{artist.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Experience Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Une expérience client enrichie</h2>
              <p className="mt-4 text-lg text-slate-600">
                Vos visiteurs découvrent plus qu'une simple œuvre d'art
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '🔍', title: 'Découverte approfondie', desc: "Chaque scan révèle l'histoire derrière l'œuvre, la technique utilisée et l'inspiration de l'artiste." },
                { icon: '📱', title: 'Accès mobile', desc: "Informations disponibles 24h/24 sur smartphone, même après la visite de la galerie." },
                { icon: '🔄', title: 'Contenu mis à jour', desc: "Informations dynamiques : prix, disponibilité et nouvelles œuvres en temps réel." },
                { icon: '💳', title: 'Achat facilité', desc: "Liens directs vers les pages d'achat et contact avec la galerie en un clic." }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-2xl mb-6">
                    {item.icon}
                  </div>
                  <h5 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h5>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              Prêt à enrichir l'expérience de vos clients ?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Transformez vos expositions en expériences interactives avec Qrious.fr
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/demo">Essayer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800">
                <Link href="/contact">Parler à un expert</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
