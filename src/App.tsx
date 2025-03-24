import { ConfigProvider, message } from "antd";
import "./App.css";
import Routers from "./routers/Routers";
import { Provider } from "react-redux";
import store from "./reduxs/store";
import { ToastContainer } from "react-toastify";

message.config({
  top: 30,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});

function App() {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <Routers />
        <ToastContainer
          position="top-right" // Vị trí toast
          autoClose={3000} // Tự đóng sau 3 giây
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
