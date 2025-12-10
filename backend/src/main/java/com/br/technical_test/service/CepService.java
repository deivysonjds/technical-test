package com.br.technical_test.service;

import com.br.technical_test.dto.response.CepResponse;
import com.br.technical_test.exception.NoSuchResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CepService {

    @Autowired
    private WebClient webClient;

    public String findCep(String cep) {
        CepResponse response = webClient.get()
                .uri("https://viacep.com.br/ws/{cep}/json/", cep)
                .retrieve()
                .bodyToMono(CepResponse.class)
                .block(); // síncrono
        if (response.getUf() == null) throw new NoSuchResource("cep");
        return response.getUf();
    }
}

