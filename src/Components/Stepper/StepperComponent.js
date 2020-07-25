import React, { useState } from 'react';
import { Transition, animated } from 'react-spring/renderprops';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Consent, ChooseMethod, VerifyCode, Success, Error } from './Comps';
import Grid from '@material-ui/core/Grid';
import './Stepper.style.css';

function getSteps() {
	return ['Consent', 'Verification Method', 'Verify Code'];
}
// eZM_kVDSkW3niM4D0uhwgQwk9LxKZr62H2dcfItP;
//demo data
const data = {
	userdata: {
		userId: 139939304445,
		userName: 'Akhil Gupta',
		deatils: [
			{ type: 'phone', value: '2404767867' },
			{ type: 'phone', value: 'akhil9tiet@gmail.com' },
		],
	},
	client: {
		name: 'XUZ',
		logo: 'https://github.com/account',
		redirectFrom: 'https://akhil9tiet.github.io',
		redirectTo: 'https://akhil9tiet.github.io',
	},
	otpValue: '',
};

// function getStepContent(stepIndex) {
// 	switch (stepIndex) {
// 		case 0:
// 			return <Consent />;
// 		case 1:
// 			return <ChooseMethod />;
// 		case 2:
// 			return <VerifyCode />;
// 		case 3:
// 			return <Success />;
// 		default:
// 			return <Error />;
// 	}
// }

const pages = [
	(style) => (
		<animated.div style={{ ...style, color: '#ff2' }}>
			<Consent />
		</animated.div>
	),
	(style) => (
		<animated.div style={{ ...style, color: '#ff2' }}>
			<ChooseMethod />
		</animated.div>
	),
	(style) => (
		<animated.div style={{ ...style, color: '#ff2' }}>
			<VerifyCode />
		</animated.div>
	),
];

function buttonName(stepIndex) {
	switch (stepIndex) {
		case 0:
			return 'Allow';
		case 1:
			return 'Next';
		case 2:
			return 'Submit';
		case 3:
			return 'OK';
		default:
			return 'Error';
	}
}

const StepperComponent = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [pos, setPos] = useState({ enter: 0, exit: 0 });
	const steps = getSteps();

	const handleNext = () => {
		setPos({ enter: 100, exit: -50 });
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setPos({ enter: -100, exit: 50 });
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div style={{ paddingLeft: 50 }}>
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
						// <div>
						// 	<Typography>All steps completed</Typography>
						// 	<Button onClick={handleReset}>Reset</Button>
						// </div>
						(style) => (
							<animated.div style={{ ...style, color: '#ff2' }}>
								<Success />
							</animated.div>
						)
					) : (
						<div className='main'>
							<Transition
								native
								reset
								unique
								items={activeStep}
								from={{ opacity: 0, transform: `translate3d(${pos.enter}%,0,0)` }}
								enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
								leave={{ opacity: 0, transform: `translate3d(${pos.exit}%,0,0)` }}>
								{/* {getStepContent(activeStep)} */}
								{(index) => pages[index]}
							</Transition>
						</div>
					)}
				</Grid>
				<Grid item xs={12}>
					<div className='actions'>
						<Button
							disabled={activeStep === 0 || activeStep === 1 || activeStep === steps.length}
							onClick={handleBack}>
							Back
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={handleNext}
							disabled={buttonName(activeStep) === 'OK'}>
							{buttonName(activeStep)}
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default StepperComponent;
