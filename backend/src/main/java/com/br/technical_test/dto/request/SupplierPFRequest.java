package com.br.technical_test.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupplierPFRequest {
    @NotBlank(message = "CPF não pode ser nulo")
    private String cpf;
    @NotBlank(message = "nome não pode ser nulo")
    private String name;
    @NotBlank(message = "e-mail não pode ser nulo")
    private String email;
    @NotBlank(message = "cep não pode ser nulo")
    private String cep;
    @NotBlank(message = "rg não pode ser nulo")
    private String rg;
    @NotBlank(message = "data de aniversário não pode ser nulo")
    private LocalDate birthDate;
}
