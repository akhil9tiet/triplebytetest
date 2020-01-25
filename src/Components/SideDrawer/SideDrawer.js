import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

export default function TemporaryDrawer() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		left: false
	});

	const toggleDrawer = (side, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = (side) => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}>
			<List>
				{['dad-jokes', 'list-cards'].map((text, index) => (
					<ListItem button key={text}>
						<Link to={`/${text}`}>
							<ListItemText primary={text} />
						</Link>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<Button onClick={toggleDrawer('left', true)}>
				<MenuIcon />
			</Button>
			<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
				{sideList('left')}
			</Drawer>
		</div>
	);
}
