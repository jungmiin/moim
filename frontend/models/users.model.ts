import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

interface UserInterface {
  _id: ObjectId;
  userName: string;
  userColor: string;
  selectedDays: Array<null>;
}

export const findUsersById = async (boardObjectId: ObjectId) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    const result = await boards.findOne(boardObjectId);
    if (result) return result.users;
    else throw new Error("Result is Empty");
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(`findUsersById: {${boardObjectId}} is success.`);
  }
};

export const updatePushUser = async (
  boardObjectId: ObjectId,
  newUser: UserInterface
) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    const result = await boards.updateOne(
      { _id: boardObjectId },
      { $push: { users: newUser } }
    );
    return result;
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(`updatePushUser: {${boardObjectId}, ${newUser}} is success.`);
  }
};

export const updatePullUser = async (
  boardObjectId: ObjectId,
  userObjectId: ObjectId
) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    const result = await boards.updateOne(
      { _id: boardObjectId },
      { $pull: { users: { _id: userObjectId } } }
    );
    return result;
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(
      `updatePullUser: {${boardObjectId}, ${userObjectId}} is success.`
    );
    //client.close();
  }
};
