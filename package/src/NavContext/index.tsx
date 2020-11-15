import React, { createContext, useReducer, useCallback } from 'react';
import styles from './styles.module.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export type ScreenType = React.ReactNode;

export type NavigationStateType = {
  screens: ScreenType[];
}

export enum NavigationActionsType {
  Only = 'ONLY',
  Push = 'PUSH',
  Pop = 'POP',
  Replace = 'REPLACE'
}

export type NavigationActions = {
  type: NavigationActionsType.Only;
  screen: ScreenType;
} | {
  type: NavigationActionsType.Push;
  screen: ScreenType;
} | {
  type: NavigationActionsType.Pop;
} | {
  type: NavigationActionsType.Replace;
  screen: ScreenType;
}

const initialState = { screens: [] }

//Creating context
const NavContext = createContext<{
  _state: NavigationStateType;
  onlyScreen: (screen: ScreenType) => void;
  backScreen: () => void;
  nextScreen: (screen: ScreenType) => void;
  replaceScreen: (screen: ScreenType) => void;
}>({
  _state: initialState,
  onlyScreen: () => null,
  backScreen: () => null,
  nextScreen: () => null,
  replaceScreen: () => null
});


//Creating context
const NavProvider: React.FC = (props) => {
  const [_state, dispatch] = useReducer(mainReducer, initialState);

  const backScreen = useCallback(() => dispatch({ type: NavigationActionsType.Pop }), [])
  const nextScreen = useCallback((screen: ScreenType) => dispatch({ type: NavigationActionsType.Push, screen }), [])
  const onlyScreen = useCallback((screen: ScreenType) => dispatch({ type: NavigationActionsType.Only, screen }), [])
  const replaceScreen = useCallback((screen: ScreenType) => dispatch({ type: NavigationActionsType.Replace, screen }), [])

  return (
    <NavContext.Provider value={{ _state, onlyScreen, backScreen, nextScreen, replaceScreen }}>
      {props.children}
    </NavContext.Provider>
  )
}

class NavContainer extends React.Component<{ home?: ScreenType }, NavigationStateType> {
  private transitionRef: React.RefObject<any>;
  constructor(props: { home?: ScreenType }) {
    super(props);

    this.state = initialState;
    this.transitionRef = React.createRef()
  }

  componentDidMount() {
    const firstScreen = this.props.home
    if (firstScreen)
      this.context.onlyScreen(firstScreen)
  }

  render() {
    return (
      <NavContext.Consumer>
        {
          value =>
            <div className={styles['nav-container']} >
              <TransitionGroup>
                {value._state.screens.map((screen, i) => (
                  <CSSTransition key={i} nodeRef={this.transitionRef} timeout={200} classNames={{
                    enter: styles['screen-enter'],
                    enterActive: styles['screen-enter-active'],
                    exit: styles['screen-exit'],
                    exitActive: styles['screen-exit-active'],
                  }}>
                    <div style={{ zIndex: (i + 1) }} className={styles.screen} ref={this.transitionRef}>
                      {screen}
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
        }
      </NavContext.Consumer>
    )
  }
}

NavContainer.contextType = NavContext

const mainReducer = (state: NavigationStateType, action: NavigationActions) => ({
  screens: navigationReducer(state, action),
});

const navigationReducer = (state: NavigationStateType, action: NavigationActions) => {
  const { screens } = state
  switch (action.type) {
    case NavigationActionsType.Only:
      return [action.screen];
    case NavigationActionsType.Push:
      return [...screens, action.screen];
    case NavigationActionsType.Pop:
      if (screens.length <= 1) return screens
      return [...screens.slice(0, -1)];
    case NavigationActionsType.Replace:
      return [...screens.slice(0, -1), action.screen];
    default:
      return screens
  }
}

export { NavProvider, NavContext, NavContainer };