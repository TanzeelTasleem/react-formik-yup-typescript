import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@material-ui/core";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  accountDetails: any;
  setAccountDetails: any;
  activeStep: any;
  steps: any;
}
interface initialValues {
  pin: number | null;
  BankName: string;
  accountNumber: string;
}
const initialState = {
  pin: null,
  BankName: "",
  accountNumber: "",
};
export const AccountDetails: React.FC<Props> = ({
  handleBack,
  handleNext,
  accountDetails,
  setAccountDetails,
  activeStep,
  steps
}) => {
    const initialValue: initialValues = accountDetails
  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values) => {
        console.log(values);
        handleNext();
        setAccountDetails(values);
      }}
      validationSchema={Yup.object({
        accountNumber: Yup.string().required("account Number is required"),
        BankName: Yup.string()
          .required("Bank Name is required")
          .max(45, "15 alphabates limit"),

        pin: Yup.number().required("Pin is Required").min(4, "length > 4"),
        //  .matches( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ,"must contain one capital letter number and special Character")
      })}
    >
      {(formik) => (
        <Form>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Field
              type="text"
              as={TextField}
              variant="outlined"
              placeholder="Enter Account Number"
              lable="Enter Account Number"
              name="accountNumber"
            />
            <ErrorMessage
              name="accountNumber"
              render={(msg) => (
                <p style={{ color: "red", fontSize: "12px", margin: "0" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Field
              type="text"
              as={TextField}
              variant="outlined"
              placeholder="Bank Name"
              lable=" BankName"
              name="BankName"
            />
            <ErrorMessage
              name="BankName"
              render={(msg) => (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Field
              type="number"
              as={TextField}
              variant="outlined"
              placeholder="Enter Pin"
              lable="pin"
              name="pin"
            />
            <ErrorMessage
              name="pin"
              render={(msg) => (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {activeStep === steps.length - 1 ? "Finish" : "submit"}
            </Button>{" "}
          </Box>
        </Form>
      )}
    </Formik>
  );
};
