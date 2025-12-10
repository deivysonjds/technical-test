package com.br.technical_test.validation;

import java.time.LocalDate;

public class AgeValidation {

    public static boolean isLegalAge(LocalDate birthDate){
        return !birthDate.plusYears(18).isAfter(LocalDate.now());
    }
}
