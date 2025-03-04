import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Signup from "./pages/user/Signup";
import Admin from "./pages/admin/Home";
import AdminLogin from "./pages/admin/Login";
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={!token ? <Login /> : <Home />} />
        <Route path="/signup" element={!token ? <Signup /> : <Home />} />
        <Route path="/profile" element={token ? <Profile /> : <Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
