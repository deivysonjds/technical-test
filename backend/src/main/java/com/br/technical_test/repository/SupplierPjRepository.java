package com.br.technical_test.repository;

import com.br.technical_test.entity.SupplierPJ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierPjRepository extends JpaRepository<SupplierPJ, Long> {
    Optional<SupplierPJ> findByCnpj(String cnpj);
    boolean existsByCnpj(String cnpj);
}
