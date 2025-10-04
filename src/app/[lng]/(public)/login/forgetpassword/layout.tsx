import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <div className="h-screen w-screen md:grid md:grid-cols-3">
      <div className="md:col-span-2 bg-black">
        <img
          className="hidden object-contain h-screen md:block"
          src={"/images/logo.png"}
          width={"w-1/2"}
        />
      </div>
      <div className="grid h-screen">
        <h1 className="text-black">Find, Book, Meet</h1>
      </div>
      {children}
      {form}
    </div>
  );
};

export default Layout;
