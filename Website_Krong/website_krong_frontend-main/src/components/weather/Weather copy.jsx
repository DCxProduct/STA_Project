"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Weather() {
  const weatherUrl = process.env.WEATHER_URL;
  const weatherLabel = process.env.WEATHER_LABEL;

  useEffect(() => {
    if (!document.getElementById("weatherwidget-io-js")) {
      const script = document.createElement("script");
      script.id = "weatherwidget-io-js";
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const t = useTranslations("HomePage");

  return (
    <div className="lg:container-default p-sm-0 mb-3 mb-sm-4 mb-md-5 mb-lg-6  py-10 px-4">
      <div className="block-title text-left mb-1 mb-sm-2 mb-md-3 mb-lg-4">
        <h2 className="md:text-size-45 text-size-25 lg:text-size-50 font-bold">
          {/* អាកាសធាតុ */}
          {t("weather")}
        </h2>
      </div>

      <a
        className="weatherwidget-io"
        href={weatherUrl}
        data-label_1={weatherLabel}
        data-label_2="WEATHER"
        data-theme="pure"
        style={{
          display: "block",
          position: "relative",
          height: "112px",
          padding: "0px",
          overflow: "hidden",
          textAlign: "left",
          textIndent: "-299rem",
        }}
      >
        <iframe
          className="weatherwidget-io-frame"
          title="Weather Widget"
          width="100%"
          src="https://weatherwidget.io/w/"
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            height: "112px",
          }}
        ></iframe>
      </a>
    </div>
  );
}
