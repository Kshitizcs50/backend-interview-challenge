import { Router, Request, Response } from "express";

export function createTaskRouter(): Router {
  const router = Router();

  router.get("/", async (_req: Request, res: Response) => {
    return res.json([]); // placeholde
  });

  router.get("/:id", async (_req: Request, res: Response) => {
    return res.status(501).json({ error: "Not implemented" });
  });

  router.post("/", async (_req: Request, res: Response) => {
    return res.status(501).json({ error: "Not implemented" });
  });

  router.put("/:id", async (_req: Request, res: Response) => {
    return res.status(501).json({ error: "Not implemented" });
  });

  router.delete("/:id", async (_req: Request, res: Response) => {
    return res.status(501).json({ error: "Not implemented" });
  });

  return router;
}
