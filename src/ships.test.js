import {Ships} from './ships'


const makeTestShip = () => {
	const coords = [[0,0],[0,1],[0,2]];
	return Ships().build(coords)
}

test('Have ship been build with the set coords', () => {
	const testShip = makeTestShip();
	for (let i = 0; i < 3; i++) {
		expect(testShip.portions[i].x).toEqual(0);
		expect(testShip.portions[i].y).toEqual(i);
		expect(testShip.portions[i].hit).toEqual(false);
	}
});
test('Ship Got Hit', () => {
	const testShip = makeTestShip();
	Ships().hit(testShip, [0,0])
	expect(testShip.portions[0].hit).toBe(true);
})

test('Ship got sunk after being hit 3 times', () => {
	const testShip = makeTestShip();

	for(let y = 0; y <= testShip.portions.length; y++) {
		Ships().hit(testShip,[0, y]);
	}

	Ships().isSunk(testShip);
	expect(testShip.sunk).toBe(true)
})
