# QRious Dashboard (Expo)

App Expo (iOS / Android / Web) qui reprend le dashboard QRious.

## Prérequis

- Backend Next/Payload lancé sur `http://localhost:3000` (`./runsh.sh` à la racine)
- `EXPO_PUBLIC_API_URL` pointant vers cette API (voir `.env`)

## Lancer

```bash
cd mobile
pnpm start          # QR code Expo Go / simulateur
pnpm web            # Dashboard web Expo (port 8081)
```

Depuis la racine du monorepo :

```bash
pnpm dev:mobile
pnpm dev:mobile:web
```

## Auth

Login via `POST /api/users/login` (JWT Payload). Le token est stocké dans SecureStore (natif) ou AsyncStorage (web).

## Fonctionnalités

- Auth : login, register, forgot/reset password
- Vue d’ensemble, QR codes, Smart Pages, Médias, Statistiques, Profil
- Création / édition / suppression de landing pages (tous les verticals)
- Aperçu QR + copie d’URL
- Upload médias
