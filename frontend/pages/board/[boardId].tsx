import { Suspense } from "react";
import BoardWrapper from "@/components/board";
import Loading from "@/components/common/loading";

const Board = () => (
  <Suspense fallback={<Loading />}>
    <BoardWrapper />
  </Suspense>
);

export default Board;
