import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers/Providers";
import { router } from "./router/router";
import { FC } from "react";

export const App: FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
