# GIMFiT

An iPhone-first gym equipment learning app built with Expo, React Native, and TypeScript

## Current features

- Six equipment entries with bundled photos and photo credits
- Search and category filters
- Equipment selection, exercise lists, and exercise details
- Dark interface with violet accents

The catalog uses local sample data and needs no account or API key. Camera recognition, saved workouts, and demonstration videos are not implemented yet. Exercise content is a prototype that needs review before publication.

## Run locally

From this repository folder:

```powershell
npm ci
npm start
```

Use an Expo Go version compatible with this project's Expo SDK 57. Keep your iPhone and computer on the same Wi-Fi, scan the terminal QR code with your iPhone Camera, and open it in Expo Go. Leave the terminal running during development. Windows cannot run the iOS Simulator.

## Project structure

- `App.tsx` starts the app and its providers
- `src/navigation/AppNavigator.tsx` connects the equipment and exercise screens
- `src/data/` contains the sample equipment and exercise catalog
- `src/screens/` contains the equipment list and exercise screens
- `src/components/EquipmentPhoto.tsx` displays equipment photos and credits
- `assets/equipment/credits.json` records photo sources and licenses
- `tests/catalog.test.mjs` checks catalog search and filtering

## Validation

```powershell
npm run typecheck
npm test
```

Optional iOS bundling check:

```powershell
npx expo export --platform ios
```

A successful export checks JavaScript bundling; it is not a signed iPhone build or a device test.

## Next steps

Add saved workouts, then build the photo capture and equipment identification flow. Add reviewed exercise guidance and licensed demonstrations.

## Photo licenses

Bundled equipment photos retain their individual licenses and attribution requirements, recorded in `assets/equipment/credits.json` and displayed in the app. The repository's code license does not replace these image licenses.
