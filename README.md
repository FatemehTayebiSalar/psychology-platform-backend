# Psychology Platform Backend

This project is the **backend of a psychology services platform** designed to connect psychologists and clients, manage consultations, workshops, and multimedia content such as podcasts and videos.

---

## 🚀 Features

- **User Authentication & Role Management**
  - Three user roles: *Admin*, *Psychologist*, *Client*
  - JWT-based authentication and authorization

- **Psychologist Management**
  - Psychologists can register, submit credentials, and manage available sessions
  - Admin approves psychologist applications

- **Appointment Booking**
  - Clients can book consultation sessions from psychologists’ available times

- **Workshops & Events**
  - Users can view, register for, and manage psychology-related events

- **Podcasts & Videos**
  - Multimedia content management with categories, episodes, and playback support

- **Admin Panel**
  - Content management, user management, and system control

- **API Documentation**
  - Swagger documentation is split across route-specific files
  - Accessible once the server is running

---

## 🧠 Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **API Documentation:** Swagger  
- **Authentication:** JWT (JSON Web Tokens)  
- **Architecture:** MVC Pattern  
- **Version Control:** Git, GitHub  
- **Frontend (client-side):** React.js *(separate project)*

---

## ⚙️ Installation (for future reference)

> **Note:** The server requires MongoDB and a `.env` file with necessary variables. This section is for reference; project can be explored on GitHub without running.

```bash
# Clone the repository
git clone https://github.com/FatemehTayebiSalar/psychology-platform-backend.git

# Navigate to the project folder
cd psychology-platform-backend

# Install dependencies
npm install

# Create your .env file (see .env.example)
# Update variables like MONGO_URI, APPLICATION_PORT, JWT_SECRET

# Start the server
npm start
