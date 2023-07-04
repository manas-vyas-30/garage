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
  IServiceDetails,
  getAllServices,
  updateService,
} from "../../../api/serviceApi";

const UpdateServiceModal = ({
  handleClose,
  open,
  service,
}: {
  handleClose: () => void;
  open: boolean;
  service: IServiceDetails;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();

  useEffect(() => {}, [service]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("_id", service._id || "");
    formData.append("name", data.get("name") || ``);
    formData.append("description", data.get("description") || ``);
    formData.append("cost", data.get("cost") || ``);

    const updatedService = await updateService(
      formData as unknown as IServiceDetails
    );

    if (updatedService.success) {
      const response = await dispatch(getAllServices() as unknown as AnyAction);
      if (response.payload) {
        setFile(undefined);
        Swal.fire("SUCCESS!", "service updated successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to update service. Please try again!",
          "error"
        );
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
            Update Service
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
              defaultValue={service.name}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              type="text"
              defaultValue={service.description}
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
              defaultValue={service.cost}
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

export default UpdateServiceModal;
