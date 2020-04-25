import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Consent, ChooseMethod, VerifyCode } from './Comps';
import Grid from '@material-ui/core/Grid';

function getSteps() {
	return ['Consent', 'Verification Method', 'Verify Code'];
}
// eZM_kVDSkW3niM4D0uhwgQwk9LxKZr62H2dcfItP;
//demo data
const data = {
	userdata: { userId: 139939304445, 
		userName: 'Akhil Gupta', 
		deatils:[
			{type:'phone', value: '2404767867'}, 
			{type:'phone', value: 'akhil9tiet@gmail.com' }
		]},
	client: { name: 'XUZ', 
	logo:'https://github.com/account',
	redirectFrom: 'https://akhil9tiet.github.io', 
	redirectTo: 'https://akhil9tiet.github.io' },
	otpValue:''
};

function getStepContent(stepIndex) {
	switch (stepIndex) {
		case 0:
			return <Consent />;
		case 1:
			return <ChooseMethod />;
		case 2:
			return <VerifyCode />;
		default:
			return 'Unknown stepIndex';
	}
}

function buttonName(stepIndex) {
	switch (stepIndex) {
		case 0:
			return 'Allow';
		case 1:
			return 'Next';
		case 2:
			return 'Submit';
		default:
			return 'Error';
	}
}

const StepperComponent = () => {
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

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
		<div style={{ paddingLeft: 150 }}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Grid>
				<Grid item xs={12} alignContent='center'>
					{activeStep === steps.length ? (
						<div>
							<Typography>All steps completed</Typography>
							<Button onClick={handleReset}>Reset</Button>
						</div>
					) : (
						<div>{getStepContent(activeStep)}</div>
					)}
				</Grid>
				<Grid item xs={12}>
					<div>
						<Button disabled={activeStep === 0 || activeStep === 1} onClick={handleBack}>
							Back
						</Button>
						<Button variant='contained' color='primary' onClick={handleNext}>
							{buttonName(activeStep)}
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default StepperComponent;
