import type { CSSProperties } from "react";

const ITEMS = ["Operativ", "Digital", "Add-on", "Reporting"];

export function ValueFlywheelAnimation() {
  return (
    <div className="flywheel-demo" aria-hidden="true">
      <div className="flywheel-ring" />
      <div className="flywheel-core">N</div>
      {ITEMS.map((item, index) => (
        <div key={item} className="flywheel-node" style={{ "--i": index } as CSSProperties}>
          {item}
        </div>
      ))}
    </div>
  );
}
