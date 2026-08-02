import { Slot } from 'expo-router'

import { DashboardShell } from '../../src/components/DashboardShell'

export default function AppLayout() {
  return (
    <DashboardShell>
      <Slot />
    </DashboardShell>
  )
}
