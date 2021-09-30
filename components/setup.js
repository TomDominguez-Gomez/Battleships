export default () => {
	const createPage = () => {
		
		const title = document.createElement('h1');
		const dirBtnCont = document.createElement('div')
		const dirBtn = document.createElement('h2');
		const boardContainer = document.createElement('div');
		
		title.textContent = 'Battleship';
		dirBtn.textContent = 'Change Axis : x';

		dirBtnCont.setAttribute('id', 'change-dir-cont');
		dirBtn.setAttribute('class', `change-dir-btn current-dir-x`);		
		boardContainer.setAttribute('id', 'board-container');
		
		document.body.appendChild(title);
		document.body.appendChild(dirBtnCont);	
		dirBtnCont.appendChild(dirBtn);	
		document.body.appendChild(boardContainer);		
	}

	const displayBoard = (player) => {
		const boardID = `player-${player.toString()}-board`;

		const board = document.createElement('div');
		const boardContainer = document.querySelector('#board-container');

		board.setAttribute('class', 'board');
		board.setAttribute('id', `${boardID}`);

		boardContainer.appendChild(board);

		const displayCell = (x, y) => {
			const cell = document.createElement('div');
			cell.setAttribute('class', 'cell empty');
			cell.setAttribute('id', `${x}${y}`);
			const board = document.querySelector(`#${boardID}`);
			board.appendChild(cell);
		}

		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				displayCell(x,y);
			}
		}
	}

	const addPlacementEvents = (player1) => {

		const dirBtn = document.getElementById('change-dir-cont')
		
		dirBtn.addEventListener('click', () => {
			const dirBtnText = document.querySelector('.change-dir-btn')
	
			const mainSubString = dirBtnText.className.substring(0, dirBtnText.className.length-1)

			dirBtn.firstChild.className = dirBtnText.className.slice(-1) === 'x' ? `${mainSubString}y` : `${mainSubString}x`;
			dirBtnText.textContent = `Change Axis : ${dirBtn.firstChild.className.slice(-1)}`
		})		

		const createProposal = (cell) => {
			const isVert = document.querySelector('.change-dir-btn').className.slice(-1) === 'x' ? true : false
			const result = player1.proposal(cell, isVert).map(r => r.join(''));
			return result;
		}

		const changeCellState = (id, state, name) => {

			let classNames = document.getElementById(`${id}`).className.split(' ');
			if (classNames[1] !== 'filled') {
				if (state === 'remove') {
					classNames.pop();
				} else {
					classNames.push(name);
				}
			}
			document.getElementById(`${id}`).setAttribute(`class`, `${classNames.join(' ')}`)}

		const changeProposalState = (cell, state) => {
			
			const result = createProposal(cell)
			if (result.length > 1) {
				result.forEach(r => {	
					changeCellState(r, state, 'valid');				
				})
			} else {
				changeCellState(result[0], state, 'invalid');		
			}
		}

		const updateBoard = (cell) => {
			const selectedCell = document.getElementById(cell);
			const classNames = selectedCell.className.split(' ');
			if (classNames[2] === 'valid') {
				const proposal = createProposal(cell);				
				proposal.forEach(p => {
					document.getElementById(`${p}`).setAttribute('class', 'cell filled')
				})
				player1.updatePlacements(proposal);
			} else{
				console.log('invalid placement attempt')
			}
		}

		const cells = document.querySelectorAll('.cell');
		
		cells.forEach((c => {
			c.addEventListener('click', () => {
				updateBoard(c.id)
				player1.areAllShipsPlaced()

			})
			c.addEventListener('mouseover', () => {
				changeProposalState(c.id, 'add')
			})
			c.addEventListener('mouseout', () => {
				changeProposalState(c.id, 'remove')	
			})
		}))
	}

	const test = () => {
		console.log('test')
	}

	return {createPage, displayBoard, addPlacementEvents, test}
}

