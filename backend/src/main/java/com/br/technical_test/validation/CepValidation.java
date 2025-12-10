package com.br.technical_test.validation;

public class CepValidation {
    public static boolean isCep(String cep) {
        return cep != null && cep.matches("\\d{8}");
    }

    public static boolean isParana(String uf){
        return uf.equalsIgnoreCase("pr");
    }
}
