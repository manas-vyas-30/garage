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
import { IItem, createItem, getAllItems } from "../../../api/itemApi";

const AddItemModal = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const [name, setName] = useState(``);
  const [description, setDescription] = useState(``);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [sold, setSold] = useState(0);
  const [file, setFile] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file || "");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cost", cost.toString());
    formData.append("quantity", quantity.toString());
    formData.append("sold", sold.toString());

    const item = await createItem(formData as unknown as IItem);

    if (item.success) {
      const response = await dispatch(getAllItems() as unknown as AnyAction);
      if (response.payload) {
        setName(``);
        setDescription(``);
        setCost(0);
        setQuantity(0);
        setSold(0);
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
            Add Item
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
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              autoFocus
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
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
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
              value={sold}
              onChange={(e) => setSold(Number(e.target.value))}
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

export default AddItemModal;
