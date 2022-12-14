import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Seashell from "./pages/SeashellList/Seashell";
import CreateSeashell from "./pages/CreateOrEditSeashell/CreateSeashell";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Seashell />,
  },
  // {
  //   path: "/create",
  //   element: <CreateSeashell />,
  // },
  // {
  //   path: "/update/:id",
  //   element: <CreateSeashell />,
  // },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
