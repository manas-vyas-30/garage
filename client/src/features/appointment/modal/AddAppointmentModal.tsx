import {
  Autocomplete,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  createAppointment,
  getAppointmentsByUserId,
} from "../../../api/appointmentApi";
import { getCarsByUserId } from "../../../api/carApi";
import { IServiceDetails } from "../../../api/serviceApi";
import { IStore } from "../../../app/store";

const AddAppointmentModal = ({
  open,
  handleClose,
  services,
  setServices,
  setServiceIds,
}: {
  open: boolean;
  handleClose: () => void;
  services: (IServiceDetails | undefined)[];
  setServices: React.Dispatch<
    React.SetStateAction<(IServiceDetails | undefined)[]>
  >;
  setServiceIds: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
}) => {
  const isMobile = useMediaQuery("(min-width:786px)");
  const { auth, car } = useSelector((state: IStore) => state);
  const dispatch = useDispatch();
  const { _id, number } = auth.loggedInUser;
  const [date, setDate] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  let payable = 0;
  services.forEach((service) => (payable += service?.cost || 0));

  useEffect(() => {
    const action = getCarsByUserId();
    dispatch(action(auth.loggedInUser._id) as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const cars = car.cars.map((car) => {
    return `${car.name} (${car.registration})`;
  });

  const handleSubmit = async () => {
    let description = ``;

    for (let i = 0; i < services.length; i++) {
      description += `${services[i]?.name}${
        i === services.length - 1 ? "" : ", "
      }`;
    }

    const appointment = await createAppointment({
      date: date || new Date().toISOString().slice(0, 10),
      userId: _id,
      number,
      carId: value || cars[0],
      status: "pending",
      description,
      cost: payable,
    });

    if (appointment.success) {
      const appointmentAction = getAppointmentsByUserId();
      const response = await dispatch(
        appointmentAction(auth.loggedInUser._id) as unknown as AnyAction
      );
      if (response.payload) {
        Swal.fire("SUCCESS!", "Appointment created successfully!", "success");
        setServices([]);
        setServiceIds([]);
        handleClose();
      } else {
        Swal.fire("ERROR!", "Unable to create appointment. Please try again!");
      }
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
            Add Appointment
          </Typography>
          <Box sx={{ mt: 1 }}>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Autocomplete
              fullWidth
              id="vehicle"
              disablePortal
              value={value}
              onChange={(_event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={cars}
              renderInput={(params) => (
                <TextField {...params} label="Vehicle" />
              )}
              sx={{ marginTop: 2 }}
            />
            {services.map((service) => (
              <Stack
                width="100%"
                height="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={service?._id}
              >
                <Typography variant="body1" color="text.Primary">
                  {service?.name}
                </Typography>
                <Typography variant="body1" color="text.Primary">
                  {`$ ${service?.cost}`}
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
              <Typography variant="body1" color="text.Primary">
                Total Payable
              </Typography>
              <Typography variant="body1" color="text.Primary">
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
              close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddAppointmentModal;
