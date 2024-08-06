import { createBrowserRouter, Navigate } from "react-router-dom";
import { SharedMenu } from "../common/SharedContent";
import { PrivateRoute } from "../pages/private/privateRoute";
import { adminPages, visitorPages } from "../common/pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SharedMenu />,
        children: visitorPages.map((page) => ({path: page.route, element: page.element})) //mapping zorgt ervoor dat we bij het maken van nieuwe pagina's maar op 1 plek hoeven te updaten nl. in pages.tsx
    },
    {
        path: "/index.html",
        element: <Navigate to="/" replace />
    },
    {
        path: "/",
        element: <PrivateRoute />,
        children: [{ 
            path: "/",
            element: <SharedMenu />,
            children: adminPages.map((page) => ({path: page.route, element: page.element})) //mapping zorgt ervoor dat we bij het maken van nieuwe pagina's maar op 1 plek hoeven te updaten nl. in pages.tsx
        }],
    },
]);