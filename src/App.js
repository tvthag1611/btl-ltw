import { lazy, Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoadingSpinner from "./elements/loading-spinner/LoadingSpinner";
import { Route, Routes } from "react-router";
import LoginContext from "./context/loginContext";
import "antd/dist/antd.css";
import PrivateRoute from "./routes/PrivateRoute";
const Layout = lazy(() => import("./elements/layout/Layout"));
const Home = lazy(() => import("./components/home/Home"));
const MyProfile = lazy(() => import("./components/profile/MyProfile"));
const EditProfile = lazy(() => import("./components/profile/EditProfile/EditProfile"));
const CreatePicture = lazy(() => import("./components/create/CreatePicture"));
const DesignDetail = lazy(() => import("./components/design/DesignDetail"));
const Payment = lazy(() => import("./components/payment/Payment"));

function App() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isForgetPass, setIsForgetPass] = useState(false);

  const loginValue = {
    isOpenLogin,
    setIsOpenLogin,
    isOpenSignup,
    setIsOpenSignup,
    isForgetPass,
    setIsForgetPass,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="user/:id" element={<MyProfile />} />
              <Route path="user-edit/:id" element={<EditProfile />} />
              <Route path="/" element={<Home />} />
              <Route path="" element={<PrivateRoute />}>
                <Route path="create" element={<CreatePicture />} />
                <Route path="checkout/:id" element={<Payment />} />
              </Route>
              <Route path="post/:id" element={<DesignDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
