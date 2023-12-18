import { common } from "@/styles/common";
import { css } from "@emotion/react";

const MonthSkeleton = () => {
  return (
    <div css={gridCss}>
      {[...Array(35).keys()].map((index: number) => (
        <div className="day" key={index}>
          <div className="skeleton"></div>
        </div>
      ))}
    </div>
  );
};

const gridCss = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: solid 1px ${common.colors.tenaryGrey};
  border-left: solid 1px ${common.colors.tenaryGrey};
  .day {
    width: 3.6rem;
    height: 3.6rem;
    padding: 0.75rem;
    border-bottom: solid 1px ${common.colors.tenaryGrey};
    border-right: solid 1px ${common.colors.tenaryGrey};
    .skeleton {
      width: 0.6rem;
      height: 0.6rem;
      background: ${common.gradient.skeletonGradient};
      background-size: 200vw 100vh;
      background-position: 100vw 0;
      animation: shimmer 2s infinite;
      border-radius: 0.1rem;
    }
  }
`;

export default MonthSkeleton;
