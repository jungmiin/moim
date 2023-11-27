import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alata } from "@next/font/google";
import { common } from "@/styles/common";

const alata = Alata({ weight: ["400"], preload: false });

const Skeleton = () => {
  return (
    <div css={skeletonCss}>
      <div className="calendar-wrapper">
        <span className="name">
          <span className="moim">
            moim
            <span className="skeleton">
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;
            </span>
          </span>
        </span>
        <div className="calendar">
          <div className="header">
            <div className="month-control">
              <div className="month">
                <div className="skeleton"></div>
              </div>
              <div className="button">
                <FontAwesomeIcon
                  className="fa"
                  icon={faPlus}
                  width={12}
                  color={common.colors.primaryColor}
                />
              </div>
            </div>
            <div className="day-header">
              <div className="day">월</div>
              <div className="day">화</div>
              <div className="day">수</div>
              <div className="day">목</div>
              <div className="day">금</div>
              <div className="day">토</div>
              <div className="day">일</div>
            </div>
          </div>
          <div className="grid">
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
            <div className="day">
              <div className="skeleton"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="result-wrapper">
        <div className="button">인원 추가하기</div>
        <div className="result">
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
        <div className="result-label">이 날짜는 어떤가요?</div>
        <div className="result">
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
        <div className="result">
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
        <div className="result">
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
        <div className="result">
          <div className="title">
            <div className="skeleton"></div>
          </div>
          <div className="desc">
            <div className="skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const skeletonCss = css`
  display: flex;
  margin: 3.6rem 0;
  justify-content: center;
  width: 100vw;
  .calendar-wrapper {
    .name {
      font-size: 0.8rem;
      padding: 0.8rem 1.2rem;
      background: white;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
      border: 1px solid ${common.colors.tenaryGrey};
      border-radius: 2rem;
      margin: 0.8rem;
      .moim {
        font-family: ${alata.style.fontFamily};
        color: ${common.colors.primaryColor};
        .skeleton {
          margin-left: 0.5rem;
          width: 8rem;
          height: 1.2rem;
          background: ${common.gradient.skeletonGradient};
          background-size: 200vw 100vh;
          background-position: 100vw 0;
          animation: shimmer 2s infinite;
          border-radius: 0.1rem;
        }
      }
    }
    .calendar {
      padding: 2rem;
      background: white;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
      border: 1px solid ${common.colors.tenaryGrey};
      border-radius: 0.5rem;
      .header {
        .month-control {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .month {
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
          .button {
            padding: 0.1rem 0.8rem;
            background: white;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.04);
            border: 1px solid ${common.colors.tenaryGrey};
            border-radius: 0.1rem;
          }
        }
        .day-header {
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          .day {
            width: 3.6rem;
            padding: 0.75rem;
            text-align: center;
            font-size: 0.5rem;
            font-weight: 700;
            color: ${common.colors.primaryColor};
          }
        }
      }
      .grid {
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
            width: 1rem;
            height: 1rem;
            background: ${common.gradient.skeletonGradient};
            background-size: 200vw 100vh;
            background-position: 100vw 0;
            animation: shimmer 2s infinite;
            border-radius: 0.1rem;
          }
        }
      }
    }
  }
  .result-wrapper {
    flex-direction: column;
    padding: 0 2rem;
    max-width: 17rem;
    .button {
      display: flex;
      justify-content: center;
      gap: 0.2rem;
      border: 1px solid ${common.colors.primaryColor};
      border-radius: 3rem;
      padding: 1rem 0;
      width: 17rem;
      color: ${common.colors.primaryColor};
      font-weight: 700;
      font-size: 0.75rem;
      margin: 1rem 0;
    }
    .result-label {
      font-size: 0.67rem;
      font-weight: 700;
      color: ${common.colors.primaryColor};
      margin-bottom: 0.8rem;
    }
    .result {
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
    }
    @keyframes shimmer {
      100% {
        background-position: -100vw 0;
      }
    }
  }
`;

export default Skeleton;
