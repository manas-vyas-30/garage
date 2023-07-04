import ShippingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
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
import config from "../../api/config.json";
import { IItem, getAllItems } from "../../api/itemApi";
import { IStore } from "../../app/store";
import OrderItemModal from "./OrderItemModal";

const Item = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state: IStore) => state);
  const [itemIds, setItemIds] = useState<(string | undefined)[]>([]);
  const [items, setItems] = useState<(IItem | undefined)[]>([]);
  const [openOrderItem, setOpenOrderItem] = useState(false);

  useEffect(() => {
    dispatch(getAllItems() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderItemOpen = () => setOpenOrderItem(true);
  const handleOrderItemClose = () => setOpenOrderItem(false);

  return (
    <>
      <OrderItemModal
        open={openOrderItem}
        handleClose={handleOrderItemClose}
        items={items}
        setItems={setItems}
        setItemIds={setItemIds}
      />
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
            <Badge
              badgeContent={itemIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <ShippingCartIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={itemIds.length ? handleOrderItemOpen : undefined}
              />
            </Badge>
          </Stack>
          {item.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {item.items.map((item) => (
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
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`$ ${item.cost}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setItemIds((prevState) =>
                          itemIds.includes(item._id)
                            ? prevState.filter((id) => id !== item._id)
                            : [...prevState, item._id]
                        );
                        setItems((prevState) =>
                          itemIds.includes(item._id)
                            ? prevState.filter((i) => i?._id !== item._id)
                            : [...prevState, item]
                        );
                      }}
                    >
                      {itemIds.includes(item._id) ? "remove" : "add"}
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

export default Item;
