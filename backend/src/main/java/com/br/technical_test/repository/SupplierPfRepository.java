package com.br.technical_test.repository;

import com.br.technical_test.entity.Supplier;
import com.br.technical_test.entity.SupplierPF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierPfRepository extends JpaRepository<SupplierPF, Long> {
    Optional<SupplierPF> findByCpf(String cpf);
    boolean existsByCpf(String cpf);
    @Query("SELECT s FROM Supplier s " +
            "LEFT JOIN SupplierPF pf ON s.id = pf.id " +
            "LEFT JOIN FETCH s.enterprises " +
            "WHERE s.id = :id"
    )
    Optional<SupplierPF> findByIdWithEnterprises(Long id);
}
