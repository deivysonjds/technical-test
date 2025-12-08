package com.br.technical_test.repository;

import com.br.technical_test.entity.EnterpriseSupplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnterpriseSupplierRepository extends JpaRepository<EnterpriseSupplier, Long> {
    List<EnterpriseSupplier> findByEnterprise(Long enterprise);
    List<EnterpriseSupplier> findBySupplier(Long supplier);
    boolean existsByEnterpriseAndSupplier(Long enterpriseId, Long supplierId);
}
