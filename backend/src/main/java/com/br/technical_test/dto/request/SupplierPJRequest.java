package com.br.technical_test.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierPJRequest {
    @NotBlank(message = "CNPJ não pode ser nulo")
    private String cnpj;
    @NotBlank(message = "nome não pode ser nulo")
    private String name;
    @NotBlank(message = "e-mail não pode ser nulo")
    private String email;
    @NotBlank(message = "cep não pode ser nulo")
    private String cep;
}
