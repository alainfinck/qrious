'use client'

import { useState } from 'react'
import { Wrench, AlertTriangle, CheckCircle2, FileText, Phone, Calendar, MapPin, ShieldAlert } from 'lucide-react'
import { resolveMediaUrl } from '@/components/landing/utils'
import type { LandingPageTemplateProps } from '@/types/landing-page'

export function FieldServiceTemplate({ pageData }: LandingPageTemplateProps) {
  const { fieldServiceData, theme } = pageData
  const logoUrl = resolveMediaUrl(theme?.logo)
  const [reported, setReported] = useState(false)
  const [reportNote, setReportNote] = useState('')

  if (!fieldServiceData) {
    return (
      <div className="flex h-64 items-center justify-center p-6 text-center text-slate-500">
        Aucune donnée d'équipement configurée.
      </div>
    )
  }

  const isOperational = fieldServiceData.status === 'operational' || !fieldServiceData.status
  const isMaintenanceReq = fieldServiceData.status === 'maintenance_required'

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100">
      {/* ── Banner ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pb-8 pt-8 text-center text-white"
        style={{ borderBottom: '3px solid var(--brand-primary, #0ea5e9)' }}
      >
        <div className="mx-auto flex max-w-sm flex-col items-center px-4">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={fieldServiceData.assetName || 'Équipement'}
              className="mb-3 max-h-12 object-contain"
            />
          ) : (
            <span className="mb-2 rounded-full bg-sky-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-300 border border-sky-500/30">
              Field Service & Asset Management
            </span>
          )}

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            {fieldServiceData.assetName || pageData.title}
          </h1>

          {fieldServiceData.assetId && (
            <div className="mt-2 font-mono text-xs text-sky-400 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800/50">
              ID / S/N : {fieldServiceData.assetId}
            </div>
          )}

          {/* Badge de statut */}
          <div className="mt-3">
            {isOperational ? (
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-4 w-4" />
                <span>Équipement Opérationnel</span>
              </span>
            ) : isMaintenanceReq ? (
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/30">
                <AlertTriangle className="h-4 w-4" />
                <span>Maintenance Requise</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-bold text-rose-400 border border-rose-500/30">
                <ShieldAlert className="h-4 w-4" />
                <span>Hors Service</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-4 pt-4">
        {/* ── Infos Fiche Technicien ── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informations Matériel</h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {fieldServiceData.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-sky-400" />
                <div>
                  <div className="text-slate-400 text-[10px]">Emplacement</div>
                  <div className="font-semibold text-white">{fieldServiceData.location}</div>
                </div>
              </div>
            )}
            {fieldServiceData.category && (
              <div className="flex items-center space-x-2">
                <Wrench className="h-4 w-4 text-sky-400" />
                <div>
                  <div className="text-slate-400 text-[10px]">Catégorie</div>
                  <div className="font-semibold text-white">{fieldServiceData.category}</div>
                </div>
              </div>
            )}
            {fieldServiceData.lastInspectionDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-sky-400" />
                <div>
                  <div className="text-slate-400 text-[10px]">Dernier contrôle</div>
                  <div className="font-semibold text-white">{fieldServiceData.lastInspectionDate}</div>
                </div>
              </div>
            )}
            {fieldServiceData.nextInspectionDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-sky-400" />
                <div>
                  <div className="text-slate-400 text-[10px]">Prochain contrôle</div>
                  <div className="font-semibold text-white">{fieldServiceData.nextInspectionDate}</div>
                </div>
              </div>
            )}
          </div>

          {fieldServiceData.maintenanceNotes && (
            <div className="mt-3 rounded-xl bg-slate-800/60 p-3 text-xs text-slate-300 leading-relaxed border border-slate-700/50">
              <span className="font-bold text-white block mb-1">Consignes :</span>
              {fieldServiceData.maintenanceNotes}
            </div>
          )}
        </div>

        {/* ── Documentation & Contacts ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fieldServiceData.documentationUrl && (
            <a
              href={fieldServiceData.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 rounded-2xl border border-slate-800 bg-slate-900 p-3.5 hover:bg-slate-800 transition"
            >
              <FileText className="h-5 w-5 text-sky-400" />
              <div>
                <div className="text-xs font-bold text-white">Documentation PDF</div>
                <div className="text-[10px] text-slate-400">Notice & Schéma technique</div>
              </div>
            </a>
          )}
          {fieldServiceData.contactTechnicianPhone && (
            <a
              href={`tel:${fieldServiceData.contactTechnicianPhone}`}
              className="flex items-center space-x-3 rounded-2xl border border-slate-800 bg-slate-900 p-3.5 hover:bg-slate-800 transition"
            >
              <Phone className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Astreinte Technique</div>
                <div className="text-[10px] text-slate-400">{fieldServiceData.contactTechnicianPhone}</div>
              </div>
            </a>
          )}
        </div>

        {/* ── Signalement d'Incident ── */}
        <div className="rounded-2xl border border-rose-500/30 bg-slate-900/90 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-rose-400" />
            <h3 className="text-sm font-bold text-white">Signaler une anomalie / panne</h3>
          </div>

          {!reported ? (
            <div className="space-y-3 mt-3">
              <textarea
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
                placeholder="Décrivez l'anomalie constatée..."
                rows={3}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => setReported(true)}
                disabled={!reportNote.trim()}
                className="w-full rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition active:scale-95"
              >
                Envoyer le ticket d'intervention
              </button>
            </div>
          ) : (
            <div className="mt-3 rounded-xl bg-emerald-500/20 p-3 text-center border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Ticket transmis à l'équipe technique !</div>
              <div className="text-[10px] text-slate-400 mt-1">Intervention programmée en priorité.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
