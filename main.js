// #region general utils
const getRange = length => [...Array(length).keys()]
// #endregion

// #region geometry
class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  subtract({ x, y }) {
    return new Vector(this.x - x, this.y - y)
  }

  scaleBy(number) {
    return new Vector(this.x * number, this.y * number)
  }
}
// #endregion

// #region constants
const UPDATE_EVERY = 1000 / 60

const DIRECTION = {
  TOP: new Vector(0, -1),
  RIGHT: new Vector(1, 0),
  DOWN: new Vector(0, 1),
  LEFT: new Vector(-1, 0)
}

const DEFAULT_GAME_CONFIG = {
  width: 17,
  height: 15,
  speed: 0.006,
  initialSnakeLength: 3,
  initialDirection: DIRECTION.RIGHT
}
// #endregion

// #region game core
const getFood = (width, height, snake) => {
  return new Vector(0.5, 0.5)
}

const getGameInitialState = (config = {}) => {
  const {
    width,
    height,
    speed,
    initialSnakeLength,
    initialDirection
  } = { ...config, ...DEFAULT_GAME_CONFIG }
  const head = new Vector(
    Math.round(width / 2) - 0.5,
    Math.round(height / 2) - 0.5
  )
  const tailtip = head.subtract(initialDirection.scaleBy(initialSnakeLength))
  const snake = [tailtip, head]
  const food = getFood(width, height, snake)

  return {
    width,
    height,
    speed,
    initialSnakeLength,
    initialDirection,
    snake,
    direction: initialDirection,
    food,
    score: 0
  }
}
// #endregion

// #region rendering
const getContainer = () => document.getElementById('container')

const getContainerSize = () => {
  const { width, height } = getContainer().getBoundingClientRect()
  return { width, height }
}

const getProjectors = (containerSize, game) => {
  const widthRatio = containerSize.width / game.width
  const heightRatio = containerSize.height / game.height
  const unitOnScreen = Math.min(widthRatio, heightRatio)

  return {
    projectDistance: distance => distance * unitOnScreen,
    projectPosition: position => position.scaleBy(unitOnScreen)
  }
}

const getContext = (width, height) => {
  const [existing] = document.getElementsByTagName('canvas')
  const canvas = existing || document.createElement('canvas')
  if (!existing) {
    getContainer().appendChild(canvas)
  }
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  return context
}

const renderCells = (context, cellSide, width, height) => {
  context.globalAlpha = 0.2
  getRange(width).forEach(column => getRange(height).forEach(row => {
    if ((column + row) % 2 === 1) {
      context.fillRect(column * cellSide, row * cellSide, cellSide, cellSide)
    }
  }))
  context.globalAlpha = 1
}

const renderFood = (context, cellSide, { x, y }) => {
  context.beginPath()
  context.arc(x, y, cellSide / 2.5, 0, 2 * Math.PI)
  context.fillStyle = '#e74c3c'
  context.fill()
}

const renderSnake = (context, cellSide, snake) => {
  context.lineWidth = cellSide
  context.strokeStyle = '#3498db'
  context.beginPath()
  snake.forEach(({ x, y }) => context.lineTo(x, y))
  context.stroke()
}

const renderScores = (score, bestScore) => {
  document.getElementById('current-score').innerText = score
  document.getElementById('best-score').innerText = bestScore
}

const render = ({
  game: {
    width,
    height,
    food,
    snake,
    score
  },
  bestScore,
  projectDistance,
  projectPosition
}) => {
  const [viewWidth, viewHeight] = [width, height].map(projectDistance)
  const context = getContext(viewWidth, viewHeight)
  const cellSide = viewWidth / width
  renderCells(context, cellSide, width, height)
  renderFood(context, cellSide, projectPosition(food))
  renderSnake(context, cellSide, snake.map(projectPosition))
  renderScores(score, bestScore)
}
// #endregion

// #region main
const getInitialState = () => {
  const game = getGameInitialState()
  const containerSize = getContainerSize()
  return {
    game,
    bestScore: parseInt(localStorage.bestScore) || 0,
    ...containerSize,
    ...getProjectors(containerSize, game)
  }
}

const getNewStatePropsOnTick = (props) => {
  console.log('get new state')
}

const startGame = () => {
  let state = getInitialState()
  const updateState = props => {
    state = { ...state, ...props }
  }

  window.addEventListener('resize', () => {
    console.log('resize')
  })
  window.addEventListener('keydown', ({ which }) => {
    console.log('keydown: ', which)
  })
  window.addEventListener('keyup', ({ which }) => {
    console.log('keyup: ', which)
  })

  const tick = () => {
    const newProps = getNewStatePropsOnTick(state)
    updateState(newProps)
    render(state)
  }
  setInterval(tick, UPDATE_EVERY)
}
// #endregion

startGame()