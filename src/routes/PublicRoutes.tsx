import { Outlet } from "react-router-dom";
import { Layout } from "../views/Layout";

const PublicRoutes = () => {
  // const contextValues = useContext(UserContext);

  // return contextValues !== null &&
  //   !contextValues.isLoading &&
  //   contextValues.user == null ? (
  //   <Layout>
  //     <Outlet />
  //   </Layout>
  // ) : (
  //   <Navigate to={ROUTE_NAME.DASHBOARD} />
  // );

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicRoutes;
