import { JSX } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App = (): JSX.Element => (
  <div className="app_container">
    <RouterProvider router={router} />
  </div>
);

export default App;
