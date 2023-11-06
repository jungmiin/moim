import {
  boardDataInterface,
  deletedUserInterface,
  addedUserRequestInterface,
  userInterface,
} from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDeleteMutate, useUpdateMutate } from "./useApi";

const useAddUser = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const queryClient = useQueryClient();

  // Optimistic UI
  const onMutate = async (addedUser: addedUserRequestInterface) => {
    await queryClient.cancelQueries({ queryKey: ["board"] });
    const previousBoard = queryClient.getQueryData([
      "board",
    ]) as boardDataInterface;
    const newUser = previousBoard.users.concat([
      { _id: addedUser.user.userName, ...addedUser.user, selectedDays: [] },
    ]);
    queryClient.setQueryData(["board"], {
      ...previousBoard,
      users: newUser,
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

  return useUpdateMutate("/api/user", {
    onMutate,
    onError,
    onSettled,
    enabled: !!boardId,
  });
};

const useDeleteUser = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const queryClient = useQueryClient();

  // Optimistic UI
  const onMutate = async (deleteUser: deletedUserInterface) => {
    await queryClient.cancelQueries({ queryKey: ["board"] });
    const previousBoard = queryClient.getQueryData([
      "board",
    ]) as boardDataInterface;
    const newUsers = previousBoard.users.filter((user: userInterface) => {
      return user._id !== deleteUser.userId;
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

  return useDeleteMutate("/api/user", {
    onMutate,
    onError,
    onSettled,
    enabled: !!boardId,
  });
};

export { useDeleteUser, useAddUser };
