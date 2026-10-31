import type { Level } from "./levels";
import type { Status, Toast } from "./useMayaGame";
import { BoltIcon } from "./icons";
import { Scene } from "./Scene";

const toastStyle = {
  info: { bg: "rgba(20,20,70,.85)", border: "rgba(150,150,255,.35)", color: "#D9DAFF" },
  error: { bg: "rgba(70,18,40,.88)", border: "rgba(255,110,130,.45)", color: "#FFD3DA" },
  success: { bg: "rgba(20,64,52,.88)", border: "rgba(90,235,170,.45)", color: "#C9FFE6" },
} as const;

export function LevelPanel({
  level,
  pos,
  status,
  toast,
  onNext,
  onRestart,
}: {
  level: Level;
  pos: number;
  status: Status;
  toast: Toast | null;
  onNext: () => void;
  onRestart: () => void;
}) {
  const t = toast ? toastStyle[toast.tone] : null;
  return (
    <section
      className="absolute overflow-hidden"
      style={{
        left: 40,
        top: 167,
        width: 731,
        height: 582,
        borderRadius: 28,
        border: "2px solid #3434AE",
        background: "linear-gradient(180deg,#12123A 0%,#181957 52%,#25278A 100%)",
        boxShadow: "0 0 60px rgba(70,70,230,.18), inset 0 0 44px rgba(100,100,255,.1)",
      }}
    >
      {/* all children are positioned from the panel's outer edge */}
      <div className="absolute" style={{ left: -2, top: -2, width: 731, height: 582 }}>
        {/* floor glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 34% at 48% 74%, rgba(120,120,255,.26) 0%, transparent 100%)" }}
        />

        {/* level pill */}
        <div
          className="absolute flex items-center"
          style={{
            left: 33,
            top: 31,
            width: 133,
            height: 43,
            borderRadius: 22,
            paddingLeft: 15,
            gap: 8,
            background: "rgba(8,8,40,.62)",
            border: "1px solid rgba(255,255,255,.13)",
            color: "#fff",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <BoltIcon size={22} style={{ color: "#FFC21A" }} />
          Level {level.id}
        </div>

        <h2 className="absolute m-0" style={{ left: 46, top: 92, fontSize: 34, lineHeight: "40px", fontWeight: 700, color: "#fff" }}>
          {level.title}
        </h2>
        <p
          className="absolute m-0"
          style={{ left: 46, top: 139, width: 470, fontSize: 22, lineHeight: "28px", fontWeight: 400, color: "#A9AAEE" }}
        >
          {level.prompt}
        </p>

        <Scene pos={pos} flag={level.flag} status={status} />

        {toast && t && (
          <div
            role="status"
            className="absolute flex items-center justify-between"
            style={{
              left: 33,
              right: 33,
              bottom: 30,
              height: 60,
              padding: "0 14px 0 22px",
              borderRadius: 18,
              background: t.bg,
              border: `1px solid ${t.border}`,
              color: t.color,
              fontSize: 19,
              fontWeight: 500,
              backdropFilter: "blur(6px)",
            }}
          >
            <span>{toast.text}</span>
            {toast.action && (
              <button
                onClick={toast.action === "next" ? onNext : onRestart}
                className="cursor-pointer border-0"
                style={{
                  height: 40,
                  padding: "0 18px",
                  borderRadius: 12,
                  background: "linear-gradient(180deg,#FFD23F,#F8A91E)",
                  color: "#1A1204",
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "inherit",
                }}
              >
                {toast.action === "next" ? "Next level" : "Play again"}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
