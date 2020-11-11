import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PersonalDetails } from '../personaldetails/personalDetails';
import { AccountDetails } from '../acoountDetails/AccountDetails';
import { Checkout } from '../Checkout/checkout';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Personal Details', 'Account Details', 'Checkout'];
}

function getStepContent(steps:any ,activeStep:any , handleNext : any , handleBack : any , formValues : any , setFormValues : any,setCheckoutDetails:any,checkoutDetails:any ,setAccountDetails:any ,accountDetails :any) {
  switch (activeStep) {
    case 0:
      return <PersonalDetails handleBack={handleBack} activeStep={activeStep} formValues={formValues} steps={steps} setFormValues={setFormValues} handleNext={handleNext}/> ;
    case 1:
      return <AccountDetails activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack}setAccountDetails={setAccountDetails} accountDetails={accountDetails}/>;
    case 2:
      return <Checkout activeStep={activeStep} steps={steps} handleNext={handleNext} handleBack={handleBack} setCheckoutDetails={setCheckoutDetails} checkoutDetails={checkoutDetails} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function FormStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formValues,setFormValues] = useState({ firstName: '', lastName: '', age:'' , email: "", password: ""})
  const steps = getSteps();
  const [accountDetails, setAccountDetails] = useState('')
  const [checkoutDetails, setCheckoutDetails] = useState('')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(steps,activeStep,handleNext,handleBack,formValues,setFormValues,accountDetails,setAccountDetails,setCheckoutDetails,checkoutDetails)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}