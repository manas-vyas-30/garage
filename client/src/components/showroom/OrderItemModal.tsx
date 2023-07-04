import {
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IItem } from "../../api/itemApi";
import { createOrder } from "../../api/orderApi";
import { IStore } from "../../app/store";

const OrderItemModal = ({
  open,
  handleClose,
  items,
  setItems,
  setItemIds,
}: {
  open: boolean;
  handleClose: () => void;
  items: (IItem | undefined)[];
  setItems: React.Dispatch<React.SetStateAction<(IItem | undefined)[]>>;
  setItemIds: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
}) => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const { auth, item } = useSelector((state: IStore) => state);
  const { _id, name } = auth.loggedInUser;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [item]);

  let payable = 0;
  items.forEach((item) => (payable += item?.cost || 0));

  const handleSubmit = async () => {
    let productId = ``;
    let productName = ``;
    for (let i = 0; i < items.length; i++) {
      productId += `${items[i]?._id}${i === items.length - 1 ? "" : ", "}`;
      productName += `${items[i]?.name}${i === items.length - 1 ? "" : ", "}`;
    }

    const order = await createOrder({
      userId: _id,
      username: name,
      productId,
      productName,
      price: payable,
    });
    if (order.success) {
      Swal.fire("SUCCESS!", "Order created successfully!", "success");
      setItems([]);
      setItemIds([]);
      handleClose();
    } else {
      Swal.fire("ERROR!", "Unable to create order. Please try again!", "error");
    }
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
            Order Items
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {items.map((item) => (
              <Stack
                width="100%"
                height="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={item?._id}
              >
                <Typography variant="body2" color="text.Primary">
                  {item?.name}
                </Typography>
                <Typography variant="body2" color="text.Primary">
                  {`$ ${item?.cost}`}
                </Typography>
              </Stack>
            ))}
            <Stack
              width="100%"
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: "4px" }}
            >
              <Typography variant="body2" color="text.Primary">
                Total Payable
              </Typography>
              <Typography variant="body2" color="text.Primary">
                {`$ ${payable}`}
              </Typography>
            </Stack>
            <Button type="submit" fullWidth sx={{ mb: 0.5, border: "none" }}>
              <PayPalScriptProvider
                options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    console.log(data);
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: { value: payable.toString() },
                        },
                      ],
                    });
                  }}
                  onApprove={async (_data, actions) => {
                    if (actions.order) {
                      handleSubmit();
                      return actions.order.capture().then(function () {
                        () => handleSubmit();
                      });
                    } else {
                      return new Promise(() => console.log()).then(() =>
                        handleSubmit()
                      );
                    }
                  }}
                />
              </PayPalScriptProvider>
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

export default OrderItemModal;
