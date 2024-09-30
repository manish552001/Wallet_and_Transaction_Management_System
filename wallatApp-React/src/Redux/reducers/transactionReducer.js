import { GET_TRANSACTIONS, DELETE_TRANSACTION, ADD_TRANSACTION, UPDATE_TRANSACTION } from '../../Redux/actions/types';

const initialState = {
    transactions: []
};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        case ADD_TRANSACTION:
            return { ...state, transactions: [...state.transactions, action.payload] };
        case UPDATE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(transaction =>
                    transaction.id === action.payload.id ? action.payload : transaction
                )
            };
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            };
        default:
            return state;
    }
}
