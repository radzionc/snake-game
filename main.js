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
  return {}
}

const render = (state) => {
  console.log('render')
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