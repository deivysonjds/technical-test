package com.br.technical_test.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "enterprise_supplier")
public class EnterpriseSupplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "enterprise_id", nullable = false)
    private Enterprise enterprise;
    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;
    @Enumerated(EnumType.STRING)
    private StatusContract status;

    public EnterpriseSupplier(Enterprise enterprise, Supplier supplier){
        this.enterprise = enterprise;
        this.supplier = supplier;
        status = StatusContract.ACTIVE;
    }
}
