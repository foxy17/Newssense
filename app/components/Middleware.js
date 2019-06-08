import HomeScreen from './pages/home';
import * as ActionTypes from './redux/ActionTypes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data
});

function mapDispatchToProps(dispatch){
    return{
    callService: () => dispatch(callWebservice())
}}

export const callWebservice = () => {
    return dispatch => {
        dispatch(serviceActionPending())
        fetch(`https://news119.herokuapp.com/getData`)
        .then(response => {

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
let ReduxAppContainer= connect(mapStateToProps, mapDispatchToProps)(Home);
export default class Middleware extends Component{
  render(){

  }


}
