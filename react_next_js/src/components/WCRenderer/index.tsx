"use client";

import { useEffect } from "react";

export function WidgetRenderer({ widgets }: { widgets: { src: string; tag: string }[] }) {
  useEffect(() => {
    widgets.forEach(w => {
      if (!document.querySelector(`script[src="${w.src}"]`)) {
        const script = document.createElement("script");
        script.src = w.src;
        script.type = "module";
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }, [widgets]);

  return (
    <div>
      {widgets.map((w, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: `<${w.tag}></${w.tag}>` }} />
      ))}
    </div>
  );
}
