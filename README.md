# Rural Health Connect - Multi-Portal React System

A digital healthcare ecosystem built for rural areas, structured as a multi-portal React application. The project has three interconnected portals — Patient Portal, PHC Hub, and Doctor Portal — covering patient registration, AI-assisted health monitoring, teleconsultation, PHC management, and doctor consultations with digital prescriptions.

---

## Features

### Patient Portal
- Aadhaar-based patient registration with medical history
- Health data entry for vitals like BP, sugar, and oxygen levels
- AI-powered risk analysis and alerts
- Teleconsultation with doctors via video and chat
- Personal health dashboard

### PHC Hub
- Patient management with search, filters, and risk-level tagging
- Real-time emergency alerts with ambulance dispatch
- Analytics on disease distribution and village-wise breakdowns
- Medicine and resource inventory tracking
- Staff schedules and outreach program management

### Doctor Portal
- Active teleconsultations with video, audio, and chat
- Real-time patient vitals and symptom tracking
- Patient communication panel
- Digital prescription system with a medicine database
- Patient queue and priority consultation handling

---

## Technologies Used

- React.js, HTML5, CSS3, JavaScript (ES6+)
- Vite.js for development and building
- CSS Modules and custom CSS for responsive design
- React Hooks (useState, useEffect) for state management
- MongoDB for data persistence
- React Router for client-side routing

---

## Folder Structure

```
RURAL_HEALTH_CONNECT/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── doctor_portal.css
│   ├── doctor_portal.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── nodejs_to_mongodb.js
│   ├── phc_hub.css
│   ├── phc_hub.jsx
│   ├── rural_health_connect.css
│   ├── rural_health_connect.jsx
│   └── test.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## Getting Started

**Prerequisites:** Node.js v14 or higher, npm or yarn, and MongoDB running locally or via a cloud instance.

```bash
git clone <repository-url>
cd RURAL_HEALTH_CONNECT
npm install
```

Update the MongoDB connection string in `src/nodejs_to_mongodb.js` if needed, then start the dev server:

```bash
npm run dev
```

Navigate to `http://localhost:5173` (or whichever port Vite picks).

---

## Available Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

---

## Architecture

Each portal is a self-contained component with its own state and styles. They share the same MongoDB connection layer and are stitched together through `App.jsx`.

- `App.jsx` — root component with routing logic
- `rural_health_connect.jsx` — Patient Portal
- `phc_hub.jsx` — PHC Hub
- `doctor_portal.jsx` — Doctor Portal
- `nodejs_to_mongodb.js` — database integration

---

## Configuration

**Vite** — `vite.config.js`

**ESLint** — `eslint.config.js`

**MongoDB** — connection settings in `src/nodejs_to_mongodb.js`

---

## Deployment

```bash
npm run build
```

Output goes to the `dist/` directory, ready for any static hosting service. Note that the MongoDB backend will need to be hosted separately and the connection string updated accordingly before deploying.

---

## Note

The `nodejs_to_mongodb.js` file sitting inside `src/` is a bit of an odd placement — that file is a backend concern and doesn't really belong in the frontend source tree. If the project ever gets split into separate client and server folders, this will need to move. For now just be aware that it lives there and anyone new to the codebase might find it confusing.

The AI risk analysis is currently mocked. If there are plans to hook it up to a real model or a proper scoring algorithm before launch, that work hasn't started yet — mark it clearly in the code so it doesn't accidentally ship as if it were real analysis.

---

## Note to Self

The `test.css` file in `src/` looks like it was left over from early development. Check if anything actually imports it before deleting, but it's almost certainly dead weight.

Also, the three portals are currently all bundled into one Vite app. If the user base grows or the portals need separate access control, this will get messy fast. Worth thinking about whether to split them into separate deployments or at least separate routes with proper auth guards — right now anyone who knows the URL can access any portal.

---

## License

MIT License — see the LICENSE file for details.
