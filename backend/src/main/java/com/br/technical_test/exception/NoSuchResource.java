package com.br.technical_test.exception;

public class NoSuchResource extends RuntimeException {
    public NoSuchResource(String resource) {
        super("No such Resource: "+resource);
    }
}
