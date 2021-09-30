import {Gameboards} from './gameboard'

beforeEach(() => {
	return playerGameboard = Gameboards();
})

test('Valid placement', () => {
	const start = [0,0];
	const isVert = true;
	const ship = 4;
	
	expect(playerGameboard.isValidPlacement(start, isVert, ship)).toBe(true)
})

test('Invalid placement, hit border vertically', () => {
	const start = [0,9];
	const isVert = true;
	const ship = 4;
	const testProposal = playerGameboard.createProposal(start, isVert, ship)

	expect(playerGameboard.isValidPlacement(testProposal, isVert)).toBe(false)
})

test('Invalid placement, hit border horizontally', () => {
	const start = [9,0];
	const isVert = false;
	const ship = 4;
	const testProposal = playerGameboard.createProposal(start, isVert, ship)
	
	expect(playerGameboard.isValidPlacement(testProposal, isVert)).toBe(false)
})

test('Invalid placement, at least one of proposed coords already filled', () => {
	const isVert = false
	const testProposal = [[0,4],[0,5],[0,6],[0,7]]

	playerGameboard.updatePlacements(["00", "01", "02", "03", "04"]);
	expect(playerGameboard.isValidPlacement(testProposal, isVert)).toBe(false)
})

test('Placing the first Ship', () => {
	const expected = {
		portions: [ { x: 0, y: 0, hit: false }, { x: 0, y: 1, hit: false } ],
		sunk: false
	}

	playerGameboard.updatePlacements(["00", "01"]);
	expect(playerGameboard.placements[0]).toStrictEqual(expected)
})

test('Receive Attack', () => {
	playerGameboard.updatePlacements(["00", "01"]);
	playerGameboard.receiveAttack([0,1])
	expect(playerGameboard.placements[0].portions[1].hit).toBe(true)
})

test('Missed Attack', () => {
	playerGameboard.updatePlacements(["00", "01"]);
	playerGameboard.receiveAttack([0,2])
	
	for (let i = 0; i < playerGameboard.placements[0].portions.length; i++) {
		expect(playerGameboard.placements[0].portions[i].hit).toBe(false)
	}
	
	expect(playerGameboard.missed[0]).toStrictEqual([0,2])
})

test('Is a ship sunk', () => {

	playerGameboard.updatePlacements(["00", "01"]);

	playerGameboard.receiveAttack([0,0])
	playerGameboard.receiveAttack([0,1])

	expect(playerGameboard.placements[0].sunk).toBe(true)
})

test('Are all sunk', () => {

	playerGameboard.updatePlacements(["00", "01"]);
	playerGameboard.updatePlacements(["02", "03"]);

	playerGameboard.receiveAttack([0,0])
	playerGameboard.receiveAttack([0,1])
	playerGameboard.receiveAttack([0,2])
	playerGameboard.receiveAttack([0,3])

	expect(playerGameboard.areAllSunk()).toBe(true)
})

test('Are some sunk', () => {

	playerGameboard.updatePlacements(["00", "01"]);
	playerGameboard.updatePlacements(["02", "03"]);

	playerGameboard.receiveAttack([0,0])
	playerGameboard.receiveAttack([0,1])

	expect(playerGameboard.areAllSunk()).toBe(false)
})