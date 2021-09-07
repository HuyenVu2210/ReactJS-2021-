import * as ActionType from './ActionType'

const Staffs = (state = { isLoading: true, errMes: null, staffs: []}, action) => {
    switch (action.type) {
    case ActionType.STAFFS_LOADING:
        return {...state, isLoading: true, errMes: null, staffs: []};
    case ActionType.STAFFS_LOADED:
        return {...state, isLoading: false, errMes: null, staffs: action.payload};
    case ActionType.STAFFS_LOAD_FAILED:
        return {...state, isLoading: false, errMes: action.payload, staffs: []};
    case ActionType.ADD_STAFF:
        var staff = action.payload;
        staff.id = state.staffs.length;
        staff.image = '/asset/images/alberto.png';
        var newList = state.staffs.concat([staff]);
        return {...state, isLoading: false, errMes: null, staffs: newList}
    default:
        return state;
    }
};

export default Staffs;