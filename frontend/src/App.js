import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home"
import ViewCart from "./routes/ViewCart"
import Search from "./routes/Search"
import Login from "./routes/Login"
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import ItemDetails from "./routes/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/viewCart" element={<ViewCart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/itemDetails" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
