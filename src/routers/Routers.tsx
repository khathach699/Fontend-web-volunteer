import { useDispatch, useSelector } from "react-redux";
import { authSelector, AuthState } from "../reduxs/reducers/authReducer";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Routers = () => {
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();
  return !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
