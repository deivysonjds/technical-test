package com.br.technical_test.controller;

import com.br.technical_test.dto.request.EnterpriseRequest;
import com.br.technical_test.dto.response.EnterpriseResponse;
import com.br.technical_test.dto.response.EnterpriseSummaryResponse;
import com.br.technical_test.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/enterprises")
public class EnterpriseControllers {
    @Autowired
    private EnterpriseService enterpriseService;

    @PostMapping("/")
    public ResponseEntity<EnterpriseSummaryResponse> insert(@RequestBody EnterpriseRequest enterpriseRequest){

        EnterpriseSummaryResponse enterpriseResponse = enterpriseService.insert(enterpriseRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(enterpriseResponse.getId())
                .toUri();
        return ResponseEntity.created(uri).body(enterpriseResponse);
    }

    @GetMapping("/")
    public ResponseEntity<Page<EnterpriseResponse>> findAll(
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {

        Page<EnterpriseResponse> page = enterpriseService.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> findById(@PathVariable Long id){
        EnterpriseResponse enterpriseResponse = enterpriseService.findById(id);
        return ResponseEntity.ok().body(enterpriseResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        enterpriseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> updateById(@PathVariable Long id, @RequestBody EnterpriseRequest enterpriseRequest){
        EnterpriseResponse enterpriseResponse = enterpriseService.updateById(id, enterpriseRequest);
        return ResponseEntity.ok().body(enterpriseResponse);
    }
}
