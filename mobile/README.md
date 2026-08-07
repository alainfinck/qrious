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

### Mode embed (sites partenaires)

Pour intégrer l’éditeur dans un site externe (iframe) sans chrome marketing :

```
https://www.qrious.fr/newqr?embed=1&url=https%3A%2F%2Fvotre-page&lockUrl=1&partner=cartepostale
```

| Param | Rôle |
| --- | --- |
| `embed=1` | Masque header / CTA compte / upsell Smart Page |
| `url` | Prefill du contenu (URL encodée) |
| `lockUrl=1` | Fige le type sur URL (design libre, destination verrouillée) |
| `partner` | Label optionnel dans le footer « propulsé par QRious » |

Les origines iframe autorisées sont listées dans `middleware.ts` (`EMBED_FRAME_ANCESTORS`).

Dev Metro : `http://localhost:8081/newqr?embed=1&…`

## EAS (builds cloud, OTA, web)

Compte Expo requis. Une fois :

```bash
./mobile.sh eas:init              # login + lie le projet (écrit projectId)
pnpm --dir mobile exec eas update:configure   # runtimeVersion + updates.url
```

| Commande | Rôle |
| --- | --- |
| `./mobile.sh eas:preview` | Build interne iOS/Android (TestFlight interne / APK) |
| `./mobile.sh eas:production` | Build store-ready |
| `./mobile.sh eas:update preview` | **OTA** JS/assets sur le canal `preview` (pas de review store) |
| `./mobile.sh eas:update production` | OTA canal `production` |
| `./mobile.sh eas:submit` | Envoi App Store / Play depuis le dernier build |
| `./mobile.sh eas:deploy` | Export web + **EAS Hosting** (preview URL) |
| `./mobile.sh eas:deploy --prod` | Promote le deploy web en production |

Profils dans `mobile/eas.json` : `development`, `development-device`, `preview`, `production` (canaux OTA alignés).

Bundle ID : `fr.qrious.app`. API prod injectée en build : `https://www.qrious.fr`.

> Note : `/newqr` via Next reste le chemin site marketing. EAS Hosting est l’option cloud Expo autonome.

## Auth

Login via `POST /api/users/login` (JWT Payload). Le token est stocké dans SecureStore (natif) ou AsyncStorage (web).

## Fonctionnalités

- Auth : login, register, forgot/reset password
- Vue d’ensemble, Scanner QR (iOS/Android), QR codes, Smart Pages, Médias, Statistiques, Profil
- Création / édition / suppression de landing pages (tous les verticals)
- Aperçu QR + copie d’URL
- Upload médias
