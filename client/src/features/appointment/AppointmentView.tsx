/* eslint-disable react-hooks/exhaustive-deps */
import EventIcon from "@mui/icons-material/Event";
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
import { getAppointmentsByUserId } from "../../api/appointmentApi";
import config from "../../api/config.json";
import { IServiceDetails, getAllServices } from "../../api/serviceApi";
import { IStore } from "../../app/store";
import AddAppointmentModal from "./modal/AddAppointmentModal";

const AppointmentView = () => {
  const { service, auth, appointment } = useSelector((state: IStore) => state);
  const [serviceIds, setServiceIds] = useState<(string | undefined)[]>([]);
  const [services, setServices] = useState<(IServiceDetails | undefined)[]>([]);
  const [openAddAppointment, setOpenAddAppointment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getAppointmentsByUserId();
    dispatch(getAllServices() as unknown as AnyAction);
    dispatch(action(auth.loggedInUser._id) as unknown as AnyAction);
  }, []);

  const handleAddAppointmentOpen = () => setOpenAddAppointment(true);
  const handleAddAppointmentClose = () => setOpenAddAppointment(false);

  return (
    <>
      <AddAppointmentModal
        open={openAddAppointment}
        handleClose={handleAddAppointmentClose}
        services={services}
        setServices={setServices}
        setServiceIds={setServiceIds}
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
              Appointments
            </Typography>
            <Box width="100%" height="100%" />
          </Stack>
          {appointment.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction="column"
              spacing={0}
            >
              {appointment.appointments.map(
                ({
                  _id,
                  carId,
                  date,
                  description,
                  cost,
                  status,
                }: {
                  _id?: string;
                  carId: string;
                  date: string;
                  description: string;
                  cost: number;
                  status: string;
                }) => (
                  <MuiCard
                    key={_id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {carId}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {date}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {`${description} (${
                          status.charAt(0).toUpperCase() + status.slice(1)
                        })`}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {`$ ${cost}`}
                      </Typography>
                    </CardContent>
                  </MuiCard>
                )
              )}
            </Stack>
          )}
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
              Services
            </Typography>
            <Box width="100%" height="100%" />
            <Badge
              badgeContent={serviceIds.length}
              color="primary"
              sx={{ mt: "12px", mr: "12px" }}
            >
              <EventIcon
                fontSize="large"
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={
                  serviceIds.length ? handleAddAppointmentOpen : undefined
                }
              />
            </Badge>
          </Stack>
          {service.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {service.services.map(
                ({
                  _id,
                  image,
                  name,
                  description,
                  cost,
                }: {
                  _id?: string;
                  image?: string;
                  name: string;
                  description: string;
                  cost: number;
                }) => (
                  <MuiCard
                    key={_id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${config.Backend_URL}${image}`}
                      alt="service"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {description}
                      </Typography>
                      <Typography variant="body2" component="div">
                        {`$ ${cost}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          setServiceIds((prevState) =>
                            serviceIds.includes(_id)
                              ? prevState.filter((id) => id !== _id)
                              : [...prevState, _id]
                          );
                          setServices((prevState) =>
                            serviceIds.includes(_id)
                              ? prevState.filter((s) => s?._id !== _id)
                              : [...prevState, { _id, name, description, cost }]
                          );
                        }}
                      >
                        {serviceIds.includes(_id as never) ? "remove" : "add"}
                      </Button>
                    </CardActions>
                  </MuiCard>
                )
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default AppointmentView;
