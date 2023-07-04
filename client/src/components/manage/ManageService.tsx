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
import {
  IServiceDetails,
  deleteService,
  getAllServices,
} from "../../api/serviceApi";
import { IStore } from "../../app/store";
import AddServiceModal from "./modal/AddServiceModal";
import UpdateServiceModal from "./modal/UpdateServiceModal";

const ManageService = () => {
  const dispatch = useDispatch();
  const { service } = useSelector((state: IStore) => state);
  const [openAddService, setOpenAddService] = useState(false);
  const [openUpdateService, setOpenUpdateService] = useState(false);
  const [selectedService, setSelectedService] = useState<IServiceDetails>();

  useEffect(() => {
    dispatch(getAllServices() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddServiceOpen = () => setOpenAddService(true);
  const handleAddServiceClose = () => setOpenAddService(false);

  const handleUpdateServiceOpen = () => setOpenUpdateService(true);
  const handleUpdateServiceClose = () => setOpenUpdateService(false);

  return (
    <>
      <AddServiceModal
        open={openAddService}
        handleClose={handleAddServiceClose}
      />
      {selectedService && (
        <UpdateServiceModal
          open={openUpdateService}
          handleClose={handleUpdateServiceClose}
          service={selectedService}
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
              Services
            </Typography>
            <Box width="100%" height="100%" />
            <AddCircleIcon
              fontSize="large"
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={handleAddServiceOpen}
            />
          </Stack>
          {service.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction="column"
              spacing={0}
            >
              {service.services.map((service: IServiceDetails) => (
                <MuiCard
                  key={service._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${config.Backend_URL}${service.image}`}
                    alt="service"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {service.description}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {`$ ${service.cost}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedService(service);
                        handleUpdateServiceOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedService = await deleteService(
                          service._id || ""
                        );
                        if (deletedService.success) {
                          const response = await dispatch(
                            getAllServices() as unknown as AnyAction
                          );
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "Service deleted successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to delete service. Please try again!",
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

export default ManageService;
