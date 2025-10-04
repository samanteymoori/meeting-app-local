import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <div className="h-screen w-screen lg:grid lg:grid-cols-3">
      <div className="md:col-span-2 bg-black">
        <img
          className="hidden object-contain h-screen lg:block"
          src={"/images/logo.png"}
          width={"w-1/2"}
        />
      </div>
      <div className="grid h-screen">
        {children}
        {form}
      </div>
    </div>
  );
};

export default Layout;
