import { Outlet } from "@tanstack/react-router";
import React from "react";

export function RootLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
