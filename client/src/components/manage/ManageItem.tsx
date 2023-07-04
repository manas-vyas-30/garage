import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Stack,
  Typography,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import config from "../../api/config.json";
import { IItem, deleteItem, getAllItems } from "../../api/itemApi";
import { IStore } from "../../app/store";
import AddItemModal from "./modal/AddItemModal";
import UpdateItemModal from "./modal/UpdateItemModal";

const ManageItem = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state: IStore) => state);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem>();

  useEffect(() => {
    dispatch(getAllItems() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItemOpen = () => setOpenAddItem(true);
  const handleAddItemClose = () => setOpenAddItem(false);

  const handleUpdateItemOpen = () => setOpenUpdateItem(true);
  const handleUpdateItemClose = () => setOpenUpdateItem(false);

  return (
    <>
      <AddItemModal open={openAddItem} handleClose={handleAddItemClose} />
      {selectedItem && (
        <UpdateItemModal
          open={openUpdateItem}
          handleClose={handleUpdateItemClose}
          item={selectedItem}
        />
      )}
      <Stack width="100%" height="100%" alignItems="center" gap={1}>
        <Stack width="100%" height="100%" alignItems="center" gap={1}>
          <Stack
            width="100%"
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width="100%" height="100%" />
            <Typography variant="h4" color="text.Primary">
              Items
            </Typography>
            <Box width="100%" height="100%" />
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddItemOpen}
            />
          </Stack>
          {item.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction="column"
              spacing={0}
            >
              {item.items.map((item: IItem) => (
                <MuiCard
                  key={item._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${config.Backend_URL}${item.image}`}
                    alt="item"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`$ ${item.cost}`}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`Qty: ${item.quantity}`}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`Sold: ${item.sold}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedItem(item);
                        handleUpdateItemOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedItem = await deleteItem(item._id || "");
                        if (deletedItem.success) {
                          const response = await dispatch(
                            getAllItems() as unknown as AnyAction
                          );
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "Item deleted successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to delete item. Please try again!",
                              "error"
                            );
                          }
                        }
                      }}
                    >
                      delete
                    </Button>
                  </CardActions>
                </MuiCard>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ManageItem;
