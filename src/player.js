import {Game} from './game'
import {Gameboards} from './gameboard'

const Player = () => {
	const humanPlayer = () => {

		const playerBoard = Gameboards();
	
		const proposal = (cellHover, isVert) => {
			const start = cellHover.split('').map(Number)
			
			const currentPlacement = playerBoard.placements.length;
	
			const proposal = playerBoard.createProposal(start, isVert, currentPlacement)
			const isValid = playerBoard.isValidPlacement(proposal, isVert)
			
			return isValid ? proposal : [proposal[0]]
		}
	
		const updatePlacements = (proposal) => {	
			playerBoard.updatePlacements(proposal)			
		}	

		const areAllShipsPlaced = () => {
			if (playerBoard.placements.length === 5) {
				Game().setUpGame()
			}
			
		}
		


		return {playerBoard, proposal, updatePlacements, areAllShipsPlaced}
	}
	
	const aiPlayer = () => {
		const randomAttack = () => {
			const prevAttacks = [];
			const randomSquare = () => Math.floor(Math.random()*10);
			const checkIfDupAttack = (coords) =>  prevAttacks.includes(randomCoords)
	
			const randomCoords = [randomSquare,randomSquare]
	
			if (!(checkIfDupAttack)) {			
				Gameboards().receiveAttack([randomSquare,randomSquare])		
	
			}
		}
	}

	return {humanPlayer, aiPlayer}
}

export {Player}