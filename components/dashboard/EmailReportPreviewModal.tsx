'use client'

import { Mail, CheckCircle2, Sparkles, TrendingUp, Calendar, ArrowRight, Eye, Star, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WEEKLY_REPORT_DATA } from '@/lib/dashboard/analytics-data'

interface EmailReportPreviewModalProps {
  trigger?: React.ReactNode
}

export function EmailReportPreviewModal({ trigger }: EmailReportPreviewModalProps) {
  const data = WEEKLY_REPORT_DATA

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4 text-primary" />
            Aperçu du mail hebdo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-border">
        {/* Email Header Simulation */}
        <div className="bg-slate-950 text-white p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground text-sm">
              Q
            </div>
            <div>
              <p className="text-xs text-slate-400">Aperçu du mail envoyé au propriétaire</p>
              <p className="text-sm font-semibold text-white">
                Bilan Hebdomadaire QRious — {data.periodLabel}
              </p>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Email HTML interactif
          </Badge>
        </div>

        {/* HTML Email Body Container */}
        <div className="p-6 bg-slate-100 dark:bg-slate-900/60 font-sans text-slate-900 dark:text-slate-100">
          <div className="max-w-md mx-auto bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            
            {/* Email Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-primary/95 to-slate-950 p-6 text-white text-center relative">
              <Badge className="bg-white/10 text-white border-white/20 mb-3">
                <Sparkles className="h-3 w-3 mr-1" />
                Rapport Hebdomadaire
              </Badge>
              <h3 className="text-2xl font-extrabold tracking-tight">
                QRious Intelligence
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {data.periodLabel}
              </p>
            </div>

            {/* Key Copy Highlight Banner */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-emerald-500/10">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    "Cette semaine, votre menu a été consulté <span className="text-emerald-600 dark:text-emerald-400 font-black underline decoration-emerald-400/50">{data.totalScans.toLocaleString('fr-FR')} fois</span> et vous avez collecté <span className="text-emerald-600 dark:text-emerald-400 font-black underline decoration-emerald-400/50">{data.googleReviewsCollected} avis Google</span> !"
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                    ↑ +{data.scanDiffPercent}% de consultations par rapport à la semaine précédente.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    Total Scans
                  </span>
                  <p className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    {data.totalScans.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    +{data.scanDiffPercent}% vs sem. dern.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    Avis Google
                  </span>
                  <p className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    +{data.googleReviewsCollected}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    100% avis vérifiés
                  </p>
                </div>
              </div>

              {/* Highlights & Top QR */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    🏆 QR Code le plus actif
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center justify-between">
                    <span>{data.topQrTitle}</span>
                    <strong className="text-primary font-bold">{data.topQrScans} scans</strong>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    ⚡ Heure de pointe principale
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center justify-between">
                    <span>{data.peakDayTime}</span>
                    <strong className="text-amber-500 font-bold">{data.peakDayScans} scans</strong>
                  </p>
                </div>
              </div>

              {/* Insights List */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  💡 Recommandations QRious
                </p>
                {data.insights.map((ins, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="text-primary font-bold">•</span>
                    <span>{ins}</span>
                  </div>
                ))}
              </div>

              {/* Email Button CTA */}
              <div className="pt-3 text-center">
                <Button className="w-full font-bold gap-2">
                  Accéder à votre Dashboard Complet
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Footer text */}
              <div className="text-center pt-2 text-[10px] text-slate-400">
                Vous recevez cet e-mail car l'option "Rapport Hebdomadaire" est activée sur votre compte QRious.
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
