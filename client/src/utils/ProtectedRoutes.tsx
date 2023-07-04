import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { IStore } from "../app/store";
import { isObjEmpty } from "./isObjEmpty";

const ProtectedRoutes = () => {
  const auth = useSelector((state: IStore) => state.auth);
  return isObjEmpty(auth.loggedInUser) ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
