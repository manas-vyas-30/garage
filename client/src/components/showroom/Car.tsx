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
import { ICarForSellDetails, getAllCarsForSell } from "../../api/carForSellApi";
import config from "../../api/config.json";
import { IStore } from "../../app/store";
import OrderCarModal from "./OrderCarModal";

const Car = () => {
  const dispatch = useDispatch();
  const { carForSell } = useSelector((state: IStore) => state);
  const [carIds, setCarIds] = useState<(string | undefined)[]>([]);
  const [cars, setCars] = useState<(ICarForSellDetails | undefined)[]>([]);
  const [openOrderCar, setOpenOrderCar] = useState(false);

  useEffect(() => {
    dispatch(getAllCarsForSell() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderCarOpen = () => setOpenOrderCar(true);
  const handleOrderCarClose = () => setOpenOrderCar(false);

  return (
    <>
      <OrderCarModal
        open={openOrderCar}
        handleClose={handleOrderCarClose}
        cars={cars}
        setCars={setCars}
        setCarIds={setCarIds}
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
              Cars
            </Typography>
            <Box width="100%" height="100%" />
            <Badge
              badgeContent={carIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <ShippingCartIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={carIds.length ? handleOrderCarOpen : undefined}
              />
            </Badge>
          </Stack>
          {carForSell.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {carForSell.cars.map((car) => (
                <MuiCard
                  key={car._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${config.Backend_URL}${car.image}`}
                    alt="car"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.registration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`$ ${car.cost}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setCarIds((prevState) =>
                          carIds.includes(car._id || ``)
                            ? prevState.filter((id) => id !== car._id)
                            : [...prevState, car._id]
                        );
                        setCars((prevState) =>
                          carIds.includes(car._id || ``)
                            ? prevState.filter((c) => c?._id !== car._id)
                            : [...prevState, car]
                        );
                      }}
                    >
                      {carIds.includes(car._id) ? "remove" : "add"}
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

export default Car;
