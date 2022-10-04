const initialState = {
  loading: false,
  data: [],
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_TOKEN_REQUEST":
      return {
        ...state,
        loading: true,
        data: [],
        error: false,
        errorMsg: "",
      };
    case "CHECK_TOKEN_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        error: false,
        errorMsg: "",
      };
    case "CHECK_TOKEN_FAILED":
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

export default dataReducer;
