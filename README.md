# VisionaryVault 🌟

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Create React App](https://img.shields.io/badge/Create_React_App-09D3AC?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## 🌐 Live Demo

**[progress-blog-dab20.web.app](https://progress-blog-dab20.web.app/)**

---

## 📌 Overview

VisionaryVault is an **all-in-one productivity workspace** that unifies task management, note-taking, and movie tracking into a single seamless platform.

Built with **React, Tailwind CSS, and Firebase**, it delivers real-time data sync, secure authentication, and a clean responsive interface — so everything you need to track is in one place.

---

## ✨ Features

### 📝 Tasks
- Create, edit, and delete tasks
- Mark tasks as complete
- Organized task views for daily productivity

### 🗒️ Notes
- Rich note-taking with instant save
- Real-time sync via Firebase Firestore

### 🎥 Movie Library
- Add and organize movies to watch
- Mark movies as watched
- Personal movie tracker in one click

### 🔐 Authentication
- Secure Email & Password login via Firebase Auth
- Protected routes — your data stays private

### 📱 Responsive Design
- Fully optimized for mobile and desktop
- Smooth modals, transitions, and dynamic UI rendering

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js + Vite |
| Styling | Tailwind CSS |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| Deployment | Firebase Hosting |

---

## 📁 Project Structure

```
VisionaryVault/
├── src/
│   ├── components/     # Reusable UI components (Modals, Cards, Navbar)
│   ├── utils/          # Tasks, Notes, Movies pages
│   ├── context/        # Custom React hooks
│   └── config/         # Firebase config & Firestore helpers
├── public/
├── index.html
├── tailwind.config.js
└── package.json
```

---

## 🏗️ Setup & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/tirumalateja19/VisionaryVault.git
cd visionaryvault
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the root:
```ini
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the development server
```bash
npm run dev
```

App runs at: `http://localhost:5173/`

## 📢 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

*Built with React + Firebase by [Tirumala Teja Jampani](https://www.linkedin.com/in/tirumalateja19/)*
