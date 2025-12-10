package com.br.technical_test.repository;

import com.br.technical_test.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    @Query("SELECT s FROM Supplier s " +
            "LEFT JOIN SupplierPF pf ON s.id = pf.id " +
            "LEFT JOIN SupplierPJ pj ON s.id = pj.id " +
            "WHERE (:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', CAST(:name AS string), '%'))) " +
            "AND (:document IS NULL OR " +
            "     (pf IS NOT NULL AND pf.cpf = :document) OR " +
            "     (pj IS NOT NULL AND pj.cnpj = :document))")
    Page<Supplier> findByFilters(
            @Param("name") String name,
            @Param("document") String document,
            Pageable pageable);
}
