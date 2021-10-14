import { lazy } from "react";
import { Routes } from "react-router";
import WapperRoute from "./WapperRoute";
const Layout = lazy(() => import("../elements/layout/Layout"));
const Home = lazy(() => import("../components/home/Home"));
const DetailPicture = lazy(() => import("../components/detail/DetailPicture"));

const routeList = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "detail",
        element: <DetailPicture />,
        auth: true,
      },
    ],
  },
];

const renderRouteList = (listRoutes) => {
  return (
    <>
      {listRoutes.map((route, index) => (
        <WapperRoute
          key={`${index}`}
          path={route.path}
          element={route.element}
          auth={route.auth}
        >
          {route.children && renderRouteList(route.children)}
        </WapperRoute>
      ))}
    </>
  );
};

const RenderRoute = () => {
  return <Routes>{renderRouteList(routeList)}</Routes>;
};

export default RenderRoute;
