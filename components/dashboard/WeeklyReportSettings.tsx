'use client'

import { useState } from 'react'
import { Mail, Bell, CheckCircle2, AlertTriangle, Send, ShieldAlert, Sparkles, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { EmailReportPreviewModal } from '@/components/dashboard/EmailReportPreviewModal'
import { sendTestWeeklyDigestEmail, saveWeeklyReportSettings } from '@/lib/dashboard/actions'

export function WeeklyReportSettings() {
  const [enabled, setEnabled] = useState(true)
  const [email, setEmail] = useState('direction@restaurant-etoile.fr')
  const [day, setDay] = useState('lundi')
  const [hour, setHour] = useState('08:00')
  const [spikeAlert, setSpikeAlert] = useState(true)
  const [outageAlert, setOutageAlert] = useState(true)

  const [saving, setSaving] = useState(false)
  const [sendingTest, setSendingTest] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatusMessage(null)

    try {
      const res = await saveWeeklyReportSettings({
        enabled,
        email,
        day,
        hour,
        spikeAlert,
        outageAlert,
      })

      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Paramètres enregistrés avec succès !' })
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'Erreur lors de l\'enregistrement.' })
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Une erreur est survenue.' })
    } finally {
      setSaving(false)
    }
  }

  const handleSendTestEmail = async () => {
    setSendingTest(true)
    setStatusMessage(null)

    try {
      const res = await sendTestWeeklyDigestEmail(email)
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: `E-mail de test envoyé à ${email} !`,
        })
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'Impossible d\'envoyer l\'email de test.',
        })
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Une erreur s\'est produite lors de l\'envoi.' })
    } finally {
      setSendingTest(false)
    }
  }

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Alertes de Rupture & Rapports Hebdomadaires par Email
          </CardTitle>
          <CardDescription>
            Recevez un bilan automatique et des alertes instantanées en cas de variation anormale du trafic QR code.
          </CardDescription>
        </div>
        <EmailReportPreviewModal />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Main Activation Switch & Email */}
          <div className="p-4 rounded-xl border border-border/80 bg-accent/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold text-foreground">
                  Envoi Automatique du Bilan Hebdomadaire
                </Label>
                <p className="text-xs text-muted-foreground">
                  Génère un récapitulatif complet (ex: "Cette semaine, votre menu a été consulté 1 420 fois et vous avez collecté 18 avis Google !")
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  enabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {enabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border/60">
                <div className="md:col-span-1 space-y-1.5">
                  <Label htmlFor="emailInput" className="text-xs font-semibold">
                    Adresse e-mail destinataire
                  </Label>
                  <Input
                    id="emailInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@restaurant.fr"
                    required
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="daySelect" className="text-xs font-semibold">
                    Jour d'envoi
                  </Label>
                  <select
                    id="daySelect"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="lundi">Lundi matin</option>
                    <option value="vendredi">Vendredi soir</option>
                    <option value="dimanche">Dimanche soir</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="hourSelect" className="text-xs font-semibold">
                    Heure d'envoi
                  </Label>
                  <select
                    id="hourSelect"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="08:00">08:00 (Recommandé)</option>
                    <option value="09:00">09:00</option>
                    <option value="18:00">18:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Alertes de Rupture & Triggers */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              Alertes Intelligentes en Temps Réel
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Traffic Spike Alert */}
              <div 
                onClick={() => setSpikeAlert(!spikeAlert)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  spikeAlert ? 'border-primary/50 bg-primary/5' : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      Alerte Pic d'Affluence (+50%)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Notification immédiate si un QR code subit une hausse soudaine de trafic.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={spikeAlert}
                    onChange={() => {}}
                    className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                  />
                </div>
              </div>

              {/* Outage / Low Activity Alert */}
              <div 
                onClick={() => setOutageAlert(!outageAlert)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  outageAlert ? 'border-primary/50 bg-primary/5' : 'border-border/60 bg-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                      Alerte Inactivité / Rupture (0 scan / 24h)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Avertissement si aucun scan n'est enregistré pendant 24h sur un QR code actif.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={outageAlert}
                    onChange={() => {}}
                    className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback messages */}
          {statusMessage && (
            <div className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
            }`}>
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {statusMessage.text}
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendTestEmail}
              disabled={sendingTest}
              className="gap-2"
            >
              <Send className="h-3.5 w-3.5 text-primary" />
              {sendingTest ? 'Envoi en cours...' : 'Envoyer un e-mail test maintenant'}
            </Button>

            <Button type="submit" disabled={saving} size="sm" className="gap-2 font-bold">
              {saving ? 'Enregistrement...' : 'Enregistrer les préférences'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
