// #region constants
const UPDATE_EVERY = 1000 / 60
// #endregion

// #region rendering
const render = (state) => {
  console.log('render')
}
// #endregion

// #region main
const getInitialState = () => {
  return {}
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