"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LEVELS, STAR_REWARD, TRACK_MAX } from "./levels";
import { runCode } from "./runner";

export const STEP_MS = 300;
export type Status = "idle" | "running" | "success" | "error";
export type Toast = { tone: "info" | "success" | "error"; text: string; action?: "next" | "restart" };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useMayaGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const finished = levelIndex >= LEVELS.length;
  const level = LEVELS[Math.min(levelIndex, LEVELS.length - 1)];

  const [code, setCode] = useState("");
  const [pos, setPos] = useState(level.start);
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<Toast | null>(null);
  const [stars, setStars] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);

  const runId = useRef(0);
  const posRef = useRef(pos);
  const movePos = (p: number) => {
    posRef.current = p;
    setPos(p);
  };

  useEffect(() => () => void (runId.current += 1), []);

  const busy = status === "running";

  const execute = useCallback(
    async (mode: "run" | "submit") => {
      if (busy || finished) return;
      const id = ++runId.current;
      setHintOpen(false);
      setToast(null);
      setStatus("running");

      const wasAway = posRef.current !== level.start;
      movePos(level.start);
      if (wasAway) await sleep(STEP_MS + 80);

      const res = await runCode(code);
      if (id !== runId.current) return;

      if (!res.ok) {
        setStatus("error");
        setToast({ tone: "error", text: res.error ?? "Something went wrong." });
        return;
      }

      let p = level.start;
      let walkedOff = false;
      for (const d of res.moves) {
        const next = p + d;
        if (next < 0 || next > TRACK_MAX) {
          walkedOff = true;
          break;
        }
        p = next;
        movePos(p);
        await sleep(STEP_MS);
        if (id !== runId.current) return;
      }

      const fail = (text: string) => {
        setStatus("error");
        setToast({ tone: "error", text });
      };

      if (walkedOff) return fail("Maya walked off the track. Check your steps.");
      if (res.moves.length === 0) return fail("Maya didn't move. Call moveRight() or moveLeft().");
      if (p !== level.flag) {
        const diff = Math.abs(level.flag - p);
        const s = diff === 1 ? "step" : "steps";
        return fail(p < level.flag ? `Maya is ${diff} ${s} short of the flag.` : `Maya went ${diff} ${s} past the flag.`);
      }
      if (level.requirement && !level.requirement.test.test(code)) {
        return fail(`Maya reached the flag, but ${level.requirement.message}`);
      }

      if (mode === "run") {
        setStatus("success");
        setToast({ tone: "success", text: "Maya reached the flag! Press Submit to score it." });
        return;
      }

      setStars((s) => s + STAR_REWARD);
      setStatus("success");
      const last = levelIndex === LEVELS.length - 1;
      setToast({
        tone: "success",
        text: last ? `All levels complete! +${STAR_REWARD} stars` : `Level ${level.id} complete! +${STAR_REWARD} stars`,
        action: last ? "restart" : "next",
      });
      if (last) setLevelIndex(LEVELS.length);
    },
    [busy, finished, level, code, levelIndex]
  );

  const goToLevel = (i: number) => {
    runId.current += 1;
    const l = LEVELS[Math.min(i, LEVELS.length - 1)];
    setLevelIndex(i);
    setCode("");
    movePos(l.start);
    setStatus("idle");
    setToast(null);
    setHintOpen(false);
  };

  const next = () => goToLevel(levelIndex + 1);
  const restart = () => {
    setStars(0);
    goToLevel(0);
  };
  const reset = () => {
    runId.current += 1;
    setCode("");
    movePos(level.start);
    setStatus("idle");
    setToast(null);
  };

  // After the final level the toast's "restart" action is what's left; the toast
  // text is kept so the player sees the finish message.
  return {
    level,
    levelIndex,
    levelCount: LEVELS.length,
    finished,
    code,
    setCode,
    pos,
    status,
    busy,
    toast,
    stars,
    hintOpen,
    toggleHint: () => setHintOpen((o) => !o),
    run: () => execute("run"),
    submit: () => execute("submit"),
    reset,
    next,
    restart,
  };
}
