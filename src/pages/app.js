import HomePage from './home/home';
import { Switch, Route, HashRouter, useHistory } from 'react-router-dom';
import PayPage from './pay';
import { NavBar, Icon } from 'antd-mobile';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import InfoPage from './info';
import OwePage from './owe';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <MainPage />
      </Switch>
    </HashRouter>
  );
};

export default App;

/**
 * navbar 的 title reducer
 *
 * @param initTitle {title: string}
 */
export const navSlice = createSlice({
  name: 'navbar',
  initialState: { title: '首页' },
  reducers: {
    changeNavTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { changeNavTitle } = navSlice.actions;

export const { reducer: navReducer } = navSlice;
/**
 * 需要新建一个组件来配置
 * 否则 useHistory 不生效
 */
const MainPage = () => {
  const title = useSelector((state) => state.navbar.title);

  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  return (
    <>
      <NavBar icon={<Icon onClick={onBack} type="left" />}>{title}</NavBar>
      <Switch>
        <Route path="/pay" component={PayPage} />
        <Route path="/owe" component={OwePage} />
        <Route path="/info" component={InfoPage} />
      </Switch>
    </>
  );
};
