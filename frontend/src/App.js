import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import ViewCart from "./pages/ViewCart"
import Search from "./pages/Search"
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import ItemDetails from "./pages/ItemDetails";
import "./styles/app.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/viewBag" element={<ViewCart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/itemDetails" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
