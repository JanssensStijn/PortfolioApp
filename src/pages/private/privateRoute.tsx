import {
  Box,
  CircularProgress,
} from "@mui/material";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/userProvider";

export const PrivateRoute: FC = () => {
  const { user, isLoading } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {if (!isLoading && !user) {
    navigate('/login');
}}, [user, navigate, isLoading]);

  if (isLoading) {
    return (
      <Box
        height="100vh"
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box flexGrow={1} overflow="auto" display="flex" flexDirection="column">
        <Outlet />
      </Box>
    </Box>
  );
};
