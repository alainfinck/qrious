import Link from 'next/link'
import { Palette, Users, Lightbulb, Star, Heart, Leaf, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { CtaSection } from '@/components/marketing/CtaSection'

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-white">
      <MarketingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 pt-32 pb-28 lg:pt-40 lg:pb-36">
          <div className="absolute inset-0 z-0">
            {/* Background image placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1958&q=80')] bg-cover bg-center mix-blend-overlay" />
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                Notre mission : démocratiser l'art contemporain
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-10">
                Qrious.fr est né d'une vision simple : rendre l'art contemporain accessible à tous, 
                en créant des ponts entre les artistes et leur public grâce à la technologie.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <a href="#notre-histoire">Découvrir notre histoire</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our History Section */}
        <section id="notre-histoire" className="py-24 bg-white scroll-mt-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-12">Notre histoire</h2>
                <div className="space-y-10 border-l-2 border-slate-100 pl-6 relative">
                  {[
                    { year: '2020', title: "La naissance d'une idée", desc: "Face aux défis de la pandémie, nous avons constaté que les artistes avaient besoin de nouvelles façons de connecter avec leur public. L'idée de Qrious.fr était née." },
                    { year: '2021', title: "Premier prototype", desc: "Développement du premier prototype de galerie virtuelle avec QR codes, testé avec des artistes locaux." },
                    { year: '2022', title: "Lancement officiel", desc: "Qrious.fr voit le jour avec sa première version publique, accueillant des artistes de toute la France." },
                    { year: '2023', title: "Expansion et innovation", desc: "Plus de 500 artistes utilisent notre plateforme, et nous lançons de nouvelles fonctionnalités avancées." }
                  ].map((event, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[33px] top-1 bg-white h-4 w-4 rounded-full border-4 border-purple-600" />
                      <div className="text-sm font-bold text-purple-600 mb-2">{event.year}</div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h4>
                      <p className="text-slate-600">{event.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-rose-500 rounded-3xl p-6 aspect-square flex flex-col justify-end text-white col-span-2 shadow-lg">
                  <h6 className="font-bold text-xl mb-1">Artistes connectés</h6>
                  <p className="text-white/80 font-medium">500+ artistes</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 aspect-square flex flex-col justify-end text-white shadow-lg">
                  <h6 className="font-bold mb-1">Œuvres partagées</h6>
                  <p className="text-white/80 text-sm font-medium">2000+ œuvres</p>
                </div>
                <div className="bg-gradient-to-br from-fuchsia-400 to-rose-400 rounded-3xl p-6 aspect-square flex flex-col justify-end text-white shadow-lg">
                  <h6 className="font-bold mb-1">Visiteurs engagés</h6>
                  <p className="text-white/80 text-sm font-medium">50k+ visites</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Notre mission</h2>
              <p className="mt-4 text-lg text-slate-600">
                Nous croyons que l'art doit être accessible à tous, partout, tout le temps.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Palette, title: "Démocratiser l'art", desc: "Rendre l'art contemporain accessible à tous, en brisant les barrières géographiques et sociales qui limitent l'accès à la culture." },
                { icon: Users, title: "Connecter artistes et public", desc: "Créer des ponts directs entre les artistes et leur public, permettant des échanges authentiques et des découvertes enrichissantes." },
                { icon: Lightbulb, title: "Innovation technologique", desc: "Utiliser la technologie pour enrichir l'expérience artistique, en créant de nouvelles façons d'interagir avec l'art." }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-6">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Nos valeurs</h2>
              <p className="mt-4 text-lg text-slate-600">
                Les principes qui guident chacune de nos actions et décisions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Star, title: "Excellence", desc: "Nous visons l'excellence dans tout ce que nous faisons, de la technologie à l'expérience utilisateur." },
                { icon: Heart, title: "Accessibilité", desc: "L'art doit être accessible à tous, sans discrimination de genre, d'âge ou de situation sociale." },
                { icon: Leaf, title: "Durabilité", desc: "Nous nous engageons pour un art durable, respectueux de l'environnement et des générations futures." },
                { icon: Zap, title: "Innovation", desc: "Nous repoussons constamment les limites pour créer de nouvelles expériences artistiques." }
              ].map((value, i) => (
                <div key={i} className="rounded-3xl p-6 bg-slate-50 border border-slate-100 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-purple-600 mb-4">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h5 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h5>
                  <p className="text-sm text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Notre équipe</h2>
              <p className="mt-4 text-lg text-slate-600">
                Une équipe passionnée qui combine expertise technique et sensibilité artistique.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { emoji: '👨‍💻', name: 'Thomas Dubois', role: 'Fondateur & CEO', desc: "Passionné d'art et de technologie, Thomas a créé Qrious.fr pour révolutionner l'expérience artistique." },
                { emoji: '👩‍🎨', name: 'Marie Laurent', role: 'Directrice Artistique', desc: "Artiste et curatrice, Marie s'assure que chaque interaction avec l'art soit une expérience enrichissante." },
                { emoji: '👨‍🔬', name: 'Alexandre Moreau', role: 'CTO', desc: "Expert en développement, Alexandre transforme nos idées créatives en solutions technologiques innovantes." }
              ].map((member, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 text-center shadow-sm">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-4xl mb-4">
                    {member.emoji}
                  </div>
                  <h5 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h5>
                  <p className="text-purple-600 font-medium text-sm mb-4">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">Rejoignez l'aventure</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Que vous soyez artiste, amateur d'art ou simplement curieux, il y a une place pour vous dans l'écosystème Qrious.fr.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800">
                <Link href="/demo">Essayer gratuitement</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
