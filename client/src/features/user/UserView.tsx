import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../api/userApi";
import { IStore } from "../../app/store";

export const UserView = () => {
  const user = useSelector((state: IStore) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers() as unknown as AnyAction);
  });

  return (
    <div>
      <h2>List Of Users</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error && <div>Error: {user.error}</div>}
      {!user.loading && user.users && (
        <ul>
          {user.users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
