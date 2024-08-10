import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <>
      {children}
      {form}
    </>
  );
};

export default Layout;
