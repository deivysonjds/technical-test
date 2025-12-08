package com.br.technical_test.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Enterprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String cep;
    @Column(nullable = false)
    private String cnpj;

    @OneToMany(mappedBy = "enterprise")
    private List<EnterpriseSupplier> suppliers;
}
