# 🎼 CantusApp

Web-App zur Verwaltung von Chornoten, Mitgliedern und Proben – mit Rollen (Mitglied / Vorstand) und Supabase-Backend.

---

## 🚀 Features

* 🔐 Login mit Supabase Auth
* 👤 Rollen: Mitglied & Vorstand
* 📄 Noten anzeigen (PDF Viewer)
* 📂 Notenliste aus Supabase Storage
* 🎨 UI mit Tailwind CSS
* 🌐 Deploybar über Netlify

---

## 🧱 Projektstruktur

```
public/
  index.html
  login.html
  profile.html
  scores.html

  js/
    supabase.js
    auth.js
    api.js
    roles.js
    profile.js
    ui-scores.js

  css/
    style.css
```

---

## ⚙️ Setup

### 1. Supabase Projekt erstellen

👉 https://supabase.com

Erstelle:

* Auth (Email/Password)
* Tabelle: `profiles`

```
id (uuid, PK)
role (text) → "member" | "board"
```

---

### 2. Supabase Config eintragen

In `public/js/supabase.js`:

```js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_ANON_KEY"
);
```

---

### 3. Storage Bucket

Erstelle Bucket:

```
scores
```

→ Hier werden PDFs gespeichert

---

### 4. Start lokal

Einfach öffnen:

```
public/index.html
```

(oder mit Live Server)

---

## 🌐 Deployment

Empfohlen:

* Netlify

### Schritte:

1. GitHub Repo erstellen
2. Code pushen
3. Netlify → „Import from Git“
4. Einstellungen:

```
Publish directory: public
Build command: (leer)
```

---

## 🔐 Rollen-System

* `member` → kann Noten sehen
* `board` → kann zusätzlich verwalten (z. B. Upload)

Rollen werden in `profiles` gespeichert.

---

## 🧠 Architektur

```
Frontend (HTML + JS + Tailwind)
        ↓
Supabase (Auth + DB + Storage)
```

---

## 📌 Wichtige Hinweise

* Alle JS-Dateien werden als ES Modules geladen:

```
<script type="module" src="/js/main.js"></script>
```

* Keine mehrfachen `<script>` Tags verwenden
* Imports nur innerhalb von JS-Dateien

---

## 🛠️ Nächste Schritte

* [ ] Upload für Vorstand
* [ ] Mitgliederverwaltung
* [ ] Rollenbasierte UI
* [ ] Kalender für Proben
* [ ] PWA (installierbar)

---

## 📄 Lizenz

Private Nutzung / Projektarbeit
