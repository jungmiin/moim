import { Suspense } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@/components/skeleton";
import Toast from "@/components/common/toast";

const Board = () => {
  const Board = dynamic(() => import("@/components/board"), {
    ssr: false,
    suspense: true,
  });

  return (
    <Suspense fallback={<Skeleton />}>
      <Board />
      <Toast />
    </Suspense>
  );
};

export default Board;
