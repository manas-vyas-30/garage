import {
  Autocomplete,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { IUserDetails, logoutUser, updateUser } from "../../../api/authApi";

const UpdateUserModal = ({
  open,
  handleClose,
  _id,
  name,
  email,
  role = ``,
  number,
}: {
  open: boolean;
  handleClose: () => void;
  _id: string;
  name: string;
  email: string;
  role?: string;
  number: number;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let updatedUser: IUserDetails;

    if (data.get("password")) {
      updatedUser = {
        _id,
        email: data.get("email")?.toString() || "",
        name,
        password: data.get("password")?.toString() || "",
        role: data.get("role")?.toString() || "",
        number: data.get("number")?.toString() || "",
      };
    } else {
      updatedUser = {
        _id,
        email: data.get("email")?.toString() || "",
        name,
        role: data.get("role")?.toString() || "",
        number: data.get("number")?.toString() || "",
      };
    }

    const action = updateUser();
    const response = await dispatch(
      action(updatedUser) as unknown as AnyAction
    );

    if (response.payload) {
      Swal.fire("SUCCESS!", "User updated successfully!", "success");
      await dispatch(logoutUser() as unknown as AnyAction);
    } else {
      Swal.fire(
        "ERROR!",
        "User update unsuccessful. Please try again!",
        "error"
      );
    }
    handleClose();
  };

  const roles = [
    {
      label: "admin",
      value: "admin",
    },
    {
      label: "customer",
      value: "customer",
    },
    {
      label: "mechanic",
      value: "mechanic",
    },
  ];

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "auto" : "70%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="div">
            Update User
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              defaultValue={email}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              defaultValue=""
            />
            <Autocomplete
              fullWidth
              id="role"
              disablePortal
              options={roles as unknown as string[]}
              defaultValue={role}
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
              label="Number"
              name="number"
              autoComplete="number"
              type="number"
              defaultValue={number}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 0.5 }}
            >
              update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateUserModal;
