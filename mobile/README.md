# QRious Dashboard (Expo)

App Expo (iOS / Android / Web) qui reprend le dashboard QRious.

## Prérequis

- Backend Next/Payload lancé sur `http://localhost:3000` (`./runsh.sh` à la racine)
- `EXPO_PUBLIC_API_URL` pointant vers cette API (voir `.env`)

## Lancer

Depuis la racine (recommandé) :

```bash
./mobile.sh            # aide
./mobile.sh web        # Expo web → http://localhost:8081/newqr
./mobile.sh newqr      # Export static → public/newqr (via Next :3000/newqr)
./mobile.sh start      # Metro / Expo Go
./mobile.sh site       # Backend Next/Payload (:3000)
./mobile.sh ios        # Simulateur iOS
./mobile.sh native     # App Release sur iPhone
```

L’éditeur public marketing (`/newqr`) **est** l’app Expo (une seule UI). `/editeur` redirige vers `/newqr`.

## Auth

Login via `POST /api/users/login` (JWT Payload). Le token est stocké dans SecureStore (natif) ou AsyncStorage (web).

## Fonctionnalités

- Auth : login, register, forgot/reset password
- Vue d’ensemble, Scanner QR (iOS/Android), QR codes, Smart Pages, Médias, Statistiques, Profil
- Création / édition / suppression de landing pages (tous les verticals)
- Aperçu QR + copie d’URL
- Upload médias
