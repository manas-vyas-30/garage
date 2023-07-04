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
import {
  ICarForSellDetails,
  deleteCarForSell,
  getAllCarsForSell,
} from "../../api/carForSellApi";
import config from "../../api/config.json";
import { IStore } from "../../app/store";
import AddCarForSellModal from "./modal/AddCarForSellModal";
import UpdateCarForSellModal from "./modal/UpdateCarForSellModal";

const ManageCarForSell = () => {
  const dispatch = useDispatch();
  const { carForSell } = useSelector((state: IStore) => state);
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openUpdateCar, setOpenUpdateCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICarForSellDetails>();

  useEffect(() => {
    dispatch(getAllCarsForSell() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCarOpen = () => setOpenAddCar(true);
  const handleAddCarClose = () => setOpenAddCar(false);

  const handleUpdateCarOpen = () => setOpenUpdateCar(true);
  const handleUpdateCarClose = () => setOpenUpdateCar(false);

  return (
    <>
      <AddCarForSellModal open={openAddCar} handleClose={handleAddCarClose} />
      {selectedCar && (
        <UpdateCarForSellModal
          open={openUpdateCar}
          handleClose={handleUpdateCarClose}
          car={selectedCar}
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
              Cars
            </Typography>
            <Box width="100%" height="100%" />
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddCarOpen}
            />
          </Stack>
          {carForSell.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction="column"
              spacing={0}
            >
              {carForSell.cars.map((car: ICarForSellDetails) => (
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
                    <Typography variant="body2" component="div">
                      {car.registration}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`$ ${car.cost}`}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`Qty: ${car.quantity}`}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`Sold: ${car.sold}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedCar(car);
                        handleUpdateCarOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedCar = await deleteCarForSell(
                          car._id || ""
                        );
                        if (deletedCar.success) {
                          const response = await dispatch(
                            getAllCarsForSell() as unknown as AnyAction
                          );
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "Car deleted successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to delete car. Please try again!",
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

export default ManageCarForSell;
