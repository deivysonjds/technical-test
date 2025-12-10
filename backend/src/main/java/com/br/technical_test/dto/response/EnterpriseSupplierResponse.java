package com.br.technical_test.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseSupplierResponse {
    private Long enterpriseId;
    private Long supplierId;
}
