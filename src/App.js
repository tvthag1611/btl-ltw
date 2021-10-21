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
const MyProfile = lazy(() => import("./components/me/MyProfile"));
const CreatePicture = lazy(() => import("./components/create/CreatePicture"));

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
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePicture />} />
              <Route path="/me" element={<PrivateRoute />}>
                <Route path="" element={<MyProfile />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
