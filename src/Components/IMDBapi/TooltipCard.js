import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';

const TooltipCard = ({ data }) => {
	return (
		<Card>
			<CardMedia
				className={'cover'}
				image='/static/images/cards/live-from-space.jpg'
				title='Live from space album cover'
			/>
			<div className='details'>
				<CardContent className={'content'}>
					<Typography component='h2' variant='h2'>
						Live From Space
					</Typography>
					<Typography variant='subtitle1' color='textSecondary'>
						Mac Miller
					</Typography>
				</CardContent>
				<div className={'controls'}>
					<p>Akhil</p>
				</div>
			</div>
		</Card>
	);
};

export default TooltipCard;
