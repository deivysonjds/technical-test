package com.br.technical_test.service;

import com.br.technical_test.dto.request.EnterpriseRequest;
import com.br.technical_test.dto.response.EnterpriseResponse;
import com.br.technical_test.entity.Enterprise;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.mapper.EnterpriseMapper;
import com.br.technical_test.repository.EnterpriseRepository;
import com.br.technical_test.validation.CepValidation;
import com.br.technical_test.validation.DocumentValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private EnterpriseMapper enterpriseMapper;

    @Transactional
    public EnterpriseResponse insert(EnterpriseRequest enterpriseRequest){
        Enterprise enterprise = enterpriseMapper.toEntity(enterpriseRequest);
        if (!DocumentValidation.isCnpj(enterprise.getCnpj()) || !CepValidation.isCep(enterprise.getCep())) throw new IllegalArgumentException("Cnpj or Cep invalid");

        enterprise = enterpriseRepository.save(enterprise);
        return enterpriseMapper.toResponse(enterprise);
    }

    @Transactional(readOnly = true)
    public Page<EnterpriseResponse> findAll(Pageable pageable){
        return enterpriseRepository.findAll(pageable).map(enterpriseMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public EnterpriseResponse findById(Long id){
        Optional<Enterprise> enterprise = enterpriseRepository.findById(id);
        if (enterprise.isEmpty()) throw new NoSuchResource("enterprise");

        return enterpriseMapper.toResponse(enterprise.get());
    }

    @Transactional(readOnly = true)
    public EnterpriseResponse findByCnpj(String cnpj){
        Optional<Enterprise> enterprise = enterpriseRepository.findByCnpj(cnpj);
        if (enterprise.isEmpty()) throw new NoSuchResource("enterprise");

        return enterpriseMapper.toResponse(enterprise.get());
    }

    @Transactional
    public EnterpriseResponse updateById(Long id, EnterpriseRequest enterpriseRequest){
        if (!enterpriseRepository.existsById(id)) throw new NoSuchResource("enterprise");

        Enterprise enterprise = enterpriseMapper.toEntity(enterpriseRequest);
        enterprise.setId(id);
        enterprise = enterpriseRepository.save(enterprise);

        return enterpriseMapper.toResponse(enterprise);
    }

    @Transactional
    public void deleteById(Long id){
        boolean enterpriseExists = enterpriseRepository.existsById(id);
        if (!enterpriseExists) throw new NoSuchResource(("enterprise"));
        enterpriseRepository.deleteById(id);
    }
}
