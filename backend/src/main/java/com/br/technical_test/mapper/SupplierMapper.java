package com.br.technical_test.mapper;

import com.br.technical_test.dto.request.SupplierPFRequest;
import com.br.technical_test.dto.request.SupplierPJRequest;
import com.br.technical_test.dto.response.SupplierPFResponse;
import com.br.technical_test.dto.response.SupplierPJResponse;
import com.br.technical_test.dto.response.SupplierResponse;
import com.br.technical_test.entity.Supplier;
import com.br.technical_test.entity.SupplierPF;
import com.br.technical_test.entity.SupplierPJ;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierPF toPFEntity(SupplierPFRequest request);
    SupplierPJ toPJEntity(SupplierPJRequest request);

    SupplierPFResponse toPFResponse(SupplierPF supplier);
    SupplierPJResponse toPJResponse(SupplierPJ supplier);
    default SupplierResponse toResponse(Supplier supplier){
        if (supplier instanceof SupplierPF) return toPFResponse((SupplierPF) supplier);
        if (supplier instanceof SupplierPJ) return toPJResponse((SupplierPJ) supplier);
        throw new IllegalArgumentException("Unknown Supplier subtype: " + supplier.getClass());
    }

}
