package com.br.technical_test.dto.response;

import com.br.technical_test.entity.Enterprise;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EnterpriseResponse {
    private Long id;
    private String name;
    private String cep;
    private String cnpj;

    public EnterpriseResponse(Enterprise enterprise){
        id = enterprise.getId();
        name = enterprise.getName();
        cep = enterprise.getCep();
        cnpj = enterprise.getCnpj();
    }
}
