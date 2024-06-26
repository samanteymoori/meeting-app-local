import React from "react";

const Layout = async ({ children, form }: any) => {
  return (
    <>
      layout for email {children}
      {form}
    </>
  );
};

export default Layout;
