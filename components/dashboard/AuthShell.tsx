import { QrCode } from 'lucide-react'

export function AuthShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
          <QrCode className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">QRious</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        </div>
        <div className="p-6 pt-0">{children}</div>
      </div>
    </div>
  )
}
