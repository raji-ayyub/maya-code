import Image from "next/image";

/** Coordinates are relative to the level panel's outer edge (design px). */
const TILE = 82; // distance between track positions
const MAYA = { size: 77, left0: 73, top: 355 };
const MAYA_IMG = { w: 120, h: 124.6, dx: -20, dy: -34.6 }; // artwork incl. sparkles, offset from the square
const FLAG_IMG = { w: 139.6, h: 145, pole: 60.2, top: 291 };
const centerX = (p: number) => MAYA.left0 + MAYA.size / 2 + TILE * p; // 111 + 82p

export function Scene({ pos, flag, status }: { pos: number; flag: number; status: string }) {
  const happy = status === "success";
  return (
    <>
      {/* dashed path */}
      <div
        className="absolute"
        style={{
          left: 196,
          top: 417,
          width: 342,
          height: 2,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(160,162,225,.42) 0 10px, transparent 10px 20px)",
        }}
      />

      {/* flag */}
      <div className="absolute" style={{ left: centerX(flag) - FLAG_IMG.pole, top: FLAG_IMG.top, width: FLAG_IMG.w, height: FLAG_IMG.h, transition: "left .3s ease" }}>
        <Image
          src="/assets/flag.png"
          alt="Goal flag"
          width={FLAG_IMG.w}
          height={FLAG_IMG.h}
          priority
          draggable={false}
          style={{ width: FLAG_IMG.w, height: FLAG_IMG.h, filter: "drop-shadow(0 6px 10px rgba(0,0,30,.35))" }}
        />
      </div>

      {/* Maya's ground shadow */}
      <div
        className="absolute"
        style={{
          left: centerX(pos) - 59,
          top: 423,
          width: 118,
          height: 16,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(4,4,28,.7) 0%, rgba(4,4,28,.35) 55%, transparent 75%)",
          transition: "left .3s cubic-bezier(.45,0,.25,1)",
        }}
      />

      {/* Maya */}
      <div
        className="absolute"
        style={{
          left: MAYA.left0 + TILE * pos,
          top: MAYA.top,
          width: MAYA.size,
          height: MAYA.size,
          transition: "left .3s cubic-bezier(.45,0,.25,1)",
        }}
      >
        <div
          className="absolute"
          style={{
            left: MAYA_IMG.dx,
            top: MAYA_IMG.dy,
            width: MAYA_IMG.w,
            height: MAYA_IMG.h,
            transform: happy ? "translateY(-8px) scale(1.04)" : undefined,
            transformOrigin: "50% 70%",
            transition: "transform .25s ease",
            filter: "drop-shadow(0 6px 12px rgba(255,170,0,.25))",
          }}
        >
          <Image
            src="/assets/maya.png"
            alt="Maya"
            width={MAYA_IMG.w}
            height={MAYA_IMG.h}
            priority
            draggable={false}
            style={{ width: MAYA_IMG.w, height: MAYA_IMG.h }}
          />
        </div>
      </div>
    </>
  );
}
