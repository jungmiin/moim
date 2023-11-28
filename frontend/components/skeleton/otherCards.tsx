import { common } from "@/styles/common";
import { css } from "@emotion/react";

const OtherCardsSkeleton = () => {
  return (
    <>
      <div css={labelCss}>이 날짜는 어떤가요?</div>
      {[...Array(4).keys()].map((index: number) => (
        <div css={otherCardsCss} key={index}>
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const labelCss = css`
  font-size: 0.67rem;
  font-weight: 700;
  color: ${common.colors.primaryColor};
  margin-bottom: 0.8rem;
`;

const otherCardsCss = css`
  margin-bottom: 0.6rem;
  padding: 1rem;
  background: white;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
  border: 1px solid ${common.colors.tenaryGrey};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 15rem;
  .title {
    margin-bottom: 0.8rem;
    .skeleton {
      width: 6rem;
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

export default OtherCardsSkeleton;
