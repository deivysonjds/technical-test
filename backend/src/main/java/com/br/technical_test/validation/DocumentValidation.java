package com.br.technical_test.validation;

public class DocumentValidation {
    public static boolean isCpf(String cpf) {
        return cpf != null && cpf.matches("\\d{11}");
    }

    public static boolean isCnpj(String cnpj) {
        return cnpj != null && cnpj.matches("\\d{14}");
    }

    public static boolean isRg(String rg) {
        return rg != null && rg.matches("\\d{7,9}");
    }
}
