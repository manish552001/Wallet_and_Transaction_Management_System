package com.manish.walletapp.controller;

import com.manish.walletapp.entity.Transaction;
import com.manish.walletapp.serives.TransactionService;
import com.manish.walletapp.serives.ValidationErrorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    private ValidationErrorService validationService;

    @GetMapping("/{wallet_id}")
    public ResponseEntity<?> getAll(@PathVariable Long wallet_id) {
        return new ResponseEntity<>(transactionService.getAll(wallet_id), HttpStatus.OK);
    }

    @GetMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> getById(@PathVariable Long wallet_id, @PathVariable Long id) {
        return new ResponseEntity<>(transactionService.getById(wallet_id, id), HttpStatus.OK);
    }

    @PostMapping("/{wallet_id}")
    public ResponseEntity<?> create(@PathVariable Long wallet_id, @Valid @RequestBody Transaction transaction, BindingResult result) {
        ResponseEntity<?> errors = validationService.validate(result);
        if (errors != null) return errors;
        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id, transaction);
        return new ResponseEntity<>(transactionSaved, HttpStatus.CREATED);
    }

    @PutMapping("/{wallet_id}/{id}")
    public ResponseEntity<?> update(@PathVariable Long wallet_id, @PathVariable Long id, @Valid @RequestBody Transaction transaction, BindingResult result) {
        ResponseEntity<?> errors = validationService.validate(result);
        if (errors != null) return errors;
        transaction.setId(id);
        Transaction transactionSaved = transactionService.createOrUpdate(wallet_id, transaction);
        return new ResponseEntity<>(transactionSaved, HttpStatus.OK);
    }

    @DeleteMapping("/{walletId}/{id}")
    public ResponseEntity<?> delete(@PathVariable Long walletId, @PathVariable Long id) {
        transactionService.delete(walletId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    

}
