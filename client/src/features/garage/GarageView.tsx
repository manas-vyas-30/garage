import {
  Box,
  Button,
  CardActions,
  CardContent,
  Card as MuiCard,
  Stack,
  Typography,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getAllAppointments,
  updateAppointment,
} from "../../api/appointmentApi";
import { IStore } from "../../app/store";

export const GarageView = () => {
  const { appointment } = useSelector((state: IStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = async (
    date: string,
    userId: string,
    carId: string,
    status: string,
    description: string,
    cost: number,
    number: string,
    _id?: string
  ) => {
    const appointment = await updateAppointment({
      date,
      userId,
      carId,
      status: status === "pending" ? "in progress" : "completed",
      description,
      cost,
      number,
      _id,
    });

    if (appointment.success) {
      const response = await dispatch(
        getAllAppointments() as unknown as AnyAction
      );
      if (response.payload) {
        Swal.fire("SUCCESS!", "Status updated successfully!", "success");
      } else {
        Swal.fire(
          "ERROR!",
          "Unable to update status. Please try again!",
          "error"
        );
      }
    }
  };

  return (
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
                userId,
                date,
                description,
                cost,
                status,
                number,
              }: {
                _id?: string;
                carId: string;
                userId: string;
                date: string;
                description: string;
                cost: number;
                status: string;
                number: string;
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
                      {description}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {number}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                  </CardContent>
                  {status !== "completed" && (
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          handleChange(
                            date,
                            userId,
                            carId,
                            status,
                            description,
                            cost,
                            number,
                            _id
                          )
                        }
                      >
                        change status
                      </Button>
                    </CardActions>
                  )}
                </MuiCard>
              )
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
