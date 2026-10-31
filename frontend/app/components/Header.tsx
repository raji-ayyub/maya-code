import { StarIcon, TrophyIcon, UserIcon } from "./icons";

const DOT_X = [628, 735, 838, 941];
const TROPHY_X = 1051;
const LINE_Y = 66;

const yellowDot: React.CSSProperties = {
  background: "radial-gradient(circle at 35% 30%, #FFE866 0%, #FFC21A 55%, #F5A200 100%)",
  boxShadow: "0 0 18px 5px rgba(255,196,0,0.42), inset 0 1px 1px rgba(255,255,255,0.5)",
};

export function ProgressTrack({ levelIndex, total }: { levelIndex: number; total: number }) {
  const won = levelIndex >= total;
  const xs = [...DOT_X, TROPHY_X];

  return (
    <>
      {/* connector segments */}
      {xs.slice(0, -1).map((x, i) => {
        const done = won || i < levelIndex;
        const end = xs[i + 1] - (i === xs.length - 2 ? 26 : 12);
        return (
          <div
            key={`seg-${i}`}
            className="absolute"
            style={{
              left: x + 12,
              width: end - (x + 12),
              top: LINE_Y - 1.5,
              height: 3,
              borderRadius: 2,
              background: done ? "linear-gradient(90deg,#FFC21A,#F5A200)" : "#2A2C49",
            }}
          />
        );
      })}

      {/* level dots */}
      {DOT_X.map((x, i) => {
        const done = won || i < levelIndex;
        const current = !won && i === levelIndex;
        const size = current ? 24 : 22;
        const lit = done || current;
        return (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              left: x - size / 2,
              top: LINE_Y - size / 2,
              width: size,
              height: size,
              transition: "all .3s ease",
              ...(lit ? yellowDot : { background: "#242644", border: "2px solid #34375C" }),
            }}
          />
        );
      })}

      {/* trophy */}
      <div
        className="absolute"
        style={{
          left: TROPHY_X - 22,
          top: LINE_Y - 22,
          width: 44,
          height: 44,
          color: won ? "#FFC21A" : "#383B5F",
          filter: won ? "drop-shadow(0 0 12px rgba(255,196,0,.6))" : undefined,
          transition: "all .3s ease",
        }}
      >
        <TrophyIcon size={44} />
      </div>
    </>
  );
}

export function Header({ stars, levelIndex, total }: { stars: number; levelIndex: number; total: number }) {
  return (
    <header
      className="absolute left-0 top-0"
      style={{ width: 1672, height: 126, borderBottom: "1px solid #1A1B38", background: "#0A0A1F" }}
    >
      {/* JS badge */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 60,
          top: 34,
          width: 62,
          height: 62,
          borderRadius: 14,
          background: "linear-gradient(160deg,#FFD93D 0%,#FFB61C 100%)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,.4), 0 0 26px rgba(255,190,30,.22)",
          color: "#17110A",
          fontSize: 31,
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1,
        }}
      >
        JS
      </div>

      <div className="absolute" style={{ left: 156, top: 45, width: 2, height: 42, background: "#262846" }} />

      <h1
        className="absolute m-0"
        style={{ left: 189, top: 50, fontSize: 24, lineHeight: "32px", fontWeight: 500, color: "#C9CAE8" }}
      >
        JavaScript Playground
      </h1>

      <ProgressTrack levelIndex={levelIndex} total={total} />

      {/* stars */}
      <div className="absolute" style={{ left: 1433, top: 48, filter: "drop-shadow(0 0 8px rgba(255,190,30,.35))" }}>
        <StarIcon size={36} />
      </div>
      <div
        className="absolute"
        style={{ left: 1478, top: 48, fontSize: 26, lineHeight: "36px", fontWeight: 700, color: "#fff" }}
        aria-label={`${stars} stars`}
      >
        {stars}
      </div>

      <div className="absolute" style={{ left: 1526, top: 51, width: 2, height: 30, background: "#1C1E3C" }} />

      {/* avatar */}
      <div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          left: 1561,
          top: 35,
          width: 62,
          height: 62,
          background: "#1B1D3C",
          color: "#B9B9F4",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.05)",
        }}
      >
        <UserIcon size={30} />
      </div>
    </header>
  );
}
