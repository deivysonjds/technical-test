package com.br.technical_test.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "supplier_pj")
public class SupplierPJ extends Supplier{

    @Column(nullable = false, unique = true)
    private String cnpj;

}
