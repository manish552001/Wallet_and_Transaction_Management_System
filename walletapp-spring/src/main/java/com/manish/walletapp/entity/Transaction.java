package com.manish.walletapp.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Min(1)
    @NotNull(message = "amount cann't be null")
    private Double amount;
    private String description;
    @Min(1)
    @Max(3)
    private int type;//1 for Income, 2 for expense, 3 for transfer
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date transactionDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "wallet_id",nullable = false)
    @JsonIgnore
    private Wallet wallet;

    @PrePersist
    public void setTransactionDate(){ this.transactionDate = new Date(); }
}
