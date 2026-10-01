import { ImageResponse } from "next/og";
import { copy } from "@/lib/copy";

export const alt = copy.brand;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generic preview image for link shares (used when the countdown snapshot
// can't be attached). Placeholder art only.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #7c3aed, #ff4d9d 60%, #ffb020)",
          color: "#f6efdf",
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: 4,
        }}
      >
        <div>THE CLOCK IS TICKING</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.85 }}>
          {copy.brand}
        </div>
      </div>
    ),
    size,
  );
}
