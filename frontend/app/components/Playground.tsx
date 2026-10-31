"use client";

import { useMayaGame } from "./useMayaGame";
import { ActionBar } from "./ActionBar";
import { CodeEditor } from "./CodeEditor";
import { Header } from "./Header";
import { LevelPanel } from "./LevelPanel";
import { Stage } from "./Stage";

export function Playground() {
  const g = useMayaGame();

  return (
    <Stage>
      <Header stars={g.stars} levelIndex={g.levelIndex} total={g.levelCount} />

      <LevelPanel
        level={g.level}
        pos={g.pos}
        status={g.status}
        toast={g.toast}
        onNext={g.next}
        onRestart={g.restart}
      />

      <CodeEditor code={g.code} onChange={g.setCode} onReset={g.reset} onRun={g.run} disabled={g.busy} />

      <ActionBar
        hint={g.level.hint}
        hintOpen={g.hintOpen}
        onToggleHint={g.toggleHint}
        onRun={g.run}
        onSubmit={g.submit}
        disabled={g.busy || g.finished}
      />
    </Stage>
  );
}
