package com.br.technical_test.controller;

import com.br.technical_test.dto.request.SupplierPFRequest;
import com.br.technical_test.dto.request.SupplierPJRequest;
import com.br.technical_test.dto.response.SupplierResponse;
import com.br.technical_test.exception.NoSuchResource;
import com.br.technical_test.service.SupplierService;
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
@RequestMapping("/suppliers")
public class SupplierControllers {
    @Autowired
    private SupplierService supplierService;

    @PostMapping("/pf")
    public ResponseEntity<SupplierResponse> insertPf(@RequestBody SupplierPFRequest supplierPfRequest){
        try{
            SupplierResponse supplierResponse = supplierService.insertPf(supplierPfRequest);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(supplierResponse.getId())
                    .toUri();
            return ResponseEntity.created(uri).body(supplierResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/pj")
    public ResponseEntity<SupplierResponse> insertPj(@RequestBody SupplierPJRequest supplierPjRequest){
        try{
            SupplierResponse supplierResponse = supplierService.insertPj(supplierPjRequest);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(supplierResponse.getId())
                    .toUri();
            return ResponseEntity.created(uri).body(supplierResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<Page<SupplierResponse>> findAll(
            @PageableDefault(page = 0, size = 20, sort = "id", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String document){
        return ResponseEntity.ok(supplierService.findAll(name, document, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierResponse> findById(@PathVariable Long id){
        try{
            SupplierResponse enterpriseResponse = supplierService.findById(id);
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
            supplierService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchResource e){
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/pf/{id}")
    public ResponseEntity<SupplierResponse> updatePfById(@PathVariable Long id, @RequestBody SupplierPFRequest supplierPfRequest){
        try{
            SupplierResponse enterpriseResponse = supplierService.updatePFById(id, supplierPfRequest);
            return ResponseEntity.ok().body(enterpriseResponse);
        } catch (NoSuchResource e){
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/pj/{id}")
    public ResponseEntity<SupplierResponse> updatePjById(@PathVariable Long id, @RequestBody SupplierPJRequest supplierPjRequest){
        try{
            SupplierResponse enterpriseResponse = supplierService.updatePJById(id, supplierPjRequest);
            return ResponseEntity.ok().body(enterpriseResponse);
        } catch (NoSuchResource e){
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
