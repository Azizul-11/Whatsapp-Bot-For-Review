## WhatsApp Product Review App (MERN + Twilio)

This is a simple WhatsApp-based product review application.  
Users can send a message on WhatsApp, and the bot will ask 3 questions:

1. What is your name?  
2. Which product are you reviewing?  
3. What is your review?

After answering all questions, the review is saved in MongoDB and can be viewed on the frontend.


## Features

- WhatsApp chatbot using Twilio Sandbox  
- Step-by-step conversational flow  
- Saves reviews to MongoDB  
- MERN stack (MongoDB, Express, React, Node)  
- Ngrok used to expose local backend  
- Simple frontend to display all reviews  



## Technologies Used

- Node.js + Express  
- MongoDB + Mongoose  
- Twilio WhatsApp Sandbox  
- Ngrok  
- React + Vite  
- Tailwind CSS  



## How It Works

1. User sends “hi” to the Twilio Sandbox number  
2. Bot asks for name  
3. Bot asks for product  
4. Bot asks for review  
5. Bot saves the review to MongoDB  
6. Bot replies:  
   **“Thanks! Your review is saved 👍”**

---

## 📁 Folder Structure

backend/
server.js
routes/whatsapp.js
models/Review.js
utils/conversationState.js

frontend
src

Services/api.js
Components/ReviewTable.jsx
---

## 🛠 Setup Instructions

### 1. Clone the project
```sh
git clone <repo_url>
Install backend dependencies
cd backend
npm install
npm run dev

Install frontend dependencies
cd ../frontend
npm install
npm run dev

Start Ngrok
ngrok http 5000

Add Ngrok URL to Twilio Sandbox

Example:

https://your-ngrok-url/webhook/whatsapp


Twilio Sandbox Setup

Go to Twilio → Messaging → WhatsApp Sandbox

Join using the code (Example: join army-enough)

Set webhook URL

Send "hi" on WhatsApp to start the conversation








