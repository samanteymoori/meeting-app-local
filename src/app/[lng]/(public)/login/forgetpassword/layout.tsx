import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <div className="h-screen flex">
      <img src={"/images/logo.png"} width={"w-1/2"} />
      {children}
      {form}
    </div>
  );
};

export default Layout;
