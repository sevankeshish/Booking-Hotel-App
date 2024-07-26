import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";

import "./App.css";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./Hotels/Hotels";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>single Hotels</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
