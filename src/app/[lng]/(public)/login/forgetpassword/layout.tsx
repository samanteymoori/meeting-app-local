import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <div className="h-screen flex">
      <img
        className="hidden lg:block"
        src={"/images/logo.png"}
        width={"w-1/2"}
      />
      <div>
        <h1 className="text-black">Find, Book, Meet</h1>
      </div>
      {children}
      {form}
    </div>
  );
};

export default Layout;
