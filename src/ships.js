
const Ships = () => {
	const Portions = (c) => {
		const portion = {
			x: c[0],
			y: c[1],
			hit: false
		}
		return portion;
	}

	const build = (coords) => {
		console.log(coords)
		const shipPortions = Array.apply(null, Array(coords.length)).map((val, index) => {
			return Portions(coords[index])
		})

		const ship = {
			portions: shipPortions,
			sunk: false
		}
		return ship;
	}
	

	const hit = (ship, c) => {
		let found = ship.portions.find(p => p.x === c[0] && p.y === c[1])
		if (found !== undefined) {
			found.hit = true;			
		}
	}

	const isSunk = (ship) => {
		if (ship.portions.find(p => p.hit === false) === undefined) {
			ship.sunk = true;
		}
	}
	return {build, hit, isSunk}
}

export {Ships}