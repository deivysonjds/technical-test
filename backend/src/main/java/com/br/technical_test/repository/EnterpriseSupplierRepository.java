package com.br.technical_test.repository;

import com.br.technical_test.entity.EnterpriseSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnterpriseSupplierRepository extends JpaRepository<EnterpriseSupplier, Long> {
    List<EnterpriseSupplier> findByEnterpriseId(Long enterpriseId);
    List<EnterpriseSupplier> findBySupplierId(Long supplierId);
    boolean existsByEnterpriseIdAndSupplierId(Long enterpriseId, Long supplierId);
}
