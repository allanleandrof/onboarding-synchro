package com.synchro.laser.contas_contabeis_crud.controller;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.service.ContaContabilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/conta")
public class ContaContabilController {

    private final ContaContabilService contaContabilService;

    @Autowired
    public ContaContabilController(ContaContabilService contaContabilService) {
        this.contaContabilService = contaContabilService;
    }

    @PostMapping
    public ResponseEntity<ContaContabil> createConta(@RequestBody CreateContaDto createContaDto){

        var conta = contaContabilService.createConta(createContaDto);

        return ResponseEntity.created(URI.create("/conta/" + conta.getId()))
                .body(conta);
    }

}
