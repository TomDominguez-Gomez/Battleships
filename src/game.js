import setup from '../components/setup';
import {Player} from './player.js';


const Game = () => {

	const setUpPlacements = () => {
		const player1 = Player().humanPlayer();
		const player2 = Player().aiPlayer();
		setup().createPage();	
		setup().displayBoard('player-one');
		setup().addPlacementEvents(player1)
	}

	const setUpGame = () => {
		console.log('setting up game')
	}

	return {setUpPlacements, setUpGame}
};

Game().setUpPlacements();

export {Game}