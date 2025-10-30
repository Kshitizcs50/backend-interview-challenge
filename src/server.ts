import express from "express";
import cors from "cors";
import { createTaskRouter } from "./routes/tasks";
import { createSyncRouter } from "./routes/sync";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/tasks", createTaskRouter());
app.use("/api", createSyncRouter());

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
