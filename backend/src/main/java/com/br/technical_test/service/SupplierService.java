package com.br.technical_test.service;

import com.br.technical_test.dto.request.SupplierPFRequest;
import com.br.technical_test.dto.request.SupplierPJRequest;
import com.br.technical_test.dto.response.SupplierPFResponse;
import com.br.technical_test.dto.response.SupplierPJResponse;
import com.br.technical_test.dto.response.SupplierResponse;
import com.br.technical_test.entity.Supplier;
import com.br.technical_test.entity.SupplierPF;
import com.br.technical_test.entity.SupplierPJ;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.mapper.SupplierMapper;
import com.br.technical_test.repository.SupplierPfRepository;
import com.br.technical_test.repository.SupplierPjRepository;
import com.br.technical_test.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private SupplierPfRepository supplierPfRepository;
    @Autowired
    private SupplierPjRepository supplierPjRepository;

    @Autowired
    private SupplierMapper supplierMapper;

    @Transactional
    public SupplierPJResponse insertPj(SupplierPJRequest supplierPjRequest){
        SupplierPJ supplier = supplierMapper.toPJEntity(supplierPjRequest);
        supplier = supplierPjRepository.save(supplier);
        return supplierMapper.toPJResponse(supplier);
    }

    public SupplierPFResponse insertPf(SupplierPFRequest supplierPfRequest){
        SupplierPF supplier = supplierMapper.toPFEntity(supplierPfRequest);
        supplier = supplierPfRepository.save(supplier);
        return supplierMapper.toPFResponse(supplier);
    }

    @Transactional(readOnly = true)
    public Page<SupplierResponse> findAll(Pageable pageable){
        return supplierRepository.findAll(pageable).map(supplierMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public SupplierResponse findById(Long id){
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if (supplier.isEmpty()) throw new NoSuchResource("supplier");
        return supplierMapper.toResponse(supplier.get());
    }

    @Transactional
    public SupplierResponse updatePFById(Long id, SupplierPFRequest supplierPfRequest){
        if (!supplierRepository.existsById(id)) throw new NoSuchResource("supplier");

        SupplierPF supplier = supplierMapper.toPFEntity(supplierPfRequest);
        supplier.setId(id);
        supplier = supplierRepository.save(supplier);

        return supplierMapper.toResponse(supplier);
    }

    @Transactional
    public SupplierResponse updatePJById(Long id, SupplierPJRequest supplierPjRequest){
        if (!supplierRepository.existsById(id)) throw new NoSuchResource("supplier");

        SupplierPJ supplier = supplierMapper.toPJEntity(supplierPjRequest);
        supplier.setId(id);
        supplier = supplierRepository.save(supplier);

        return supplierMapper.toResponse(supplier);
    }

    @Transactional
    public void deleteById(Long id){
        boolean supplierExists = supplierRepository.existsById(id);
        if (!supplierExists) throw new NoSuchResource(("supplier"));
        supplierRepository.deleteById(id);
    }
}
