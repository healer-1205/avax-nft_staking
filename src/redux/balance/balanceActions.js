// log
import store from "../store";

const fetchBalanceRequest = () => {
  return {
    type: "CHECK_BALANCE_REQUEST",
  };
};

const fetchBalanceSuccess = (payload) => {
  return {
    type: "CHECK_BALANCE_SUCCESS",
    payload: payload,
  };
};

const fetchBalanceFailed = (payload) => {
  return {
    type: "CHECK_BALANCE_FAILED",
    payload: payload,
  };
};

export const fetchBalance = (address) => {
  return async (dispatch) => {
    dispatch(fetchBalanceRequest());

    try {
      let claimableBalance = await store
        .getState()
        .blockchain.smartContract.methods.claimableRewards()
        .call({ from: address })

      dispatch(
        fetchBalanceSuccess({
          claimableBalance: store.getState().blockchain.web3.utils.fromWei(claimableBalance, 'ether')
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchBalanceFailed("Could not load balance from contract."));
    }
  };
};