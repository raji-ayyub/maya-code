"use client";

import { BulbIcon, CheckIcon, ChevronDownIcon, PlayIcon } from "./icons";

const btn = { fontFamily: "inherit", fontSize: 24, fontWeight: 700 } as const;

export function ActionBar({
  hint,
  hintOpen,
  onToggleHint,
  onRun,
  onSubmit,
  disabled,
}: {
  hint: string;
  hintOpen: boolean;
  onToggleHint: () => void;
  onRun: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  return (
    <>
      {hintOpen && (
        <div
          className="absolute"
          style={{
            left: 40,
            top: 580,
            width: 520,
            padding: "20px 24px",
            borderRadius: 22,
            background: "#12132E",
            border: "2px solid #2A2C4B",
            boxShadow: "0 18px 50px rgba(0,0,0,.5)",
            zIndex: 5,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600, color: "#FFC21A", marginBottom: 10 }}>Hint</div>
          <pre
            className="m-0"
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 17,
              lineHeight: "26px",
              color: "#D8DAFF",
            }}
          >
            {hint}
          </pre>
        </div>
      )}

      {/* Hint */}
      <button
        onClick={onToggleHint}
        aria-expanded={hintOpen}
        className="absolute flex cursor-pointer items-center"
        style={{
          ...btn,
          left: 40,
          top: 787,
          width: 190,
          height: 69,
          paddingLeft: 32,
          paddingRight: 28,
          borderRadius: 35,
          background: "#11122B",
          border: "2px solid #2A2C4B",
          color: "#fff",
          zIndex: 6,
        }}
      >
        <BulbIcon size={34} style={{ color: "#FFC21A", marginRight: 10, marginLeft: -4 }} />
        <span>Hint</span>
        <ChevronDownIcon
          size={24}
          style={{ marginLeft: "auto", color: "#8E91B8", transform: hintOpen ? "rotate(180deg)" : undefined, transition: "transform .2s" }}
        />
      </button>

      {/* Run */}
      <button
        onClick={onRun}
        disabled={disabled}
        className="absolute flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          ...btn,
          left: 1204,
          top: 785,
          width: 189,
          height: 72,
          paddingLeft: 50,
          gap: 24,
          borderRadius: 24,
          background: "#161833",
          border: "2px solid #2A2D50",
          color: "#EEF0FF",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)",
        }}
      >
        <PlayIcon size={28} style={{ color: "#E4E6FF" }} />
        Run
      </button>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="absolute flex cursor-pointer items-center border-0 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          ...btn,
          left: 1411,
          top: 785,
          width: 220,
          height: 72,
          paddingLeft: 47,
          gap: 20,
          borderRadius: 24,
          background: "linear-gradient(180deg,#FFD33F 0%,#FBB224 55%,#F7A21A 100%)",
          color: "#1B1305",
          boxShadow: "0 8px 28px rgba(255,170,20,.38), inset 0 2px 0 rgba(255,255,255,.45), inset 0 -3px 0 rgba(200,110,0,.25)",
        }}
      >
        <CheckIcon size={32} />
        Submit
      </button>
    </>
  );
}
