import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <>
      layout for registration {children}
      {form}
    </>
  );
};

export default Layout;
