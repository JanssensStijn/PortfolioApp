import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../providers/userProvider";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Login } from "@mui/icons-material";

export const LoginPage: FC = () => {
  const [captchaSuccess, setCaptchaSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signin } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const onSignin = async () => {
    const result = await signin(email, password);

    if (result.error) {
      console.error(result.error);
    }
    if (result.user) {
      navigate("/Dashboard");
    }
  };

  return (
    <Box display="flex" flex={1} flexDirection="column" textAlign="center" alignItems="center">
      <Typography variant="h3" sx={{color: 'var(--accentColor)', marginBottom:"20px"}}>Login</Typography>
      <Typography variant="h4" sx={{marginBottom:"20px"}}>For administrators only</Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={1}
      >
        <Paper elevation={3}>
          <Box
            display="flex"
            flexDirection="column"
            maxWidth="500px"
            width={1}
            padding={2}
            gap={2}
          >
            <TextField
              variant="outlined"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              label="Password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box display="flex" gap={2}>
              <ReCAPTCHA
                sitekey= {process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
                onChange={() => setCaptchaSuccess(true)} 
                onExpired={() => setCaptchaSuccess(false)}
                onError={() => setCaptchaSuccess(false)}
              />

              {captchaSuccess && 
              <Button
                startIcon={<Login/>}
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSignin}
              >
                Signin
              </Button>}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
