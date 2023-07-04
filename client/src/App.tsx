/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { NotFound } from "./components/404/NotFound";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/about/About";
import LogIn from "./components/auth/LogIn";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import ManageView from "./components/manage/ManageView";
import ReportView from "./components/report/ReportView";
import Showroom from "./components/showroom/Showroom";
import Profile from "./components/user/Profile";
import AppointmentView from "./features/appointment/AppointmentView";
import { GarageView } from "./features/garage/GarageView";
import { UserView } from "./features/user/UserView";
import AdminRoutes from "./utils/AdminRoutes";
import MechanicRoutes from "./utils/MechanicRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const auth = useSelector((state: any) => state.auth);
  axios.defaults.headers.common["Authorization"] = `${
    auth ? auth.loggedInUser.token : ``
  }`;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/appointment" element={<AppointmentView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/showroom" element={<Showroom />} />
        </Route>
        <Route element={<MechanicRoutes />}>
          <Route path="/garage" element={<GarageView />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/report" element={<ReportView />} />
          <Route path="/users" element={<UserView />} />
          <Route path="/manage" element={<ManageView />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
