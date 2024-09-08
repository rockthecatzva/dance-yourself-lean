import React from "react";
import { render } from "react-dom";
import {AudioAnalyze} from "./audio-analyze"
import { App } from "./app";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

const rootElement = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Hello world!! <Link to={"/audio"}>aud</Link>{" "}
      </div>
    ),
  },
  {
    path: "/audio",
    element: <AudioAnalyze />
  },
]);

render(
  // <App />,
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
  // <div>hello</div>,
  rootElement
);
