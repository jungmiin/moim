import { useRouter } from "next/router";
import { useGetQuery } from "./useApi";

const useGetBoard = () => {
  const router = useRouter();
  const { boardId } = router.query;
  return useGetQuery(`/api/board/${boardId}`, "board", { enabled: !!boardId });
};

export { useGetBoard };
