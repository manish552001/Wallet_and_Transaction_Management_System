import { GET_WALLETS, DELETE_WALLET, GET_WALLET } from '../../Redux/actions/types';

const initialState = {
    wallets: [],
    wallet: ''
};

// Named function for export
function walletReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WALLETS:
            return { ...state, wallets: action.payload };
        case GET_WALLET:
            return { ...state, wallet: action.payload };
        case DELETE_WALLET:
            return {
                ...state,
                wallets: state.wallets.filter(wallet => wallet.id !== action.payload)
            };
        default:
            return state;
    }
}

export default walletReducer;
