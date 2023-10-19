import React from "react";
import { Typography } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./checkoutstepprocess.css";
const CheckOutStepProces = (props) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const { processStep } = props;
  return (
    <>
      <Stepper
        activeStep={processStep}
        alternativeLabel
        style={{ boxSizing: "border-box" }}
        className="headpart"
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={processStep === index ? true : false}
            completed={processStep === index ? true : false}
          >
            <StepLabel
              style={{ color: processStep >= index ? "tomato" : "" }}
              icon={item.icon}
            >
              {" "}
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckOutStepProces;
