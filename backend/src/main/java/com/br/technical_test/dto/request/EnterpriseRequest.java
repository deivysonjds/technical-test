package com.br.technical_test.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class EnterpriseRequest {
    @NotBlank(message = "nome não pode ser nulo")
    private String name;
    @NotBlank(message = "cep não pode ser nulo")
    private String cep;
    @NotBlank(message = "cnpj não pode ser nulo")
    private String cnpj;
}
