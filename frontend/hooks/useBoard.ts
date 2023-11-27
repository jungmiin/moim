import { useRouter } from "next/router";
import Router from "next/router";
import { useGetQuery, usePostMutate } from "./useApi";

const useGetBoard = () => {
  const router = useRouter();
  const { boardId } = router.query;
  return useGetQuery(`/api/board/${boardId}`, "board", {
    enabled: !!router.query.boardId,
  });
};

const usePostBoard = () => {
  const onError = (err: any, context: any) => {
    console.error(err.response.data.message);
  };
  const onSettled = (data: any) => {
    const { boardUrl } = data;
    Router.push(`/board/${boardUrl}`);
  };
  return usePostMutate(`/api/board`, { onError, onSettled });
};
export { useGetBoard, usePostBoard };
