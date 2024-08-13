import "@/styles/globals.css";
import localFont from "next/font/local";

const custom = localFont({
  src: [
    {
      path: "../../public/fonts/Bold.otf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../public/fonts/Medium.otf",
      weight: "500",
      style: "medium",
    },
  ],
});

export default function App({ Component, pageProps }) {
  const combinedStyles = {
    ...custom.style,
  };

  return (
    <div style={combinedStyles}>
      <Component {...pageProps} style={combinedStyles} />;
    </div>
  );
}
