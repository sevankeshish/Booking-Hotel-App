import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";

import "./App.css";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </div>
  );
}

export default App;
