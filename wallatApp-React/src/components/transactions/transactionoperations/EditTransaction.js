import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTransaction, getTransaction } from '../../../Redux/actions/projectActions';

const EditTransaction = ({ updateTransaction, getTransaction }) => {
    const { id, walletId } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        type: '1',
    });

    useEffect(() => {
        const fetchTransaction = async () => {
            const transactionData = await getTransaction(walletId, id); // Pass walletId and id
            console.log("Fetched Transaction Data:", transactionData);
            if (transactionData) {
                setFormData({
                    amount: transactionData.amount || '',
                    description: transactionData.description || '',
                    type: transactionData.type || 1,
                });
            } else {
                console.error("Transaction not found");
            }
        };
    
        fetchTransaction();
    }, [getTransaction, id, walletId]); // Add walletId as a dependency
    

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const updatedTransaction = {
            amount: formData.amount || '',
            description: formData.description || '',
            type: formData.type,
            transactionDate: new Date().toISOString(), // Set to current date
        };
    
        await updateTransaction(walletId, id, updatedTransaction);
        history.push(`/transactions/${walletId}`);
    };
    
    

    return (
        <div className="edit-PBI">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to={`/transactions/${walletId}`} className="btn btn-light">
                            Back to Wallet
                        </Link>
                        <h4 className="display-4 text-center">Edit Transaction</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="number"
                                    min="1"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={changeHandler}
                                    className="form-control form-control-lg"
                                    placeholder="Amount"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={changeHandler}
                                    className="form-control form-control-lg"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Transaction Type:</label>
                                <div className="form-check form-check-inline">
                                    <input
                                        checked={formData.type === '1'}
                                        className="form-check-input"
                                        type="radio"
                                        id="income"
                                        name="type"
                                        onChange={changeHandler}
                                        value="1"
                                    />
                                    <label className="form-check-label" htmlFor="income">Income</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        checked={formData.type === '2'}
                                        className="form-check-input"
                                        type="radio"
                                        id="expense"
                                        name="type"
                                        onChange={changeHandler}
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
};

const mapStateToProps = (state, ownProps) => ({
    transaction: state.transaction.transactions.find(t => t.id === ownProps.match.params.id) || {}
});

export default connect(mapStateToProps, { updateTransaction, getTransaction })(EditTransaction);
