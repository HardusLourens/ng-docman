# 📝 DocClone - Collaborative Document Editor

A full-stack Google Docs clone built with Angular 17 and Node.js, featuring real-time collaboration, AI-powered assistance, and secure authentication.

![Angular](https://img.shields.io/badge/Angular-17.3-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-black?style=flat-square&logo=socket.io)

## ✨ Features

- **Real-time Collaboration** - Multiple users can edit documents simultaneously using WebSocket connections
- **AI Assistant** - Integrated OpenAI-powered assistant for writing suggestions and content generation
- **User Authentication** - Secure JWT-based authentication with Firebase integration
- **File Management** - Create, edit, delete, and organize documents
- **User Management** - Admin dashboard for managing users
- **State Management** - Built with NgRx for predictable state management
- **Material Design** - Modern UI using Angular Material components
- **Responsive Design** - Works seamlessly across desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **Framework**: Angular 17.3
- **State Management**: NgRx (Store, Effects, DevTools)
- **UI Components**: Angular Material & CDK
- **Styling**: SCSS
- **Authentication**: Firebase Auth
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js with Express
- **Database**: Prisma ORM
- **Real-time**: Socket.io Server
- **Authentication**: JWT + bcrypt
- **AI Integration**: OpenAI API
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17.3 or higher)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/doc-clone.git
cd doc-clone
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret_key"
OPENAI_API_KEY="your_openai_api_key"
PORT=3000
```

Create Firebase configuration in `src/environments/`:
- `environment.ts` (development)
- `environment.prod.ts` (production)

5. **Set up the database**
```bash
cd backend
npx prisma generate
npx prisma db push
```

## 🏃‍♂️ Running the Application

### Development Mode (Frontend + Backend)
```bash
npm start
```
This runs both frontend and backend concurrently:
- Frontend: http://localhost:4200
- Backend: http://localhost:3000

### Run Frontend Only
```bash
npm run dev:frontend
```

### Run Backend Only
```bash
npm run dev:backend
```

## 🏗️ Building for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
doc-clone/
├── src/                          # Frontend source files
│   ├── app/
│   │   ├── auth/                 # Authentication module
│   │   ├── components/
│   │   │   ├── ai-assistant/     # AI writing assistant
│   │   │   ├── dashboard/        # Main document editor
│   │   │   ├── file-manager/     # File management
│   │   │   ├── login/            # Login component
│   │   │   └── user-list/        # User management
│   │   ├── services/             # Angular services
│   │   └── app.config.ts         # App configuration
│   ├── environments/             # Environment configs
│   └── styles.scss               # Global styles
├── backend/                      # Backend source files
│   ├── src/
│   │   ├── server.ts             # Express server setup
│   │   ├── aiService.ts          # OpenAI integration
│   │   └── userRoutes.ts         # User API routes
│   ├── prisma/                   # Database schema & migrations
│   └── package.json
├── angular.json                  # Angular configuration
└── package.json                  # Frontend dependencies
```

## 🧪 Running Tests

```bash
npm test
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/YOUR_PROFILE)

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io/)
- UI components from [Angular Material](https://material.angular.io/)
- Real-time functionality powered by [Socket.io](https://socket.io/)
- AI features powered by [OpenAI](https://openai.com/)

## 📸 Screenshots

<!-- Add screenshots of your application here -->

---

Made with ❤️ using Angular and Node.js
