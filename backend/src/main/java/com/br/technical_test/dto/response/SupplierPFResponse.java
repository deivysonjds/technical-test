package com.br.technical_test.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierPFResponse extends SupplierResponse{
    private String cpf;
    private String rg;
    private LocalDate birthDate;
}
