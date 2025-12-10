package com.br.technical_test.mapper;

import com.br.technical_test.dto.request.EnterpriseRequest;
import com.br.technical_test.dto.response.EnterpriseResponse;
import com.br.technical_test.entity.Enterprise;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EnterpriseMapper {
    EnterpriseResponse toResponse(Enterprise enterprise);
    Enterprise toEntity(EnterpriseRequest enterpriseRequest);
    List<EnterpriseResponse> toDtoList(List<Enterprise> enterprises);
}
