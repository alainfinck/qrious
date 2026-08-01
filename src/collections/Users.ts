import type { CollectionConfig } from 'payload'

function getServerUrl(): string {
  return (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
}

function isAdmin(user: { role?: string } | null | undefined): boolean {
  return user?.role === 'admin'
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7,
    forgotPassword: {
      generateEmailSubject: () => 'Réinitialisation de votre mot de passe Qrious',
      generateEmailHTML: (args) => {
        const token = args?.token ?? ''
        const user = args?.user
        const resetUrl = `${getServerUrl()}/dashboard/reset-password?token=${token}`
        const email = typeof user === 'object' && user && 'email' in user ? String(user.email) : ''

        return `
          <!doctype html>
          <html>
            <body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a;">
              <p>Bonjour${email ? ` ${email}` : ''},</p>
              <p>Vous avez demandé à réinitialiser votre mot de passe Qrious.</p>
              <p>
                <a href="${resetUrl}" style="display:inline-block;background:#0f172a;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;">
                  Réinitialiser mon mot de passe
                </a>
              </p>
              <p style="color:#64748b;font-size:14px;">Ou copiez ce lien :<br>${resetUrl}</p>
              <p style="color:#64748b;font-size:14px;">Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
            </body>
          </html>
        `
      },
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  access: {
    admin: ({ req: { user } }) => isAdmin(user),
    create: () => true,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => isAdmin(user),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Utilisateur', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        create: () => false,
        update: ({ req: { user } }) => isAdmin(user),
      },
      admin: {
        description: 'Les admins accèdent au CMS. Les utilisateurs accèdent au dashboard.',
      },
    },
  ],
}
