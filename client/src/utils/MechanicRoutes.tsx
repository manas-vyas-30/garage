import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IStore } from "../app/store";
import { isObjEmpty } from "./isObjEmpty";

const MechanicRoutes = () => {
  const auth = useSelector((state: IStore) => state.auth);
  return isObjEmpty(auth.loggedInUser) ? (
    <Navigate to="/login" />
  ) : auth.loggedInUser.role.toLowerCase() === "admin" ||
    auth.loggedInUser.role.toLowerCase() === "mechanic" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default MechanicRoutes;
