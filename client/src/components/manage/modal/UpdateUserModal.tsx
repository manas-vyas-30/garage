/* eslint-disable @typescript-eslint/no-empty-function */
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { IUserDetails } from "../../../api/authApi";
import { fetchUsers, updateUser } from "../../../api/userApi";

const UpdateUserModal = ({
  handleClose,
  open,
  user,
}: {
  handleClose: () => void;
  open: boolean;
  user: IUserDetails;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const updatedUser = await updateUser({
      _id: user._id,
      name: user.name,
      email: data.get("email")?.toString() || "",
      role: data.get("role")?.toString() || "",
      number: user.number,
    });

    if (updatedUser.success) {
      const response = await dispatch(fetchUsers() as unknown as AnyAction);
      if (response.payload) {
        Swal.fire("SUCCESS!", "user updated successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to update user. Please try again!",
          "error"
        );
      }
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
              defaultValue={user.email}
              disabled
            />
            <Autocomplete
              fullWidth
              id="role"
              disablePortal
              options={roles as unknown as string[]}
              defaultValue={user.role}
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
              autoFocus
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
