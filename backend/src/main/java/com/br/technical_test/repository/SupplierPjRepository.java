package com.br.technical_test.repository;

import com.br.technical_test.entity.Supplier;
import com.br.technical_test.entity.SupplierPJ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierPjRepository extends JpaRepository<SupplierPJ, Long> {
    Optional<SupplierPJ> findByCnpj(String cnpj);
    boolean existsByCnpj(String cnpj);
    @Query("SELECT s FROM Supplier s " +
            "LEFT JOIN SupplierPJ pj ON s.id = pj.id " +
            "LEFT JOIN FETCH s.enterprises " +
            "WHERE s.id = :id"
    )
    Optional<SupplierPJ> findByIdWithEnterprises(Long id);
}
