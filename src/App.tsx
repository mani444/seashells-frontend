import "./App.css";
import Seashell from "./pages/SeashellList/Seashell";
import { Suspense } from "react";
import { CircularSpinner } from "./components/Spinner";
import React from "react";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<CircularSpinner backdropAlpha={false} />}>
        <Seashell />
      </Suspense>
    </div>
  );
}

export default App;
