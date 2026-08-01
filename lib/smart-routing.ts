import type { LandingPage, TimeRuleSlot } from '@/types/landing-page'

export interface SmartRouteResult {
  activeMode: 'none' | 'time_slots' | 'event_timeline' | 'ab_test'
  targetSlug?: string | null
  activeTimeSlot?: TimeRuleSlot | null
  eventStage?: 'before' | 'during' | 'after' | null
  noticeMessage?: string | null
  abVariant?: 'A' | 'B' | null
}

/**
 * Compare une heure HH:mm à une plage HH:mm - HH:mm
 */
function isTimeInWindow(nowTimeStr: string, startTime: string, endTime: string): boolean {
  if (!startTime || !endTime) return false
  if (startTime <= endTime) {
    return nowTimeStr >= startTime && nowTimeStr <= endTime
  }
  // Plage qui chevauche minuit (ex: 22:00 à 02:00)
  return nowTimeStr >= startTime || nowTimeStr <= endTime
}

/**
 * Évalue les règles de Smart Routing d'une landing page et retourne la route / contenu actif
 */
export function resolveSmartRoute(
  pageData: LandingPage,
  nowDate: Date = new Date()
): SmartRouteResult {
  const config = pageData.smartRouting

  if (!config || !config.mode || config.mode === 'none') {
    return { activeMode: 'none' }
  }

  // 1. Mode Plages Horaires (Time Slots)
  if (config.mode === 'time_slots' && config.timeRules && config.timeRules.length > 0) {
    const hours = String(nowDate.getHours()).padStart(2, '0')
    const minutes = String(nowDate.getMinutes()).padStart(2, '0')
    const nowTimeStr = `${hours}:${minutes}`

    const activeSlot = config.timeRules.find((slot) =>
      isTimeInWindow(nowTimeStr, slot.startTime, slot.endTime)
    )

    if (activeSlot) {
      return {
        activeMode: 'time_slots',
        activeTimeSlot: activeSlot,
        targetSlug: activeSlot.targetSlug || null,
        noticeMessage: activeSlot.customNotice || null,
      }
    }
  }

  // 2. Mode Chronologie Événementielle (Event Timeline)
  if (config.mode === 'event_timeline' && config.eventSchedule) {
    const {
      eventStartDate,
      eventEndDate,
      beforeEventTargetSlug,
      beforeEventNotice,
      duringEventTargetSlug,
      afterEventTargetSlug,
      afterEventNotice,
    } = config.eventSchedule

    const nowTimestamp = nowDate.getTime()
    const startTimestamp = eventStartDate ? new Date(eventStartDate).getTime() : 0
    const endTimestamp = eventEndDate ? new Date(eventEndDate).getTime() : Infinity

    if (startTimestamp && nowTimestamp < startTimestamp) {
      return {
        activeMode: 'event_timeline',
        eventStage: 'before',
        targetSlug: beforeEventTargetSlug || null,
        noticeMessage: beforeEventNotice || 'L’événement commencera bientôt !',
      }
    }

    if (nowTimestamp >= startTimestamp && nowTimestamp <= endTimestamp) {
      return {
        activeMode: 'event_timeline',
        eventStage: 'during',
        targetSlug: duringEventTargetSlug || null,
      }
    }

    if (nowTimestamp > endTimestamp) {
      return {
        activeMode: 'event_timeline',
        eventStage: 'after',
        targetSlug: afterEventTargetSlug || null,
        noticeMessage: afterEventNotice || 'Merci de votre participation !',
      }
    }
  }

  // 3. Mode A/B Testing (Répartition 50/50)
  if (config.mode === 'ab_test' && config.abTest && config.abTest.enabled) {
    const { variantASlug, variantBSlug, splitRatio } = config.abTest
    const ratio = splitRatio ?? 50
    // Détermination pseudo-aléatoire basée sur le milliseconde actuel
    const isVariantA = Math.floor(Math.random() * 100) < ratio

    return {
      activeMode: 'ab_test',
      abVariant: isVariantA ? 'A' : 'B',
      targetSlug: isVariantA ? (variantASlug || null) : (variantBSlug || null),
    }
  }

  return { activeMode: 'none' }
}
