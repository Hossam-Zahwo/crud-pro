import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // استخدم react-router-dom بدلاً من react-router
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
