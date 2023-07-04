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
import { deleteCar, getCarsByUserId } from "../../api/carApi";
import config from "../../api/config.json";
import { IStore } from "../../app/store";
import AddCarModal from "../car/modal/AddCarModal";
import UpdateCarModal from "../car/modal/UpdateCarModal";
import UpdateUserModal from "./modal/UpdateUserModal";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth, car } = useSelector((state: IStore) => state);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [openAddCar, setOpenAddCar] = useState(false);
  const [openUpdateCar, setOpenUpdateCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    _id: "0",
    name: ``,
    registration: ``,
  });
  const { _id, name, email, role, number } = auth.loggedInUser;

  useEffect(() => {
    const action = getCarsByUserId();
    dispatch(action(_id) as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserOpen = () => setOpenUpdateUser(true);
  const handleUpdateUserClose = () => setOpenUpdateUser(false);

  const handleAddCarOpen = () => setOpenAddCar(true);
  const handleAddCarClose = () => setOpenAddCar(false);

  const handleUpdateCarOpen = () => setOpenUpdateCar(true);
  const handleUpdateCarClose = () => setOpenUpdateCar(false);

  return (
    <>
      <UpdateUserModal
        open={openUpdateUser}
        handleClose={handleUpdateUserClose}
        _id={_id}
        name={name}
        email={email}
        role={role}
        number={number}
      />
      <AddCarModal
        open={openAddCar}
        handleClose={handleAddCarClose}
        _id={_id}
      />
      <UpdateCarModal
        open={openUpdateCar}
        handleClose={handleUpdateCarClose}
        _id={_id}
        carId={selectedCar._id}
        carName={selectedCar.name}
        carRegistration={selectedCar.registration}
      />
      <Stack width="100%" height="100%" alignItems="center" gap={1}>
        <Stack width="100%" height="100%" alignItems="center" gap={1}>
          <Typography variant="h4" color="text.Primary">
            User
          </Typography>
          <MuiCard
            sx={{
              bgcolor: "text.disabled",
              minWidth: "210px",
              margin: "4px",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {number}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleUpdateUserOpen}>
                update
              </Button>
            </CardActions>
          </MuiCard>
        </Stack>
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
          {car.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {car.cars.map((car) => {
                return (
                  <MuiCard
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                    key={car._id}
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
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedCar({
                            _id: car._id || "",
                            name: car.name,
                            registration: car.registration,
                          });
                          handleUpdateCarOpen();
                        }}
                      >
                        update
                      </Button>
                      <Button
                        size="small"
                        onClick={async () => {
                          const carId = car._id;
                          const deleteAction = deleteCar();
                          const response = await dispatch(
                            deleteAction(carId || "") as unknown as AnyAction
                          );

                          if (response.payload) {
                            const action = getCarsByUserId();
                            await dispatch(action(_id) as unknown as AnyAction);

                            Swal.fire(
                              "SUCCESS!",
                              "Car Deleted successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to delete car. Please try again!",
                              "error"
                            );
                          }
                        }}
                      >
                        delete
                      </Button>
                    </CardActions>
                  </MuiCard>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
