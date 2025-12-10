package com.br.technical_test.service;

import com.br.technical_test.dto.response.EnterpriseSupplierResponse;
import com.br.technical_test.entity.Enterprise;
import com.br.technical_test.entity.EnterpriseSupplier;
import com.br.technical_test.entity.Supplier;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.repository.EnterpriseRepository;
import com.br.technical_test.repository.EnterpriseSupplierRepository;
import com.br.technical_test.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class EnterpriseSupplierService {
    @Autowired
    private EnterpriseSupplierRepository enterpriseSupplierRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Transactional
    public EnterpriseSupplierResponse associate(Long enterpriseId, Long supplierId){
        boolean associationAlreadyExists = enterpriseSupplierRepository.existsByEnterpriseIdAndSupplierId(enterpriseId, supplierId);
        if (associationAlreadyExists) throw new IllegalArgumentException("Association already exists");

        EnterpriseSupplier enterpriseSupplier = toEntity(enterpriseId, supplierId);
        return toResponse(enterpriseSupplierRepository.save(enterpriseSupplier));
    }

    private EnterpriseSupplier toEntity(Long enterpriseId, Long supplierId){
        Optional<Enterprise> enterprise = enterpriseRepository.findById(enterpriseId);
        if (enterprise.isEmpty()) throw new NoSuchResource("enterprise");

        Optional<Supplier> supplier = supplierRepository.findById(supplierId);
        if (supplier.isEmpty()) throw new NoSuchResource("supplier");

        return new EnterpriseSupplier(enterprise.get(), supplier.get());
    }

    private EnterpriseSupplierResponse toResponse(EnterpriseSupplier enterpriseSupplier){
        return new EnterpriseSupplierResponse(enterpriseSupplier.getEnterprise().getId(), enterpriseSupplier.getSupplier().getId());
    }
}
