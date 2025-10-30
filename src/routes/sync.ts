import { Router, Request, Response } from "express";

export function createSyncRouter(): Router {
  const router = Router();

  router.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date() });
  });

  router.post("/sync", async (_req: Request, res: Response) => {
    res.json({ message: "Sync triggered successfully" });
  });

  return router;
}
