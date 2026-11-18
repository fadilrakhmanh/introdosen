# Agent Sigma / The Core — Mission Briefing

Website story-experience untuk PKKMB: transmisi rusak dari Agent Sigma yang
hilang, dan misi mahasiswa baru untuk menemukan The Core.

## Struktur

```
src/
├── components/
│   ├── BackgroundFX.jsx        (grid, partikel, vignette latar)
│   ├── MissionBriefing.jsx     (layar pembuka: log cerita bertahap)
│   └── OperationLaunched.jsx   (placeholder penutup — babak berikutnya)
├── data/
│   └── lecturers.js            (data dosen — belum dipakai di UI manapun,
│                                 disiapkan untuk babak berikutnya)
├── App.jsx
├── main.jsx
└── index.css
```

## Menjalankan

```bash
npm install
npm run dev
```

## Alur saat ini

Buka web → **Mission Briefing** (4 log cerita muncul bertahap) → klik
"BUKA MARKAS INVESTIGASI" → layar **"MARKAS INVESTIGASI TERBUKA"** (placeholder).

Babak selanjutnya (conspiracy board, petunjuk, dsb.) menyusul setelah
detail ceritanya ditentukan.

## Build produksi

```bash
npm run build
```
