package com.br.technical_test.repository;

import com.br.technical_test.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<Enterprise> findByCnpj(String cnpj);
}
