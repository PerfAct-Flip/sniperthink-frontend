import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Handling both variants to be safe with Vercel routing/rewrites
const handleInterest = (req, res) => {
  try {
    const { name, email, selectedStep } = req.body;

    if (!name || !email || !selectedStep) {
      return res.status(400).json({ error: "Missing required fields: name, email, or selectedStep" });
    }

    console.log(`Received interest from ${name} (${email}) for step: ${selectedStep}`);

    // Simulation delay
    setTimeout(() => {
      res.status(200).json({ success: true, message: "Interest recorded successfully." });
    }, 500);
  } catch (error) {
    console.error("Error in /api/interest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.post("/api/interest", handleInterest);
app.post("/interest", handleInterest);

// Catch-all for debugging routing issues
app.use((req, res) => {
  console.log(`404: Not Found - ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: "Not Found", 
    path: req.url,
    method: req.method 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the Express app for Vercel Serverless Functions
export default app;
