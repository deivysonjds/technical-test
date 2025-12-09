package com.br.technical_test.repository;

import com.br.technical_test.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<Enterprise> findByCnpj(String cnpj);
}
