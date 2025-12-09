package com.br.technical_test.controller;

import com.br.technical_test.dto.request.EnterpriseRequest;
import com.br.technical_test.dto.response.EnterpriseResponse;
import com.br.technical_test.entity.Enterprise;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.service.EnterpriseService;
import org.mapstruct.ap.shaded.freemarker.core.ReturnInstruction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<EnterpriseResponse> insert(@RequestBody EnterpriseRequest enterpriseRequest){
        try{
            EnterpriseResponse enterpriseResponse = enterpriseService.insert(enterpriseRequest);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(enterpriseResponse.getId())
                    .toUri();
            return ResponseEntity.created(uri).body(enterpriseResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/")
    public Page<EnterpriseResponse> findAll(@RequestParam(required = true, defaultValue = "1") Pageable pageable){
        return enterpriseService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> findById(@PathVariable Long id){
        try{
            EnterpriseResponse enterpriseResponse = enterpriseService.findById(id);
            return ResponseEntity.ok().body(enterpriseResponse);
        } catch (NoSuchResource e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        try {
            enterpriseService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchResource e){
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnterpriseResponse> updateById(@PathVariable Long id, @RequestBody EnterpriseRequest enterpriseRequest){
        try{
            EnterpriseResponse enterpriseResponse = enterpriseService.updateById(id, enterpriseRequest);
            return ResponseEntity.ok().body(enterpriseResponse);
        } catch (NoSuchResource e){
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
