# 🌐 Rural Health Connect (Multi-Portal React System)

A digital healthcare ecosystem designed for rural areas, built as a **multi-portal React application** using React.js, CSS, and modern web technologies. The project consists of three interconnected portals: **Patient Portal**, **PHC Hub**, and **Doctor Portal**. Together, they enable patient registration, AI-powered health monitoring, teleconsultation, PHC management, and doctor consultations with digital prescriptions.

---

## 📁 Features

### 🧑‍🤝‍🧑 Patient Portal
- ➕ Aadhaar-based patient registration with medical history  
- 📊 Health data entry (BP, sugar, oxygen, vitals)  
- 🤖 AI-powered risk analysis & alerts  
- 📹 Teleconsultation with doctors (video + chat)  
- 📄 Personal health dashboard  

### 🏥 PHC Hub
- 👥 Manage patients with search, filters, and risk levels  
- 🚑 Real-time emergency alerts with ambulance dispatch  
- 📊 Analytics on diseases & village-wise distribution  
- 📦 Medicine & resource inventory tracking  
- 📅 Staff schedules and outreach program management  

### 👨‍⚕️ Doctor Portal
- 📹 Active teleconsultations with video, audio & chat  
- ❤️ Real-time patient vitals and symptom tracking  
- 💬 Patient communication panel  
- 🧾 Digital prescription system with medicine database  
- 📋 Patient queue & priority consultation handling  

---

## 🛠️ Technologies Used
- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)  
- **Build Tool:** Vite.js for fast development and building
- **Styling:** CSS Modules / Custom CSS with responsive design  
- **State Management:** React Hooks (useState, useEffect)
- **Database:** MongoDB integration for data persistence
- **Concepts Used:** Component-based architecture, React Router, form handling, state management, mock AI analysis  

---

## 📂 Folder Structure

```
RURAL_HEALTH_CONNECT/
├── node_modules/              # Dependencies
├── public/                    # Static assets
├── src/                       # Source code
│   ├── assets/               # Images, icons, static files
│   ├── App.css               # Main app styling
│   ├── App.jsx               # Main app component
│   ├── doctor_portal.css     # Doctor portal styles
│   ├── doctor_portal.jsx     # Doctor portal component
│   ├── index.css             # Global styles
│   ├── main.jsx              # App entry point
│   ├── nodejs_to_mongodb.js  # Database connection
│   ├── phc_hub.css           # PHC Hub styles
│   ├── phc_hub.jsx           # PHC Hub component
│   ├── rural_health_connect.css # Patient portal styles
│   ├── rural_health_connect.jsx # Patient portal component
│   └── test.css              # Test styles
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package-lock.json         # Dependency lock file
├── package.json              # Project dependencies & scripts
├── README.md                 # Project documentation
└── vite.config.js            # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (for database functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RURAL_HEALTH_CONNECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running on your system
   - Update connection settings in `src/nodejs_to_mongodb.js` if needed

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm run dev`** - Runs the app in development mode
- **`npm run build`** - Builds the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint for code quality checks

---

## 🏗️ Architecture

The application follows a **component-based architecture** with three main portal components:

- **`App.jsx`** - Main application component with routing logic
- **`rural_health_connect.jsx`** - Patient Portal component
- **`phc_hub.jsx`** - PHC Hub management component  
- **`doctor_portal.jsx`** - Doctor consultation component
- **`nodejs_to_mongodb.js`** - Database integration layer

Each portal maintains its own state and styling, while sharing common utilities and database connections.

---

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building. Configuration can be found in `vite.config.js`.

### ESLint Configuration  
Code quality is maintained using ESLint. Settings are in `eslint.config.js`.

### Database Configuration
MongoDB connection settings can be modified in `src/nodejs_to_mongodb.js`.

---

## 🌟 Key React Features Used

- **Function Components** with Hooks
- **useState** for local state management
- **useEffect** for lifecycle management  
- **Component composition** for reusable UI elements
- **Conditional rendering** for dynamic content
- **Event handling** for user interactions
- **Form management** with controlled components

---

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The build files will be generated in the `dist/` directory, ready for deployment to any static hosting service.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for Rural Healthcare**