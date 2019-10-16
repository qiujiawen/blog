const userReducer = (state = {}, action)=>{
    switch (action.type) {
        case 'LOGIN_SUCC':
            return state = {
                res: {...action.res}
            };
        case 'REGISTER__SUCC':
            return state = {
                res: {...action.res}
            };
        case 'LOGOUT_SUCC':
            return state = {
                res:{...action.res}
            };
        default:
            return state;
    }
};

export default userReducer;