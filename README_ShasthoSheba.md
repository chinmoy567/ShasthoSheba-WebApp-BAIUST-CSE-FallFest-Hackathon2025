# ShasthoSheba WebApp

A healthcare web application built using **Node.js**, **Express**, **MongoDB**, and **EJS** with **TailwindCSS** for front-end styling. The app provides user authentication, health symptom tracking, AI-assisted chat, and dashboard functionalities.

---

## 🚀 Features

- User authentication and session management
- Symptom check and AI-based chat assistance
- User profile and dashboard management
- MongoDB Atlas integration
- Secure session handling with `express-session` and `connect-mongo`
- TailwindCSS for responsive UI styling
- Modular routing structure for maintainability

---

## 🏗️ Project Structure

```
├── routes/
│   ├── authRouter.js
│   ├── profileRouter.js
│   ├── storeRouter.js
│   ├── dashboardRouter.js
│   ├── checkinRouter.js
│   ├── chatRouter.js
│   └── symptomRouter.js
├── views/                # EJS templates
├── public/               # Static assets and Tailwind output
├── .env                  # Environment variables (ignored in Git)
├── .gitignore
├── package.json
├── server.js             # Main Express server
└── tailwind.config.js
```

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/ShasthoSheba-WebApp.git
cd ShasthoSheba-WebApp
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Create an `.env` File**
Create a `.env` file in the root directory and add:
```bash
SERVER_PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ShasthoSheba?retryWrites=true&w=majority
NODE_ENV=development
SESSION_SECRET=<your_session_secret>
OPENAI_API_KEY=<your_openai_api_key>
```

### **4. Build TailwindCSS**
```bash
npm run build:css
```
To watch and auto-compile during development:
```bash
npm run watch:css
```

### **5. Start the Server**
```bash
npm run dev
```
The app will run at:
```
http://localhost:3000
```

---

## 🧩 Environment Configuration

| Variable | Description |
|-----------|-------------|
| `SERVER_PORT` | The port where the server runs |
| `MONGO_URI` | MongoDB Atlas connection string |
| `NODE_ENV` | Set to `development` or `production` |
| `SESSION_SECRET` | Secret key for session encryption |
| `OPENAI_API_KEY` | API key for OpenAI integration |

---

## 📦 Available NPM Scripts

| Script | Description |
|---------|-------------|
| `npm run build:css` | Builds Tailwind CSS assets |
| `npm run watch:css` | Watches for CSS changes |
| `npm run start:server` | Starts the Express server |
| `npm run dev` | Runs CSS watcher and server in parallel |

---

## 🧠 API Endpoints (Main Routes)

### **/auth**
Handles user authentication (login, signup, logout).

**Example**:
```
POST /auth/signup
POST /auth/login
GET /auth/logout
```

### **/dashboard**
Main user dashboard with protected routes.

**Example**:
```
GET /dashboard
```

### **/dashboard/symptom**
AI-assisted symptom analysis and health suggestions.

**Example**:
```
POST /dashboard/symptom/analyze
```
**Body**:
```json
{
  "symptoms": ["fever", "cough", "fatigue"]
}
```

### **/dashboard/chat**
Chat interface with OpenAI integration for health support.

**Example**:
```
POST /dashboard/chat
```
**Body**:
```json
{
  "message": "What should I do if I have a sore throat?"
}
```

### **/profile**
User profile details and update functionality.

**Example**:
```
GET /profile
POST /profile/update
```

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Backend** | Node.js, Express |
| **Database** | MongoDB Atlas |
| **Templating Engine** | EJS |
| **CSS Framework** | TailwindCSS |
| **AI Integration** | OpenAI API |
| **Session Management** | express-session, connect-mongo |

---

## 🛡️ Security Notes

- Never commit `.env` to GitHub.
- Regenerate your `OPENAI_API_KEY` if exposed.
- Use environment variables for sensitive data.
- Use HTTPS in production.

---

## 🧑‍💻 Author
**Chinmoy Sarkar**  
📧 [chinmoy6667@gmail.com](mailto:chinmoy6667@gmail.com)

---

## 📜 License
This project is licensed under the **ISC License**.

---

## 🩺 Future Improvements
- Add admin panel for user management.
- Integrate email notifications via Nodemailer.
- Include health history analytics.
- Add AI-powered personalized recommendations.

---
