import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import PDFDocument from 'pdfkit';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// 📚 STUDENT: Get explanation & YouTube videos
app.post('/student/ask', async (req, res) => {
  try {
    const { topic } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(`Explain the topic for a student:\n\n${topic}`);
    let explanation = result.response.candidates[0].content.parts[0].text;

    // ✅ Remove all * from explanation
    explanation = explanation.replace(/\*/g, '');

    // ✅ YouTube Search
    const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: topic,
        part: 'snippet',
        type: 'video',
        maxResults: 3
      }
    });

    const youtubeLinks = ytRes.data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.json({ explanation, youtubeLinks });
  } catch (err) {
    console.error('Error in /student/ask:', err);
    res.status(500).json({ error: 'Something went wrong. Please check your API keys and try again.' });
  }
});

// 🎓 TEACHER: Generate question paper PDF
app.post('/teacher/generate', upload.none(), async (req, res) => {
  try {
    const { paperType, questionType, details } = req.body;

    const prompt = `
      Generate a detailed question paper for teachers with:
      - Paper Type: ${paperType}
      - Question Type: ${questionType}
      - Topic/Details: ${details}
      - Include 5 sections: 1 mark, 2 marks, 3 marks, 4 marks, 5 marks.
      - Each section should have 20 unique questions.
      - Format it cleanly.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    let questionsText = result.response.candidates[0].content.parts[0].text;

    // ✅ Remove all * from questions text too
    questionsText = questionsText.replace(/\*/g, '');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=question-paper.pdf');

    doc.pipe(res);
    doc.fontSize(16).text(`Question Paper`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(questionsText);
    doc.end();
  } catch (err) {
    console.error('Error in /teacher/generate:', err);
    res.status(500).json({ error: 'Failed to generate question paper. Please check your prompt and API key.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
