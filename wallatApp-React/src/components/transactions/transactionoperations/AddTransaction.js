import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createTransaction } from '../../../Redux/actions/projectActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            description: '',
            type: '1'
        };
    }

    changeHandler = (event, fieldName) => {
        this.setState({
            [fieldName]: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { amount, description, type } = this.state;
        const newTransaction = { amount, description, type };
        const { createTransaction, match, history } = this.props;
    
        await createTransaction(newTransaction, match.params.id);
        // Redirect back to the transactions view page
        history.push(`/transactions/${match.params.id}`);
    };
    

    render() {
        const { amount, description, type } = this.state;
        const id = this.props.match.params.id;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/transactions/${id}`} className="btn btn-light">
                                Back to Wallet
                            </Link>
                            <h4 className="display-4 text-center">Record New Transaction</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        min="1"
                                        value={amount}
                                        onChange={event => this.changeHandler(event, 'amount')}
                                        className="form-control form-control-lg"
                                        placeholder="Amount"
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        value={description}
                                        onChange={event => this.changeHandler(event, 'description')}
                                        className="form-control form-control-lg"
                                        placeholder="Description"
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Transaction Type:</label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            checked={type === '1'}
                                            className="form-check-input"
                                            type="radio"
                                            id="income"
                                            onChange={event => this.changeHandler(event, 'type')}
                                            value="1"
                                        />
                                        <label className="form-check-label" htmlFor="income">Income</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            checked={type === '2'}
                                            className="form-check-input"
                                            type="radio"
                                            id="expense"
                                            onChange={event => this.changeHandler(event, 'type')}
                                            value="2"
                                        />
                                        <label className="form-check-label" htmlFor="expense">Expense</label>
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { createTransaction })(AddTransaction));
