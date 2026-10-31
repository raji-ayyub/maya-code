"use client";

import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import type { KeyboardEvent } from "react";
import { CodeIcon, ResetIcon } from "./icons";

export function CodeEditor({
  code,
  onChange,
  onReset,
  onRun,
  disabled,
}: {
  code: string;
  onChange: (v: string) => void;
  onReset: () => void;
  onRun: () => void;
  disabled?: boolean;
}) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <section
      className="absolute overflow-hidden"
      style={{ left: 802, top: 168, width: 834, height: 581, borderRadius: 24, border: "2px solid #202241", background: "#090A1C" }}
    >
      <div className="absolute" style={{ left: -2, top: -2, width: 834, height: 581 }}>
        <div className="absolute left-0 top-0" style={{ width: 834, height: 79, borderBottom: "1px solid #1D1F3A" }}>
          <div className="absolute flex items-center" style={{ left: 2, top: 0, width: 204, height: 79, paddingLeft: 30, gap: 38 }}>
            <CodeIcon size={34} style={{ color: "#FFC21A" }} />
            <span style={{ fontSize: 22, fontWeight: 600, color: "#fff" }}>main.js</span>
            <div
              className="absolute"
              style={{ left: 0, bottom: -1, width: 204, height: 3, borderRadius: 2, background: "#FFC21A", boxShadow: "0 0 12px rgba(255,194,26,.45)" }}
            />
          </div>

          <button
            onClick={onReset}
            className="absolute flex cursor-pointer items-center border-0"
            style={{
              right: 20,
              top: 19,
              width: 134,
              height: 50,
              paddingLeft: 23,
              gap: 12,
              borderRadius: 16,
              background: "#1A1C37",
              color: "#A6A9C9",
              fontSize: 21,
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            <ResetIcon size={24} />
            Reset
          </button>
        </div>

        <div className="absolute overflow-hidden" style={{ left: 0, top: 79, width: 834, height: 502 }}>
          <CodeMirror
            value={code}
            onChange={onChange}
            onKeyDown={onKeyDown}
            editable={!disabled}
            indentWithTab
            basicSetup={{ foldGutter: false, tabSize: 2 }}
            extensions={[javascript()]}
            theme={oneDark}
            height="502px"
            placeholder="// Write your JavaScript code here..."
            className="maya-code-editor"
            aria-label="JavaScript code editor"
          />
        </div>
      </div>
    </section>
  );
}
