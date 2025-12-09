package com.br.technical_test;

import com.br.technical_test.entity.Enterprise;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.repository.EnterpriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Transactional(readOnly = true)
    public List<Enterprise> findAll(){
        return enterpriseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Enterprise findById(Long id){
        Optional<Enterprise> enterprise = enterpriseRepository.findById(id);
        if (enterprise.isEmpty()) throw new NoSuchResource("enterprise");
        return enterprise.get();
    }

    @Transactional(readOnly = true)
    public Enterprise findByCnpj(String cnpj){
        Optional<Enterprise> enterprise = enterpriseRepository.findByCnpj(cnpj);
        if (enterprise.isEmpty()) throw new NoSuchResource("enterprise");
        return enterprise.get();
    }

    @Transactional
    public void deleteById(Long id){
        boolean enterpriseExists = enterpriseRepository.existsById(id);
        if (!enterpriseExists) throw new NoSuchResource(("enterprise"));
        enterpriseRepository.deleteById(id);
    }
}
