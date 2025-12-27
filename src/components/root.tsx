import { Outlet } from "@tanstack/react-router";
import React from "react";

export function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
