const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/interest", (req, res) => {
  const { name, email, selectedStep } = req.body;

  if (!name || !email || !selectedStep) {
    return res.status(400).json({ error: "Missing required fields: name, email, or selectedStep" });
  }

  // Simulate storing data and some server processing time
  console.log(`Received interest from ${name} (${email}) for step: ${selectedStep}`);

  setTimeout(() => {
    res.status(200).json({ success: true, message: "Interest recorded successfully." });
  }, 1000); 
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the Express app for Vercel Serverless Functions
module.exports = app;
