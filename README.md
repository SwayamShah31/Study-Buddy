# Study Buddy AI

Study Buddy AI is a modern web application that leverages generative AI to help students learn and teachers create question papers. It features interactive dashboards, YouTube integration, PDF generation, and a beautiful, responsive UI.

## 🚀 Features
- **Student Dashboard:**
  - Enter any topic to get an AI-generated explanation
  - Get top YouTube video links for further learning
- **Teacher Dashboard:**
  - Generate detailed question papers (PDF) with AI
  - Customize paper type, question type, and topic
- **Remove Asterisks Tool:**
  - Clean up text by removing asterisks (for testing)
- **Theme Toggle:**
  - Switch between light and dark mode
- **Dashboard Switch:**
  - Easily switch between student and teacher views
- **Modern UI:**
  - Responsive, mobile-friendly, and visually appealing

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI:** Google Gemini API (via @google/generative-ai)
- **PDF Generation:** PDFKit
- **Other:** Multer (file uploads), Axios, YouTube Data API

## 📂 Project Structure
```
gemini-ai/
├── public/
│   ├── student.html      # Student dashboard
│   ├── teacher.html      # Teacher dashboard
│   ├── remove.html       # Remove asterisks tool
│   ├── style.css         # Styles
│   ├── theme.js          # Theme toggle
│   ├── switch.js         # Dashboard switch
│   └── assets/           # Logos and icons
├── uploads/              # Uploaded/generated files
├── server.js             # Express backend & API routes
├── package.json          # Dependencies & scripts
└── README.md             # This file
```

## ⚡ Setup & Usage
1. **Clone this repository**
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root with your API keys:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_data_api_key
   ```
4. Start the server:
   ```sh
   npm start
   ```
5. Open `http://localhost:3000/student.html` or `teacher.html` in your browser

## ✨ Customization
- Edit `public/style.css` for styles
- Update HTML files for content
- Add your own logo in `public/assets/`

## 📫 Contact
- Email: swayam.shah744@gmail.com
- [LinkedIn](https://www.linkedin.com/in/swayam-shah-944887284)
- [GitHub](https://github.com/SwayamShah31)

---

> Built with ❤️ by Swayam Shah 