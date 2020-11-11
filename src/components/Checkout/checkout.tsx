import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@material-ui/core";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  checkoutDetails: any;
  setCheckoutDetails: any;
  activeStep: any;
  steps: any;
}
interface initialValues {
   phoneNumber: number;
   address:string
}
const initialState = {
  
  BankName: "",
  accountNumber: "",
};

export const Checkout: React.FC<Props> = ({
    handleBack,
    handleNext,
    setCheckoutDetails,
    checkoutDetails,
    activeStep,
    steps
  }) => {
    const initialValue: initialValues = checkoutDetails
    return (
        <Formik
        initialValues={initialState}
        onSubmit={(values) => {
          console.log(values);
          handleNext();
          setCheckoutDetails(values);
        }}
        validationSchema={Yup.object({
          Address: Yup.string().required("address is required"),
          phoneNumber: Yup.number()
            .required("phone Number is required")
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
                name="Address"
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
                lable=" phoneNumber"
                name="phoneNumber"
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
    )
}
