#!/usr/bin/env node
/**
 * Export Expo web (static) → public/newqr pour Next.js.
 *
 * Usage (racine) : pnpm newqr:build
 * Dev UI rapide : ./mobile.sh web  → http://localhost:8081/newqr
 * Prod-like     : ./mobile.sh newqr && ./runsh.sh → http://localhost:3000/newqr
 */
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mobileDir = join(root, 'mobile')
const distDir = join(mobileDir, 'dist')
const outDir = join(root, 'public', 'newqr')

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
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

console.log('📦 Expo export -p web (baseUrl=/newqr)…')
run('pnpm', ['exec', 'expo', 'export', '-p', 'web'], mobileDir)

if (!existsSync(distDir)) {
  console.error('❌ mobile/dist manquant après export')
  process.exit(1)
}

console.log(`📁 Copie ${distDir} → ${outDir}`)
rmSync(outDir, { recursive: true, force: true })
mkdirSync(dirname(outDir), { recursive: true })
cpSync(distDir, outDir, { recursive: true })

console.log('✅ Éditeur prêt : http://localhost:3000/newqr')
