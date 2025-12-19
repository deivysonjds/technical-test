package com.br.technical_test.mapper;

import com.br.technical_test.dto.request.SupplierPFRequest;
import com.br.technical_test.dto.request.SupplierPJRequest;
import com.br.technical_test.dto.response.*;
import com.br.technical_test.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierPF toPFEntity(SupplierPFRequest request);
    SupplierPJ toPJEntity(SupplierPJRequest request);

    SupplierPFResponse toPFResponse(SupplierPF supplier);
    SupplierPJResponse toPJResponse(SupplierPJ supplier);
    @Mapping(
            target = "suppliers",
            expression = "java(mapEnterprises(supplier.getEnterprises()))"
    )
    default SupplierResponse toResponse(Supplier supplier){
        if (supplier instanceof SupplierPF) return toPFResponse((SupplierPF) supplier);
        if (supplier instanceof SupplierPJ) return toPJResponse((SupplierPJ) supplier);
        throw new IllegalArgumentException("Unknown Supplier subtype: " + supplier.getClass());
    }

    EnterpriseSummaryResponse toEnterpriseSummaryResponse(Enterprise enterprise);

    default List<EnterpriseSummaryResponse> mapEnterprises(
            List<EnterpriseSupplier> enterprises
    ){
        if (enterprises == null || enterprises.isEmpty()) {
            return List.of();
        }

        return enterprises.stream()
                .map(EnterpriseSupplier::getEnterprise)
                .map(this::toEnterpriseSummaryResponse)
                .toList();
    }

    SupplierPFSummaryResponse toPFSummaryResponse(SupplierPF supplier);
    SupplierPJSummaryResponse toPJSummaryResponse(SupplierPJ supplier);
    default SupplierSummaryResponse toSummaryResponse(Supplier supplier){
        if (supplier instanceof SupplierPF) return toPFSummaryResponse((SupplierPF) supplier);
        if (supplier instanceof SupplierPJ) return toPJSummaryResponse((SupplierPJ) supplier);
        throw new IllegalArgumentException("Unknown Supplier subtype: " + supplier.getClass());
    }

}
