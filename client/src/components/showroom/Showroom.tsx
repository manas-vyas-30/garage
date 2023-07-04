/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Car from "./Car";
import Item from "./Item";

const Showroom = () => {
  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        centered
      >
        <Tab label="item" id="0" />
        <Tab label="car" id="1" />
      </Tabs>
      {value === 0 && (
        <Typography variant="body2" color="text.secondary">
          <Item />
        </Typography>
      )}
      {value === 1 && (
        <Typography variant="body2" color="text.secondary">
          <Car />
        </Typography>
      )}
    </Box>
  );
};

export default Showroom;
