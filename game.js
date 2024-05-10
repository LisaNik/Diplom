const gamePets = [
  {
    name: 'Лайк',
    gender: 'хлопчик',
    age: '3 мiсяцi',
    imageName: '1-puzzle.png',
  },
  {
    name: 'Мартін',
    gender: 'хлопчик',
    age: '1 рік',
    imageName: '2-puzzle.png',
  },
  {
    name: 'Хлоя',
    gender: 'дiвчинка',
    age: '1 рік',
    imageName: '3-puzzle.png',
  },
  {
    name: 'Лоло',
    gender: 'хлопчик',
    age: '4 мiсяцi',
    imageName: '4-puzzle.png',
  },
  {
    name: 'Мерi',
    gender: 'дiвчинка',
    age: '4 мiсяцi',
    imageName: '5-puzzle.png',
  },
  {
    name: 'Сем',
    gender: 'хлопчик',
    age: '1 рік',
    imageName: '6-puzzle.png',
  },
  {
    name: 'Лео',
    gender: 'хлопчик',
    age: '11 мiсяцiв',
    imageName: '7-puzzle.png',
  },
  {
    name: 'Чарли',
    gender: 'хлопчик',
    age: '2 роки',
    imageName: '8-puzzle.png',
  },
  {
    name: 'Ксюша',
    gender: 'дiвчинка',
    age: '1 рік',
    imageName: '9-puzzle.png',
  },
]


  ////////////////////////////////// GAME 1
const handleStartGame = (imageUrl) => {
  createPuzzle(imageUrl)

  const subtitle1 = document.getElementById('gameSubtitle1')
  const subtitle2 = document.getElementById('gameSubtitle2')

  subtitle1.classList.remove('active')
  subtitle2.classList.add('active')

  const loader = document.getElementById('gameLoader')

  loader.classList.remove('stage1')
  loader.classList.add('stage2')

  const screen1 = document.getElementById('gameScreen1')
  const screen2 = document.getElementById('gameScreen2')

  screen1.classList.remove('active')
  screen2.classList.add('active')

}

function createPuzzle(imageUrl) {
  const pieceSize = 133
  const horizontalPiecesCount = 3
  const verticalPiecesCount = 3

  let img = new Image();
  img.src = imageUrl;
  // img.style.width = `${pieceSize * 3}px`
  // img.style.height = `${pieceSize * 3}px`

  img.onload = () => {
    const canvas = new headbreaker.Canvas('game-puzzle', {
      width: 700,
      height: 460,
      pieceSize: pieceSize,
      image: img,
      strokeWidth: 1,
      lineSoftness: 0.3,
      preventOffstageDrag: true,
      fixed: true,
      maxPiecesCount: 3,
    });

    canvas.autogenerate({
      horizontalPiecesCount: horizontalPiecesCount,
      verticalPiecesCount: verticalPiecesCount,
    });

    // canvas.settings.proximity = 100

    // canvas.scale(2)

    // canvas.figurePadding = {
    //   x: 100,
    //   y: 100,
    // }

    // canvas.adjustImagesToPuzzleWidth()

    canvas.shuffle(0.5);

    canvas.draw();

    canvas.puzzle.onConnect((puzzle) => {
      console.log('connected')
      canvas.puzzle.updateValidity()
      canvas.puzzle.validate()
      console.log(canvas.puzzle)
      console.log(canvas.puzzle.valid)

      let connectedPieces = 0

      canvas.puzzle.pieces.forEach((piece, i) => {
        if (
          piece.connected &&
          ((i === 0 && piece.connections[0] && piece.connections[1]) ||
            (i === 1 && piece.connections[0] && piece.connections[1] && piece.connections[2]) ||
            (i === 2 && piece.connections[1] && piece.connections[2]) ||
            (i === 3 && piece.connections[0] && piece.connections[1] && piece.connections[3]) ||
            (i === 4 && piece.connections[0] && piece.connections[1] && piece.connections[2] && piece.connections[3]) ||
            (i === 5 && piece.connections[1] && piece.connections[2] && piece.connections[3]) ||
            (i === 6 && piece.connections[0] && piece.connections[3]) ||
            (i === 7 && piece.connections[0] && piece.connections[2] && piece.connections[3]) ||
            (i === 8 && piece.connections[2] && piece.connections[3]))
        ) {
          connectedPieces++
        }
      })

      console.log(connectedPieces)

      if (connectedPieces === 9) {
        handleGamePuzzleComplete(imageUrl)
      }
    })
  }
}

function handleGamePuzzleComplete(imageUrl) {
  const img = new Image();
  img.src = imageUrl;

  const targetItem = gamePets.find(pet => pet.imageName === imageUrl.split('/').slice(-1)[0])

  const nameEl = document.createElement('h3')
  nameEl.classList.add('name')
  nameEl.textContent = targetItem.name

  const infoEl = document.createElement('p')
  infoEl.classList.add('info')
  infoEl.textContent = `${targetItem.gender}, ${targetItem.age}`

  const container = document.getElementById('game-result')

  container.prepend(infoEl)
  container.prepend(nameEl)
  container.prepend(img)

  const subtitle2 = document.getElementById('gameSubtitle2')
  const subtitle3 = document.getElementById('gameSubtitle3')

  subtitle2.classList.remove('active')
  subtitle3.classList.add('active')

  const loader = document.getElementById('gameLoader')

  loader.classList.remove('stage2')
  loader.classList.add('stage3')

  const screen2 = document.getElementById('gameScreen2')
  const screen3 = document.getElementById('gameScreen3')

  screen2.classList.remove('active')
  screen3.classList.add('active')
}


  ////////////////////////////////// GAME 2
  
function startGame() {

    
  const subtitle1 = document.getElementById('gameSubtitle1')
  const subtitle2 = document.getElementById('gameSubtitle2')

  subtitle1.classList.remove('active')
  subtitle2.classList.add('active')
  const loader = document.getElementById('gameLoader')

  loader.classList.remove('stage1')
  loader.classList.add('stage2')

  const screen1 = document.getElementById('gameScreen1')
  const screen2 = document.getElementById('game2Screen2')

  screen1.classList.remove('active')
  screen2.classList.add('active')


            const board = document.getElementById("board");
            const size = 3;
            const images = Array.from({ length: size * size - 1 }, (_, index) => `image${index + 1}.png`);

            for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
            }

            for (let i = 0; i < size * size - 1; i++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                tile.innerHTML = `<img src="images/game2Pets/${images[i]}" alt="Tile ${i + 1}">`;
                tile.addEventListener("click", () => moveTile(tile));
                board.appendChild(tile);
            }

            const blankTile = document.createElement("div");
            blankTile.classList.add("tile");
            blankTile.addEventListener("click", () => moveTile(blankTile));
            board.appendChild(blankTile);

            function moveTile(tile) {
                const tileIndex = Array.from(board.children).indexOf(tile);
                const emptyIndex = Array.from(board.children).findIndex(t => t.innerHTML === "");

                if (isAdjacent(tileIndex, emptyIndex)) {
                    const temp = board.children[emptyIndex].innerHTML;
                    board.children[emptyIndex].innerHTML = board.children[tileIndex].innerHTML;
                    board.children[tileIndex].innerHTML = temp;

                    if (isVictory()) {
                        resetGame();
                    }
                }
            }

            function isAdjacent(index1, index2) {
                const x1 = index1 % size;
                const y1 = Math.floor(index1 / size);
                const x2 = index2 % size;
                const y2 = Math.floor(index2 / size);

                return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
            }

            function isVictory() {
                for (let i = 0; i < size * size - 1; i++) {
                    const currentImage = board.children[i].querySelector("img").src;
                    const expectedImage = `image${i + 1}.png`; 
                    if (currentImage !== expectedImage) {
                        return false;
                    }
                }
                return true;
            }

            function resetGame() {
                location.reload(); 
            }
        };