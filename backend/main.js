const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const cors = require('cors'); // Import the cors package
const express = require('express');
const bodyParser = require('body-parser'); // Correct name
const app = express();

app.use(express.json());
app.use(bodyParser.json()); // Use the correct bodyParser
app.use(cors()); // Use the CORS middleware

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.log(err);
    throw err; // Rethrow error to be handled in the route
  }
};

app.get('/', (req, res) => {
  res.send("Mitr AI");
});

app.post('/api/content', async (req, res) => { // Changed to POST
  try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({
      "result": result
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
