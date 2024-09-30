import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions, deleteTransaction } from '../../Redux/actions/projectActions';
import { Link, withRouter } from 'react-router-dom';

class Transaction extends Component {
    componentDidMount() {
        this.fetchTransactions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchTransactions();
        }
    }

    fetchTransactions = () => {
        const { id } = this.props.match.params;
        this.props.getTransactions(id);
    };

    calculateTotals = () => {
        const { transactions } = this.props;
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(transaction => {
            if (transaction.type === 1) totalIncome += transaction.amount; // Income
            else totalExpense += transaction.amount; // Expense
        });

        return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
    };

    handleDelete = (id) => {
        const { id: walletId } = this.props.match.params;
        this.props.deleteTransaction(walletId, id);
        // Fetch updated transactions after deletion
        this.fetchTransactions();
    };

    render() {
        const { transactions, walletName } = this.props;
        const { totalIncome, totalExpense, balance } = this.calculateTotals();

        return (
            <div className="container">
                <Link to="/dashboard" className="btn btn-default btn-lg mb-3">Back</Link>
                <Link to={`/trns/add/${this.props.match.params.id}`} className="btn btn-info btn-lg mb-3">Record new Transaction</Link>
                <div className="card text-center">
                    <div className="card-header bg-success text-white">
                        <h4>{walletName} Balance</h4>
                        <h1>Rs. {balance}</h1>
                        <p>Income: Rs. {totalIncome} | Expense: Rs. {totalExpense}</p>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} className={transaction.type === 1 ? 'table-success' : 'table-danger'}>
                                <td>{transaction.date || "N/A"}</td>
                                <td>{transaction.description}</td>
                                <td className={transaction.type === 1 ? 'text-success' : 'text-danger'}>
                                    {transaction.type === 1 ? `+${transaction.amount}` : `-${transaction.amount}`}
                                </td>
                                
                                <td>
                                    <Link to={`/transaction/edit/${transaction.id}/${this.props.match.params.id}`} className="text-info">
                                        <i className="fas fa-edit fa-2x"></i>
                                    </Link>
                                    <span className="text-danger" onClick={() => this.handleDelete(transaction.id)}>
                                        <i className="fas fa-trash fa-2x"></i>
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    transactions: state.transaction.transactions,
    walletName: state.wallet.currentWalletName // Ensure this is correctly set in Redux state
});

export default withRouter(connect(mapStateToProps, { getTransactions, deleteTransaction })(Transaction));