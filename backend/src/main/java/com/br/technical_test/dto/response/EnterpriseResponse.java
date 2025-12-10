package com.br.technical_test.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseResponse {
    private Long id;
    private String name;
    private String cep;
    private String cnpj;
}
