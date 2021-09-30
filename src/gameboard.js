import {Ships} from './ships.js'

const Gameboards = () => {
	const shipClassList = () => {

		const shipClassFactory = (name, size) => {
			return {name, size}
		}

		const classList = [
			shipClassFactory('carrier',5),
			shipClassFactory('battleship',4),
			shipClassFactory('destroyer',3),
			shipClassFactory('submarine',3),
			shipClassFactory('patrol boat',2)
		]	
		
		const getName = (index) => classList[index].name;
		const getSize = (index) => classList[index].size;

		return {getName, getSize}

	}	
	
	const placements = [];
	const missed = []

	const createProposal = (start, isVert, ship) => {
		return Array.apply(null, Array(shipClassList().getSize(ship))).map((val, index) => {
			return ((isVert) ? [start[0],(start[1]+index)] : [(start[0]+index), start[1]])
		})		
	}

	const isValidPlacement = (proposed, isVert) => {
		const isHittingBorder = (proposed) => {
			return proposed >= 10 ? true : false;
		}

		const isPortionFilled = (proposed) => {		
		
			let isFilled = false;
			proposed.every(proposedPortion => {
				const match = (portion) => portion.x === proposedPortion[0] && portion.y === proposedPortion[1];	
				const filteredShip = placements.filter(ship => (ship.portions.some(match)))		
				if (filteredShip.length > 0) {
					isFilled = true;					
					return false;
				} else {
					return true;
				}
			})    
			return isFilled;
		}
		
		const hitBorder = (isVert) ? isHittingBorder(proposed[proposed.length-1][1]) : isHittingBorder(proposed[proposed.length-1][0])		
		const portionFilled = isPortionFilled(proposed)

		return ((hitBorder) || (portionFilled)) ? false : true
	}

	const updatePlacements = (proposal) => {
		const coords = proposal.map(p => p.split('').map(Number))
		placements.push(Ships().build(coords))
	}	

	const receiveAttack = (coords) => {

		const match = (portion) => portion.x === coords[0] && portion.y === coords[1];		
	
		const filteredShip = placements.filter(ship => (ship.portions.some(match)))
		
		if (filteredShip.length > 0) {
			Ships().hit(filteredShip[0], coords)			
			Ships().isSunk(filteredShip[0])			
			return true;
		} else {
			missed.push(coords)
			return false;
		}		
	}

	const areAllSunk = () => {
		const checkSunk = (ship) => !(ship.sunk)

		if (placements.some(checkSunk)) {
			return false;
		} else {
			return true;
		}
	}
	
 	return {placements, missed, updatePlacements, receiveAttack, areAllSunk, isValidPlacement, createProposal}
}

export {Gameboards}

