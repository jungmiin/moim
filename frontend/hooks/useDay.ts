import { boardDataInterface, updatedDayRequestInterface } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUpdateMutate } from "./useApi";
import { copy } from "@/lib/copy";

const useUpdateDay = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const queryClient = useQueryClient();

  // Optimistic UI
  const onMutate = async (updatedDay: updatedDayRequestInterface) => {
    await queryClient.cancelQueries({ queryKey: ["board"] });
    const previousBoard = queryClient.getQueryData([
      "board",
    ]) as boardDataInterface;
    const newUsers = previousBoard.users.map((user) => {
      const tmpUser = { ...user };
      if (updatedDay.userId === tmpUser._id) {
        tmpUser.selectedDays = updatedDay.days;
      }
      return tmpUser;
    });
    queryClient.setQueryData(["board"], {
      ...previousBoard,
      users: newUsers,
    });
    return {
      previousBoard,
    };
  };

  const onError = (err: any, context: any) => {
    console.error(err.response.data.message);
    queryClient.setQueryData(["board"], context.previousBoard);
  };

  const onSettled = () => {
    queryClient.invalidateQueries({ queryKey: ["board"] });
  };

  return useUpdateMutate("/api/day", {
    onMutate,
    onError,
    onSettled,
    enabled: !!boardId,
  });
};

export { useUpdateDay };
