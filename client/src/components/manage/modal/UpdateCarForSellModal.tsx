/* eslint-disable @typescript-eslint/no-empty-function */
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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  ICarForSellDetails,
  getAllCarsForSell,
  updateCarForSell,
} from "../../../api/carForSellApi";

const UpdateCarForSellModal = ({
  handleClose,
  open,
  car,
}: {
  handleClose: () => void;
  open: boolean;
  car: ICarForSellDetails;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();

  useEffect(() => {}, [car]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("_id", car._id || "");
    formData.append("name", data.get("name") || ``);
    formData.append("registration", data.get("registration") || ``);
    formData.append("cost", data.get("cost") || ``);
    formData.append("quantity", data.get("quantity") || ``);
    formData.append("sold", data.get("sold") || ``);

    const updatedCar = await updateCarForSell(
      formData as unknown as ICarForSellDetails
    );

    if (updatedCar.success) {
      const response = await dispatch(
        getAllCarsForSell() as unknown as AnyAction
      );
      if (response.payload) {
        setFile(undefined);
        Swal.fire("SUCCESS!", "Car updated successfully!", "success");
      } else {
        Swal.fire("ERROR!", "Unable to update car. Please try again!", "error");
      }
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
            Update Car
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
              defaultValue={car.name}
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
              defaultValue={car.registration}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cost"
              label="Cost"
              name="cost"
              autoComplete="name"
              type="number"
              defaultValue={car.cost}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
              type="number"
              defaultValue={car.quantity}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sold"
              label="Sold"
              name="sold"
              autoComplete="sold"
              type="number"
              defaultValue={car.sold}
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

export default UpdateCarForSellModal;
