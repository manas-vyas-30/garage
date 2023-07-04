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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IUserDetails } from "../../api/authApi";
import { deleteUser, fetchUsers } from "../../api/userApi";
import { IStore } from "../../app/store";
import UpdateUserModal from "./modal/UpdateUserModal";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IStore) => state);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserDetails>();

  useEffect(() => {
    dispatch(fetchUsers() as unknown as AnyAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserOpen = () => setOpenUpdateUser(true);
  const handleUpdateUserClose = () => setOpenUpdateUser(false);

  return (
    <>
      {selectedUser && (
        <UpdateUserModal
          open={openUpdateUser}
          handleClose={handleUpdateUserClose}
          user={selectedUser}
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
              Users
            </Typography>
            <Box width="100%" height="100%" />
          </Stack>
          {user.loading ? (
            <Box>Loading...</Box>
          ) : (
            <Stack
              sx={{ flexWrap: "wrap", margin: "2px" }}
              direction="column"
              spacing={0}
            >
              {user.users.map((user: IUserDetails) => (
                <MuiCard
                  key={user._id}
                  sx={{
                    bgcolor: "text.disabled",
                    minWidth: "210px",
                    margin: "4px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user.email}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user.role}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {user.number}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        handleUpdateUserOpen();
                      }}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const deletedUser = await deleteUser(user._id || "");
                        if (deletedUser.success) {
                          const response = await dispatch(
                            fetchUsers() as unknown as AnyAction
                          );
                          if (response.payload) {
                            Swal.fire(
                              "SUCCESS!",
                              "User deleted successfully!",
                              "success"
                            );
                          } else {
                            Swal.fire(
                              "ERROR!",
                              "Unable to delete user. Please try again!",
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

export default ManageUser;
