import { common } from "@/styles/common";
import { css } from "@emotion/react";

const OptimalCardSkeleton = () => {
  return (
    <div css={optimalCardCss}>
      <div className="label">
        <div className="skeleton"></div>
      </div>
      <div className="title">
        <div className="skeleton"></div>
      </div>
      <div className="desc">
        <div className="skeleton"></div>
      </div>
    </div>
  );
};

const optimalCardCss = css`
  margin-bottom: 0.6rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 15rem;
  .label {
    margin: 0.4rem 0 0.2rem 0;
    .skeleton {
      width: 4rem;
      height: 0.6rem;
      background: ${common.gradient.skeletonGradient};
      background-size: 200vw 100vh;
      background-position: 100vw 0;
      animation: shimmer 2s infinite;
      border-radius: 0.1rem;
    }
  }
  .title {
    margin-bottom: 0.8rem;
    .skeleton {
      width: 12rem;
      height: 1rem;
      background: ${common.gradient.skeletonGradient};
      background-size: 200vw 100vh;
      background-position: 100vw 0;
      animation: shimmer 2s infinite;
      border-radius: 0.1rem;
    }
  }
  .desc {
    .skeleton {
      width: 8rem;
      height: 0.8rem;
      background: ${common.gradient.skeletonGradient};
      background-size: 200vw 100vh;
      background-position: 100vw 0;
      animation: shimmer 2s infinite;
      border-radius: 0.1rem;
    }
  }
`;

export default OptimalCardSkeleton;
