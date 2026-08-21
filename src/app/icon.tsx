import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#D95338",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF6ED",
          borderRadius: "50%",
          border: "2px solid #171B1E",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        ⛵
      </div>
    ),
    {
      ...size,
    }
  );
}
