// #region constants
const UPDATE_EVERY = 1000 / 60
// #endregion

// #region game core
const getGameInitialState = (config = {}) => {
  return {}
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