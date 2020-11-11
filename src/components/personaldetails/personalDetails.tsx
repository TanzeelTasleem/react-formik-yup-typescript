import React from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField } from "@material-ui/core";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  setFormValues: any;
  formValues: any;
  activeStep :any;
  steps: any
}

interface InitialState {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
}
export const PersonalDetails: React.FC<Props> = ({
  handleBack,
  handleNext,
  formValues,
  setFormValues,
  activeStep,
  steps
}) => {
    const initialValue: InitialState = formValues
  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values) => {
        console.log(values);
        handleNext();
        setFormValues(values)
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required("First Name is required")
          .min(3, "minimun 3 words are required")
          .max(15, "15 alphabates limit"),

        lastName: Yup.string()
          .required("last Name is required")
          .min(3, "minimun 3 words are required")
          .max(15, "15 alphabates limit"),
        age: Yup.number()
          .required("Age is required")
          .min(15, "under 15 is not allowed")
          .max(55, "above 55 are not allowed"),
        email: Yup.string()
          .required("email is required")
          .email("enter valid email"),
        password: Yup.string()
          .required("Password is Required")
          .min(10, "length > 10"),
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
              placeholder="First Name"
              lable="First Name"
              name="firstName"
            />
            <ErrorMessage
              name="firstName"
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
              placeholder="Last Name"
              lable="Last Name"
              name="lastName"
            />
            <ErrorMessage
              name="lastName"
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
              placeholder="Age"
              lable="Age"
              name="age"
            />
            <ErrorMessage
              name="age"
              render={(msg) => (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Field
              type="email"
              as={TextField}
              placeholder="Email"
              variant="outlined"
              name="email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Field
              type="password"
              as={TextField}
              placeholder="Password"
              variant="outlined"
              name="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <p style={{ color: "red", margin: "0", fontSize: "12px" }}>
                  {msg}
                </p>
              )}
            />
            <Box m={2} />
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary" >
              {activeStep === steps.length - 1 ? "Finish" : "submit"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
