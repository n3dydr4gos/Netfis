import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { MediaProvider } from "./context/MediaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MediaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MediaProvider>
  </StrictMode>
);
