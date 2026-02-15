# Abishek_Portfolio_Back-End


This is the **backend server** for my personal portfolio project. It handles **contact form submissions**, stores them in **MongoDB**, and sends **auto-reply emails**. Built with **Node.js, Express, and MongoDB**.

---

## 📖 Description

This backend supports the portfolio frontend by:

* Receiving contact form submissions.
* Storing submissions in a MongoDB database.
* Sending auto-reply emails to users.
* Managing submissions with **CRUD operations**:

  * Get all submissions
  * Delete a submission
  * Mark a submission as read
* Validates user input for security and reliability.

---

## ⚡ Features

* RESTful API using **Express.js**
* MongoDB for persistent storage
* Email service for auto-replies
* Input validation with **express-validator**
* SweetAlert2 (frontend integration) for confirmation UI

---

## 📝 Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* Nodemailer (for email service)
* dotenv (for environment variables)
* express-validator (for validation)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AbishekSathiyan/Abishek_Portfolio_Back-End.git
cd portfolio-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

> Make sure your MongoDB user has proper read/write permissions.

### 4️⃣ Run the server

```bash
node index.js
```

The server will start at `http://localhost:5000`

---

## 📂 Folder Structure

```
backend/
├── controllers/
│   └── contactController.js
├── models/
│   └── Contact.js
├── routes/
│   └── contactRoutes.js
├── utils/
│   └── emailService.js
├── index.js
├── package.json
└── .env
```

---

## 🔗 API Endpoints

| Method | Endpoint              | Description                 | Body / Params                                |
| ------ | --------------------- | --------------------------- | -------------------------------------------- |
| POST   | `/api/contact/submit` | Submit a contact form       | `{ name, email, contact, subject, message }` |
| GET    | `/api/contact/all`    | Get all contact submissions | None                                         |
| PATCH  | `/api/contact/:id`    | Mark submission as read     | `{ isRead: true, updatedAt }`                |
| DELETE | `/api/contact/:id`    | Delete a submission         | None                                         |

---

## 💡 Notes

* Input is validated for **name, email, phone number, subject, and message**.
* Auto-reply email contains useful links like **Portfolio, GitHub, LinkedIn**.
* Always keep `.env` secrets safe; **do not push `.env` to GitHub**.

---

## 👨‍💻 Author

**Abishek Sathiyan**
[GitHub](https://github.com/AbishekSathiyan) | [Portfolio](https://abishek-portfolio-front-end.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/abishek04/)

---.

Do you want me to create that enhanced README?
