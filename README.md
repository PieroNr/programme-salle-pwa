# Programme Salle (PWA)

Site statique, sans build ni dépendance. Tout le code est dans `index.html`.

## Contenu

- `index.html` : l'app (HTML, CSS, JS, données des 4 séances)
- `sw.js` : service worker, met l'app et les photos en cache pour un usage hors ligne
- `manifest.webmanifest` : nom, couleurs et icônes de la PWA
- `icons/` : icône de l'app (SVG source + PNG 180, 192, 512)
- `img/` : 48 photos, départ et arrivée de chaque exercice
- `vercel.json` : en-têtes de cache (le service worker n'est jamais mis en cache par le navigateur)

## Déployer sur Vercel

En ligne de commande, depuis ce dossier :

```bash
npx vercel --prod
```

Ou pousse le dossier sur un dépôt GitHub et importe-le dans Vercel avec le preset "Other", sans commande de build ni dossier de sortie.

## Installer sur le téléphone

- iPhone : ouvre l'URL dans Safari, bouton Partager, "Sur l'écran d'accueil".
- Android : ouvre l'URL dans Chrome, menu, "Installer l'application".

## Mettre à jour

Après une modification, change `VERSION` dans `sw.js` (par exemple `salle-v2`) puis redéploie. Sans ça, le téléphone garde l'ancienne version en cache.

## Modifier le programme

Les séances sont dans le tableau `S` de `index.html`. Chaque exercice : `n` nom, `s` séries, `r` répétitions, `rir` reps en réserve, `rest` repos en secondes, `cue` consigne, `alt` alternative, `d` nom des photos dans `img/`, `db: 1` pour un exercice aux haltères (cran de 2 kg au lieu de 2,5).

## Données

Charges, séries cochées et onglet courant sont stockés dans le `localStorage` du téléphone, sous la clé `salle`. Ils sont liés au domaine : si l'URL change, on repart de zéro.

## Crédits

- Photos : Free Exercise DB (https://github.com/yuhonas/free-exercise-db), domaine public (Unlicense).
- Icône : Tabler Icons, "barbell" (https://github.com/tabler/tabler-icons), licence MIT, Copyright (c) 2020-2026 Paweł Kuna.
- Polices : Barlow et Barlow Condensed, Google Fonts, licence OFL.
