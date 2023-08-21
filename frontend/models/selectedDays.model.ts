import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

interface DayInterface {
  day: Date;
}

export const updateSelectedDays = async (
  boardObjectId: ObjectId,
  userObjectId: ObjectId,
  selectedDays: Array<DayInterface>
) => {
  const { client, database } = dbConnect();
  try {
    const boards = database.collection("boards");
    await boards.updateOne(
      { _id: boardObjectId },
      { $set: { "users.$[user].selectedDays": selectedDays } },
      {
        arrayFilters: [{ "user._id": userObjectId }],
      }
    );
  } catch (err) {
    throw new Error(err as any);
  } finally {
    console.log(
      `updateSelectedDays: {${boardObjectId}, ${userObjectId}, ${selectedDays}} is success.`
    );
  }
};
