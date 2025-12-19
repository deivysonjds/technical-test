package com.br.technical_test.mapper;

import com.br.technical_test.dto.request.EnterpriseRequest;
import com.br.technical_test.dto.response.*;
import com.br.technical_test.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = SupplierMapper.class)
public interface EnterpriseMapper {

    @Mapping(
            target = "suppliers",
            expression = "java(mapSuppliers(enterprise.getSuppliers()))"
    )
    EnterpriseResponse toResponse(Enterprise enterprise);
    EnterpriseSummaryResponse toSummaryResponse(Enterprise enterprise);

    Enterprise toEntity(EnterpriseRequest enterpriseRequest);

    SupplierPFSummaryResponse toPFSummaryResponse(SupplierPF supplierPF);
    SupplierPJSummaryResponse toPJSummaryResponse(SupplierPJ supplier);

    default List<SupplierSummaryResponse> mapSuppliers(
            List<EnterpriseSupplier> suppliers
    ) {
        if (suppliers == null || suppliers.isEmpty()) {
            return List.of();
        }

        return suppliers.stream()
                .map(EnterpriseSupplier::getSupplier)
                .map(supplier -> {
                    if (supplier instanceof SupplierPF) return toPFSummaryResponse((SupplierPF) supplier);
                    if (supplier instanceof SupplierPJ) return toPJSummaryResponse((SupplierPJ) supplier);
                    throw new IllegalArgumentException("Unknown Supplier subtype: " + supplier.getClass());
                })
                .toList();
    }

}

