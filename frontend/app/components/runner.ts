export type RunResult = { ok: boolean; moves: (1 | -1)[]; error?: string };

// User code runs inside a throw-away Web Worker: no DOM access,
// and an infinite loop can't freeze the page (it's terminated on timeout).
const WORKER_SRC = `
self.onmessage = function (e) {
  var moves = [];
  function go(dir, n) {
    if (n === undefined) n = 1;
    if (typeof n !== 'number' || !isFinite(n) || n < 0 || Math.floor(n) !== n) {
      throw new Error('Steps must be a whole number, like 3.');
    }
    for (var i = 0; i < n; i++) {
      moves.push(dir);
      if (moves.length > 200) throw new Error('That is too many steps.');
    }
  }
  try {
    new Function('moveRight', 'moveLeft', e.data.code)(
      function (n) { go(1, n); },
      function (n) { go(-1, n); }
    );
    self.postMessage({ ok: true, moves: moves });
  } catch (err) {
    self.postMessage({ ok: false, moves: moves, error: String(err && err.message ? err.message : err) });
  }
};`;

export function runCode(code: string, timeoutMs = 1500): Promise<RunResult> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
    const worker = new Worker(url);
    const finish = (r: RunResult) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(r);
    };
    const timer = setTimeout(
      () => finish({ ok: false, moves: [], error: "Your code took too long. Is there an infinite loop?" }),
      timeoutMs
    );
    worker.onmessage = (e: MessageEvent<RunResult>) => finish(e.data);
    worker.onerror = (e) => finish({ ok: false, moves: [], error: e.message || "Something went wrong." });
    worker.postMessage({ code });
  });
}
