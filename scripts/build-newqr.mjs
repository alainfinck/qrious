#!/usr/bin/env node
/**
 * Export Expo web (static) → public/newqr pour Next.js.
 *
 * Usage (racine) : pnpm newqr:build
 * Dev UI rapide : ./mobile.sh web  → http://localhost:8081/newqr
 * Prod-like     : ./mobile.sh newqr && ./runsh.sh → http://localhost:3000/newqr
 *
 * En prod (Coolify), définir NEXT_PUBLIC_SERVER_URL ou EXPO_PUBLIC_API_URL
 * (ex. https://www.qrious.fr) pour l’inliner dans le bundle. Sinon le runtime
 * web retombe sur window.location.origin.
 */
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mobileDir = join(root, 'mobile')
const distDir = join(mobileDir, 'dist')
const outDir = join(root, 'public', 'newqr')

const apiUrl = (
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

function run(command, args, cwd, env = process.env) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    env,
    shell: process.platform === 'win32',
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

if (!existsSync(join(mobileDir, 'package.json'))) {
  console.error('❌ mobile/ introuvable')
  process.exit(1)
}

if (!existsSync(join(mobileDir, 'node_modules'))) {
  console.log('📥 pnpm install (mobile)…')
  run('pnpm', ['install', '--frozen-lockfile'], mobileDir)
}

console.log(`📦 Expo export -p web (baseUrl=/newqr, API=${apiUrl})…`)
if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(apiUrl)) {
  console.warn(
    '⚠️  EXPO_PUBLIC_API_URL / NEXT_PUBLIC_SERVER_URL est localhost — OK en local ; en prod Coolify, définir https://www.qrious.fr',
  )
}
run('pnpm', ['exec', 'expo', 'export', '-p', 'web'], mobileDir, {
  ...process.env,
  EXPO_PUBLIC_API_URL: apiUrl,
})

if (!existsSync(distDir)) {
  console.error('❌ mobile/dist manquant après export')
  process.exit(1)
}

console.log(`📁 Copie ${distDir} → ${outDir}`)
rmSync(outDir, { recursive: true, force: true })
mkdirSync(dirname(outDir), { recursive: true })
cpSync(distDir, outDir, { recursive: true })

console.log('✅ Éditeur prêt : http://localhost:3000/newqr')
