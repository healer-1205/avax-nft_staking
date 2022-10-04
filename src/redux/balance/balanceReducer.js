const initialState = {
  loading: false,
  claimableBalance: 0,
  error: false,
  errorMsg: "",
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_BALANCE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_BALANCE_SUCCESS": {
      return {
        ...state,
        loading: false,
        claimableBalance: action.payload.claimableBalance,
        error: false,
        errorMsg: "",
      };
    }
    case "CHECK_BALANCE_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default balanceReducer;
