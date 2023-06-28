import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </>
  );
}
