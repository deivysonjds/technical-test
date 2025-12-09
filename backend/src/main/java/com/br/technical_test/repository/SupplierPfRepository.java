package com.br.technical_test.repository;

import com.br.technical_test.entity.SupplierPF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierPfRepository extends JpaRepository<SupplierPF, Long> {
    Optional<SupplierPF> findByCpf(String cpf);
    boolean existsByCpf(String cpf);
}
