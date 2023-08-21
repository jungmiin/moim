// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { updateDay } from "@/controllers/day.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { boardId, userId, days } = req.body;
      const result = await updateDay(boardId, userId, days);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }
}
