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
import { IItem, getAllItems, updateItem } from "../../../api/itemApi";

const UpdateItemModal = ({
  handleClose,
  open,
  item,
}: {
  handleClose: () => void;
  open: boolean;
  item: IItem;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();

  useEffect(() => {}, [item]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    formData.append("_id", item._id || "");
    formData.append("name", data.get("name") || ``);
    formData.append("description", data.get("description") || ``);
    formData.append("cost", data.get("cost") || ``);
    formData.append("quantity", data.get("quantity") || ``);
    formData.append("sold", data.get("sold") || ``);

    const updatedCar = await updateItem(formData as unknown as IItem);

    if (updatedCar.success) {
      const response = await dispatch(getAllItems() as unknown as AnyAction);
      if (response.payload) {
        setFile(undefined);
        Swal.fire("SUCCESS!", "Item added successfully!", "success");
      } else {
        Swal.fire("ERROR!", "Unable to add item. Please try again!", "error");
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
            Update Item
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
              defaultValue={item.name}
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
              defaultValue={item.description}
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
              defaultValue={item.cost}
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
              defaultValue={item.quantity}
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
              defaultValue={item.sold}
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

export default UpdateItemModal;
