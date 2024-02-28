import { Route, Routes } from "react-router-dom";
// components
import Home from "../screens/Home/Home";
import Favourite from "../screens/Favourites/Favourite";

const WebRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Favourite />} path="/favourites" />
    </Routes>
  );
};

export default WebRoutes;
