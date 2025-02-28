"use client";

import { useEffect } from "react";

export default function AdsComponent({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.atAsyncOptions) {
        window.atAsyncOptions = [];
      }

      const adKeys = [
        "843552e92a2ecbaaf106eb13fde6c909",
        "1c17b391b0212fd4f6e0bf466d2ca7db",
        "e1785364e1d2d9f8190796d0903b5165",
      ];

      adKeys.forEach((adKey) => {
        const containerId = `atContainer-${adKey}`;
        const scriptId = `adScript-${adKey}`;

        if (!document.getElementById(scriptId)) {
          window.atAsyncOptions.push({
            key: adKey,
            format: "js",
            async: true,
            container: containerId,
            params: {},
          });

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.async = true;
          script.src = `https://${"www.highperformanceformat.com/"}${adKey}/invoke.js`;
          script.id = scriptId;

          document.head.appendChild(script);
        }
      });
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//pl25789474.effectiveratecpm.com/0f920d0e4bb959d69287a5d18ce05324/invoke.js";
    script.async = true;
    script.dataset.cfasync = "false";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div>
        {/* প্রথম বিজ্ঞাপনের কন্টেইনার */}
        <div className="flex flex-col items-center">
          <div id="atContainer-843552e92a2ecbaaf106eb13fde6c909"></div>
          <div id="atContainer-1c17b391b0212fd4f6e0bf466d2ca7db"></div>
        </div>
        {children}
        <div className="flex flex-col items-center">
          <div id="atContainer-e1785364e1d2d9f8190796d0903b5165"></div>
          <div id="container-0f920d0e4bb959d69287a5d18ce05324"></div>
        </div>
      </div>
    </div>
  );
}
