import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextGen Equity Partners",
  robots: { index: false, follow: false },
};

export default function LogoPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6vmin",
      }}
    >
      <img
        src="/assets/logo-blue.svg"
        alt="NextGen Equity Partners"
        style={{
          width: "min(80vw, 1100px)",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}
