// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getBoard } from "@/controllers/board.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { boardId } = req.query;
    const result = await getBoard(boardId as string);
    res.status(200).json(result);
  }
}
