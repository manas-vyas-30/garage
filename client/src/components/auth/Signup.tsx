import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupUser } from "../../api/authApi";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const action = signupUser();
    const response = await dispatch(
      action({
        name: data.get("name")?.toString() || "",
        email: data.get("email")?.toString() || "",
        password: data.get("password")?.toString() || "",
        role: data.get("role")?.toString() || "",
        number: data.get("number")?.toString() || "",
      }) as unknown as AnyAction
    );

    if (response.payload) {
      Swal.fire("SUCCESS!", "User registered successfully!", "success");
      navigate("/");
    } else {
      Swal.fire("ERROR!", "User already exists. Please try again!", "error");
    }
  };

  const roles = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Customer",
      value: "customer",
    },
    {
      label: "Mechanic",
      value: "mechanic",
    },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            type="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            type="password"
          />
          <Autocomplete
            fullWidth
            id="role"
            disablePortal
            options={roles}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
              />
            )}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="number"
            label="number"
            name="number"
            autoComplete="number"
            type="number"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              Already Have an Account <Link to="/login">Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ marginTop: 1 }}
      >
        {`Copyright &copy; Manas' Garage ${new Date().getFullYear()}`}
      </Typography>
    </Container>
  );
};

export default Signup;
