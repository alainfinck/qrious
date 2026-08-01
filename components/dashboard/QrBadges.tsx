import { Badge } from '@/components/ui/badge'
import { STATUS_LABELS, VERTICAL_LABELS } from '@/lib/dashboard/utils'
import type { LandingPageStatus, LandingPageVertical } from '@/types/landing-page'

export function VerticalBadge({ vertical }: { vertical: LandingPageVertical }) {
  return <Badge variant="secondary">{VERTICAL_LABELS[vertical]}</Badge>
}

export function StatusBadge({ status }: { status: LandingPageStatus }) {
  return (
    <Badge variant={status === 'published' ? 'default' : 'outline'}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
