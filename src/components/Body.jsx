import { Outlet } from "react-router";
import Header from "./Header";
function Body() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Body;
