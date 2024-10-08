package com.manish.walletapp.serives;

import com.manish.walletapp.entity.Transaction;
import com.manish.walletapp.entity.Wallet;
import com.manish.walletapp.exception.WalletException;
import com.manish.walletapp.repository.TransactionRepository;
import com.manish.walletapp.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private WalletRepository walletRepository;
    public List<Transaction> getAll(Long walletId){
        Optional<Wallet> wallet = walletRepository.findById(walletId);
        return wallet.map(value -> transactionRepository.findByWallet(value)).orElse(null);
    }
    public Transaction getById(Long wallet_id,Long id){
        Optional<Wallet> wallet = walletRepository.findById(wallet_id);
        if(wallet.isPresent()) {
            Optional<Transaction> transaction = transactionRepository.findById(id);
            if (transaction.isPresent()) {
                return transaction.get();
            }
        }
        throw new WalletException("Transaction with "+id+" does not exists!");
    }
    public Transaction createOrUpdate(Long walletId, Transaction transaction){
        Optional<Wallet> wallet = walletRepository.findById(walletId);
        if(wallet.isPresent()){
            transaction.setWallet(wallet.get());
            transactionRepository.save(transaction);
            return transaction;
        }
        return null;
    }
    public boolean delete(Long wallet_id,Long id){
        Optional<Wallet> wallet = walletRepository.findById(wallet_id);
        if(wallet.isPresent()) {
            Optional<Transaction> transaction = transactionRepository.findById(id);
            if (transaction.isPresent()) {
                transactionRepository.delete(transaction.get());
                return true;
            }
        }
        throw new WalletException("Transaction with "+id+" does not exists!");
    }
}
