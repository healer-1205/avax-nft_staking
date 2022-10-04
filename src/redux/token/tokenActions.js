// log
import axios from 'axios';
import store from "../store";

const fetchTokenRequest = () => {
  return {
    type: "CHECK_TOKEN_REQUEST",
  };
};

const fetchTokenSuccess = (payload) => {
  return {
    type: "CHECK_TOKEN_SUCCESS",
    payload: payload,
  };
};

const fetchTokenFailed = (payload) => {
  return {
    type: "CHECK_TOKEN_FAILED",
    payload: payload,
  };
};

export const fetchTokens = () => {
  return async (dispatch) => {
    dispatch(fetchTokenRequest());
    try {
      let data = await store
        .getState()
        .blockchain.smartContract.methods.walletOfOwner(store.getState().blockchain.account)
        .call();

      data.map(async (id) => {
        const jsonURI = await store
          .getState()
          .blockchain.smartContract.methods.tokenURI(id)
          .call();

        const res = await axios.get('https://ipfs.io/ipfs/' + jsonURI.replace("ipfs://", ""));
        if (res.status === 200) {
          dispatch(
            fetchTokenSuccess({
              data: {id, ...res.data},
            })
          );
        }
      })
    } catch (err) {
      console.log(err);
      dispatch(fetchTokenFailed("Could not load token from contract."));
    }
  };
};
