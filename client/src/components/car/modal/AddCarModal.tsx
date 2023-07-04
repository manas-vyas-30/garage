import {
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ICarDetails, addCar } from "../../../api/carApi";

const AddCarModal = ({
  open,
  handleClose,
  _id,
}: {
  open: boolean;
  handleClose: () => void;
  _id: string;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [name, setName] = useState(``);
  const [registration, setRegistration] = useState(``);
  const [file, setFile] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file || "");
    formData.append("name", name);
    formData.append("registration", registration);
    formData.append("userId", _id);

    const action = addCar();
    const response = await dispatch(
      action(formData as unknown as ICarDetails) as unknown as AnyAction
    );

    if (response.payload) {
      Swal.fire("SUCCESS!", "Car added successfully!", "success");
    } else {
      Swal.fire("ERROR!", "Unable to add car. Please try again!", "error");
    }
    handleClose();
  };
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
            Add Car
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="registration"
              label="Registration"
              name="registration"
              autoComplete="registration"
              type="text"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
            />
            <input
              id="file"
              name="file"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              style={{ marginBottom: "4px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 0.5 }}
            >
              add
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

export default AddCarModal;
