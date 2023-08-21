// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addUser, deleteUser } from "@/controllers/user.controller";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { boardId, user } = req.body;
      const result = await addUser(boardId, user);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  } else if (req.method === "DELETE") {
    try {
      const { boardId, userId } = req.body;
      const result = await deleteUser(boardId, userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: (err as any).message });
    }
  }
}
