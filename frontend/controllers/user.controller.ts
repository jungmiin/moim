import { findBoardById } from "@/models/boards.model";
import {
  findUsersById,
  updatePushUser,
  updatePullUser,
} from "@/models/users.model";
import { ObjectId } from "mongodb";

interface UserInterface {
  userName: string;
  userColor: string;
}

export const addUser = async (boardId: string, user: UserInterface) => {
  try {
    const boardObjectId = new ObjectId(boardId);
    const newUser = {
      _id: new ObjectId(),
      userName: user.userName,
      userColor: user.userColor,
      selectedDays: [],
    };
    await updatePushUser(boardObjectId, newUser);
    const result = await findBoardById(boardObjectId);
    return result;
  } catch (err) {
    throw new Error(err as any);
  }
};

export const deleteUser = async (boardId: string, userId: string) => {
  try {
    const boardObjectId = new ObjectId(boardId);
    const userObjectId = new ObjectId(userId);
    await updatePullUser(boardObjectId, userObjectId);
    const result = await findBoardById(boardObjectId);
    return result;
  } catch (err) {
    throw new Error(err as any);
  }
};
