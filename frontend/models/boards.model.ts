import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

interface BoardInterface {
  boardName: string;
  users: Array<null>;
  createdDate: Date;
}

export const insertBoard = async (newBoard: BoardInterface) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    const result = await boards.insertOne(newBoard);
    return result;
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(`insertBoard: {${newBoard}} is success.`);
  }
};

export const findBoardById = async (_id: ObjectId) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    const result = await boards.findOne(_id);
    return result;
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(`findBoardById: {${_id}} is success.`);
  }
};
