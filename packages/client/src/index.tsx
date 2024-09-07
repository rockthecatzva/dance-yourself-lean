import React from "react";
import { render } from "react-dom";
import {AudioAnalyze} from "./audio-analyze"
// import { App } from "./app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const rootElement = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/audio",
    element: <AudioAnalyze />
  }
]);

render(
  // <App />,
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  rootElement
);
