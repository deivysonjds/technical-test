package com.br.technical_test.service;

import com.br.technical_test.dto.request.EnterpriseSupplierRequest;
import com.br.technical_test.dto.response.EnterpriseSupplierResponse;
import com.br.technical_test.dto.response.SupplierResponse;
import com.br.technical_test.entity.Enterprise;
import com.br.technical_test.entity.EnterpriseSupplier;
import com.br.technical_test.entity.Supplier;
import com.br.technical_test.entity.SupplierPF;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.repository.EnterpriseRepository;
import com.br.technical_test.repository.EnterpriseSupplierRepository;
import com.br.technical_test.repository.SupplierPfRepository;
import com.br.technical_test.repository.SupplierRepository;
import com.br.technical_test.validation.AgeValidation;
import com.br.technical_test.validation.CepValidation;
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
    @Autowired
    private SupplierPfRepository supplierPfRepository;
    @Autowired
    private CepService cepService;

    @Transactional
    public EnterpriseSupplierResponse associate(EnterpriseSupplierRequest enterpriseSupplierRequest){
        boolean associationAlreadyExists = enterpriseSupplierRepository.existsByEnterpriseIdAndSupplierId(enterpriseSupplierRequest.getEnterpriseId(), enterpriseSupplierRequest.getSupplierId());
        if (associationAlreadyExists) throw new IllegalArgumentException("Association already exists");

        EnterpriseSupplier enterpriseSupplier = toEntity(enterpriseSupplierRequest.getEnterpriseId(), enterpriseSupplierRequest.getSupplierId());
        String uf = enterpriseSupplier.getEnterprise().getCep();

        boolean isParana = CepValidation.isParana(cepService.findCep(uf));
        boolean isPF = enterpriseSupplier.getSupplier() instanceof SupplierPF;
        if (isParana & isPF){
            Optional<SupplierPF> supplierPF = supplierPfRepository.findById(enterpriseSupplier.getSupplier().getId());
            if (supplierPF.isEmpty()) throw new NoSuchResource("supplier");

            if (!AgeValidation.isLegalAge(supplierPF.get().getBirthDate())) throw new IllegalArgumentException("Age invalid");
        }


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
