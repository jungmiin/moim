import { Suspense } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@/components/skeleton";

const Board = () => {
  const Board = dynamic(() => import("@/components/board"), {
    ssr: false,
    suspense: true,
  });

  return (
    <Suspense fallback={<Skeleton />}>
      <Board />
    </Suspense>
  );
};

export default Board;
