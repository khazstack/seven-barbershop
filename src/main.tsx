import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applySiteTheme } from "./lib/site";

applySiteTheme();

createRoot(document.getElementById("root")!).render(<App />);
