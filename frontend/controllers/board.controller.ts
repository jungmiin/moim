import { insertBoard, findBoardById } from "../models/boards.model";
import { ObjectId } from "mongodb";

export const generateNewBoard = async (boardName: string) => {
  // TODO - boardName 제약조건 확인하기
  const newBoard = {
    boardName: boardName,
    users: [],
    createdDate: new Date(),
  };
  try {
    const result = await insertBoard(newBoard);
    return { boardUrl: result.insertedId.toString() };
  } catch (err) {
    throw new Error(err as any);
  }
};

export const getBoard = async (boardId: string) => {
  try {
    console.log(boardId);
    const result = await findBoardById(new ObjectId(boardId));
    return result;
  } catch (err) {
    throw new Error(err as any);
  }
};
