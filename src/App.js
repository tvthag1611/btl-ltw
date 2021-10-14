import { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoadingSpinner from "./elements/loading-spinner/LoadingSpinner";
import RenderRoute from "./routes";
import LoginContext from "./context/loginContext";
import "antd/dist/antd.css";

function App() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);

  const loginValue = {
    isOpenLogin,
    setIsOpenLogin,
    isOpenSignup,
    setIsOpenSignup,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <RenderRoute />
        </Suspense>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
