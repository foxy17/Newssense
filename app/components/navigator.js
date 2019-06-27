import { createStackNavigator, createAppContainer } from "react-navigation";
import {AsyncStorage} from 'react-native';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/detail';
import IntroScreen from './pages/intro';
import ExternalScreen from './pages/external';
import SettingsScreen from './pages/setting';
import BookmarksScreen from './pages/bookmarks';
import SingleBookmarkScreen from './pages/singleBookmark';
import { fromLeft,fromBottom ,fadeIn} from 'react-navigation-transitions';
import * as ActionTypes from './redux/ActionTypes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data
});

const mapDispatchToProps = (dispatch) => (

  {

    callService: () => dispatch(callWebservice())
})
export const callWebservice = () => {
    console.log("this is getting calles")
    return dispatch => {
        dispatch(serviceActionPending())
        console.log("COMING HERE?")
        fetch(`https://news119.herokuapp.com/getData`)
        .then(response => {
            console.log(response.data)
            dispatch(serviceActionSuccess(response.data))
        })
        .catch(error => {
            dispatch(serviceActionError(error))
        });
    }
}

export const serviceActionPending = () => ({
    type: ActionTypes.SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.SERVICE_ERROR,
    error: error
})

export const serviceActionSuccess = (data) => ({
    type: ActionTypes.SERVICE_SUCCESS,
    data: data
})
const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Settings') {
    return fromBottom();
  }
  return fadeIn();
}
let ReduxAppContainer= connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const AppNavigator = createStackNavigator(
  {
  Home: {screen:ReduxAppContainer,key:"Home", path: 'new/:id'},
  Details: {screen:DetailsScreen,header: {style: {
          backgroundColor: '#00cafe'
        }}},
  Intro:IntroScreen,
  Article: { screen: ExternalScreen, path: 'news/:id', },
  Settings:SettingsScreen,
  Bookmarks:BookmarksScreen,
  SingleBookmark:SingleBookmarkScreen

},
{
  initialRouteName: "Home",
  headerMode: 'none',
    transitionConfig: (screen) => handleCustomTransition(screen),
}

);

const AppContainer = createAppContainer(AppNavigator);
const AppNavigatorIntro = createStackNavigator(
  {
  Home: {screen:ReduxAppContainer,key:"Home", path: 'new/:id'},
  Details: {screen:DetailsScreen,style: {
          backgroundColor: '#00cafe'
        }},
  Intro:IntroScreen,
  Article: { screen: ExternalScreen, path: 'news/:id', },
  Settings:SettingsScreen,
    Bookmarks:BookmarksScreen,
    SingleBookmark:SingleBookmarkScreen

},
{
  initialRouteName: "Intro",
  headerMode: 'none',
  transitionConfig: (screen) => handleCustomTransition(screen),
}

);

const AppContainerIntro = createAppContainer(AppNavigatorIntro);
export  {AppContainer,AppContainerIntro};
