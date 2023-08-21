// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateNewBoard } from "@/controllers/board.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
  } else if (req.method === "POST") {
    const { boardName } = req.body;
    try {
      const { boardUrl } = await generateNewBoard(boardName);
      res.status(200).json({ boardUrl: boardUrl });
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }
}
