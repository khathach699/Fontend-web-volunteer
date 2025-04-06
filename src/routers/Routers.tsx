import { useDispatch, useSelector } from "react-redux";
import { authSelector, AuthState } from "../reduxs/reducers/authReducer";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

const Routers = () => {
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      {!auth.token ? <AuthRouter /> : <MainRouter />}
    </BrowserRouter>
  );
};

export default Routers;
