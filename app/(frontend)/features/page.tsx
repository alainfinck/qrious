import Link from 'next/link'
import {
  QrCode,
  FileText,
  BarChart3,
  Palette,
  Share2,
  LayoutDashboard,
  Smartphone,
  Download,
  Globe,
  ShieldCheck,
  Check,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CtaSection } from '@/components/marketing/CtaSection'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'

export default function FeaturesPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                  Fonctionnalités
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Tout ce dont vous avez besoin pour présenter vos œuvres
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Découvrez la suite complète d'outils qui révolutionne la présentation de vos œuvres d'art 
                  et transforme l'expérience de vos visiteurs avec des QR codes personnalisés.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                    <Link href="/demo">Voir la démo</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/#pricing">Voir les tarifs</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15+</div>
                    <div className="text-sm text-slate-500">Fonctionnalités</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm text-slate-500">Responsive</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">24/7</div>
                    <div className="text-sm text-slate-500">Support</div>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden relative shadow-2xl">
                  {/* Using a placeholder since we don't have the exact image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                    <div className="text-slate-400 font-medium">Image Galerie</div>
                  </div>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                    <div className="bg-white/90 backdrop-blur rounded-2xl p-4 flex-1 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center">
                          <QrCode className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium">Scannez pour découvrir</div>
                          <div className="font-semibold text-slate-900">12 QR Codes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Fonctionnalités principales</h2>
              <p className="mt-4 text-lg text-slate-600">
                Tout ce dont vous avez besoin pour présenter vos œuvres de manière professionnelle
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Feature 1 */}
              <div className="space-y-6">
                <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                  <QrCode className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">QR Codes personnalisés</h3>
                <p className="text-slate-600 leading-relaxed">
                  Créez des QR codes uniques pour chaque œuvre, adaptés à votre style artistique. 
                  Personnalisez la couleur, le logo et l'apparence pour une intégration parfaite.
                </p>
                <ul className="space-y-3">
                  {['Personnalisation des couleurs', 'Intégration de votre logo', 'Styles multiples disponibles', 'Génération instantanée'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Check className="h-5 w-5 text-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="space-y-6">
                <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Fiches d'œuvres enrichies</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ajoutez des descriptions détaillées, photos, vidéos et liens externes. 
                  Offrez à vos visiteurs une expérience immersive et interactive.
                </p>
                <ul className="space-y-3">
                  {['Photos haute résolution', 'Vidéos intégrées', 'Descriptions détaillées', 'Liens vers réseaux sociaux'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Check className="h-5 w-5 text-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="space-y-6">
                <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Statistiques avancées</h3>
                <p className="text-slate-600 leading-relaxed">
                  Suivez en temps réel les scans, interactions et l'engagement de votre audience. 
                  Accédez à des graphiques détaillés pour optimiser vos expositions.
                </p>
                <ul className="space-y-3">
                  {['Scans en temps réel', 'Graphiques interactifs', 'Rapports détaillés', 'Export des données'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Check className="h-5 w-5 text-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="space-y-6">
                <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                  <Palette className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Personnalisation complète</h3>
                <p className="text-slate-600 leading-relaxed">
                  Chaque artiste peut personnaliser son espace, fiches et QR codes selon 
                  son identité visuelle et ses besoins spécifiques.
                </p>
                <ul className="space-y-3">
                  {['Thèmes personnalisés', 'Identité visuelle', 'Layouts adaptatifs', 'Branding intégré'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <Check className="h-5 w-5 text-purple-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Fonctionnalités avancées</h2>
              <p className="mt-4 text-lg text-slate-600">
                Des outils professionnels pour les artistes et galeries exigeants
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Share2,
                  title: 'Intégration réseaux sociaux',
                  desc: 'Ajoutez facilement vos comptes Instagram, Facebook et autres réseaux sociaux pour permettre à vos visiteurs de vous suivre.'
                },
                {
                  icon: LayoutDashboard,
                  title: 'Gestion centralisée',
                  desc: 'Administrez toutes vos œuvres, QR codes et statistiques depuis un tableau de bord simple et intuitif, accessible partout.'
                },
                {
                  icon: Smartphone,
                  title: 'Design responsive',
                  desc: "Les fiches d'œuvres s'adaptent parfaitement à tous les écrans : smartphone, tablette, ordinateur ou borne interactive."
                },
                {
                  icon: Download,
                  title: 'Export & sauvegarde',
                  desc: "Exportez vos données, statistiques et fiches d'œuvres en un clic pour garder une trace ou partager avec vos partenaires."
                },
                {
                  icon: Globe,
                  title: 'API personnalisée',
                  desc: 'Intégrez Qrious dans vos systèmes existants avec notre API pour une expérience sur mesure.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Sécurité avancée',
                  desc: 'Vos données sont protégées avec un chiffrement SSL et des sauvegardes sécurisées selon le RGPD.'
                },
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Showcase */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">
                  Galerie d'art
                </span>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Transformez votre galerie en expérience interactive
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Découvrez comment Qrious révolutionne l'expérience des visiteurs dans les galeries d'art 
                  avec des QR codes élégants et des fiches d'œuvres enrichies.
                </p>
                <ul className="space-y-4">
                  {['QR codes personnalisés avec votre branding', "Fiches d'œuvres multilingues", "Statistiques d'engagement détaillées"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                    <Link href="/demo">Voir la démo</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/galeries">Pour les galeries</Link>
                  </Button>
                </div>
              </div>
              <div className="relative lg:ml-auto w-full max-w-lg">
                 <div className="aspect-[4/5] rounded-3xl bg-slate-100 overflow-hidden relative shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center">
                    <div className="text-slate-400 font-medium">Image Galerie 2</div>
                  </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <MarketingFooter />
    </div>
  )
}
