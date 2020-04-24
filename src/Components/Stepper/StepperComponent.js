import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Consent, ChooseMethod, VerifyCode } from './Comps';

function getSteps() {
	return ['Consent', 'Verification Method', 'Verify Code'];
}

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
		<div>
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
						<Typography>All steps completed</Typography>
						<Button onClick={handleReset}>Reset</Button>
					</div>
				) : (
					<div>
						<Typography>{getStepContent(activeStep)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack}>
								Back
							</Button>
							<Button variant='contained' color='primary' onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StepperComponent;
