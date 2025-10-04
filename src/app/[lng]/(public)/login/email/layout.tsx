import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <div className="h-screen w-screen grid grid-cols-3">
      <div className="col-span-2">
        <img
          className="hidden cover h-screen lg:block"
          src={"/images/logo.png"}
          width={"w-1/2"}
        />
      </div>
      <div className="grid">
        {children}
        {form}
      </div>
    </div>
  );
};

export default Layout;
