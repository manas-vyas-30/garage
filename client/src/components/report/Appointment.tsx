import {
  Autocomplete,
  Box,
  CardContent,
  Card as MuiCard,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IAppointmentDetails,
  getAllAppointments,
} from "../../api/appointmentApi";
import { IStore } from "../../app/store";

const Appointment = () => {
  const dispatch = useDispatch();
  const { appointment } = useSelector((state: IStore) => state);
  const isMobile = useMediaQuery("(min-width:768px)");
  const [appStatus, setAppStatus] = useState({ label: "All Appointments" });
  const [filteredAppointments, setFilteredAppointments] =
    useState<IAppointmentDetails[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllAppointments() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = [
    {
      label: "Pending",
      value: 0,
    },
    {
      label: "In Progress",
      value: 1,
    },
    {
      label: "Completed",
      value: 2,
    },
    {
      label: "All Appointments",
      value: 3,
    },
  ];

  const generateAppointmentsByStatus = (status: string) => {
    let filteredAppointments = [];
    if (
      status === "Pending" ||
      status === "In Progress" ||
      status === "Completed"
    ) {
      filteredAppointments = appointment.appointments.filter(
        (appointmentDetails) =>
          appointmentDetails.status.toLowerCase() === status.toLowerCase()
      );
    } else {
      filteredAppointments = appointment.appointments;
    }
    setFilteredAppointments(filteredAppointments);
  };

  useEffect(() => {
    generateAppointmentsByStatus(
      appStatus?.label ? appStatus?.label : "App Appointments"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStatus, appointment.appointments]);

  return (
    <>
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
              Appointment
            </Typography>
            <Box width="100%" height="100%" />
          </Stack>
          <Stack
            width={isMobile ? "50%" : "100%"}
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Box width="100%" height="100%" />
            <Autocomplete
              fullWidth
              id="status"
              disablePortal
              options={status}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                />
              )}
              value={appStatus}
              onChange={(event, newValue) => {
                console.log(event);
                setAppStatus({ label: newValue?.label || `` });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="search"
              label="Search"
              name="search"
              autoComplete="search"
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Box width="100%" height="100%" />
          </Stack>
          {appointment.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
            >
              {filteredAppointments
                ?.filter((app) => {
                  if (search === "") {
                    return app;
                  } else if (
                    app.carId.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.date.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  } else if (
                    app.description.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return app;
                  }
                })
                .map((appointment) => (
                  <MuiCard
                    key={appointment._id}
                    sx={{
                      bgcolor: "text.disabled",
                      minWidth: "210px",
                      margin: "4px",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {appointment.carId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`${appointment.description} (${
                          appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)
                        })`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`$ ${appointment.cost}`}
                      </Typography>
                    </CardContent>
                  </MuiCard>
                ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Appointment;
