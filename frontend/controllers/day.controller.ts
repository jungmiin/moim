import { findBoardById } from "@/models/boards.model";
import { updateSelectedDays } from "@/models/selectedDays.model";
import { ObjectId } from "mongodb";

interface DayInterface {
  day: Date;
}

export const updateDay = async (
  boardId: string,
  userId: string,
  days: Array<DayInterface>
) => {
  try {
    const boardObjectId = new ObjectId(boardId);
    const userObjectId = new ObjectId(userId);
    await updateSelectedDays(boardObjectId, userObjectId, days);
    const result = await findBoardById(boardObjectId);
    return result;
  } catch (err) {
    throw new Error(err as any);
  }
};
