import { RouterProvider } from "react-router-dom";
import "./App.scss";
import "reactjs-popup/dist/index.css";
import { router } from "./routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
