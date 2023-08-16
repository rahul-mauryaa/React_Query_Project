import React, { FunctionComponent, PropsWithChildren } from "react";
import Header from "./Header";
const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
