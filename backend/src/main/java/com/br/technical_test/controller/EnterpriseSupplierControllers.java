package com.br.technical_test.controller;

import com.br.technical_test.dto.request.EnterpriseSupplierRequest;
import com.br.technical_test.dto.response.EnterpriseSupplierResponse;
import com.br.technical_test.service.EnterpriseSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/association")
public class EnterpriseSupplierControllers {

    @Autowired
    private EnterpriseSupplierService enterpriseSupplierService;

    @PostMapping("/")
    public ResponseEntity<EnterpriseSupplierResponse> associate(@RequestBody EnterpriseSupplierRequest enterpriseSupplierRequest){
        try{
            EnterpriseSupplierResponse enterpriseSupplierResponse = enterpriseSupplierService.associate(enterpriseSupplierRequest);
            return ResponseEntity.ok().body(enterpriseSupplierResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
