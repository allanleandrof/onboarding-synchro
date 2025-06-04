package com.synchro.laser.contas_contabeis_crud.controller;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.dto.UpdateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.service.ContaContabilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

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

    @GetMapping("/{contaId}")
    public ResponseEntity<ContaContabil> getContasById(@PathVariable String contaId){

        var conta = contaContabilService.getContasById(contaId);

        return conta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ContaContabil>> listContas(){
        return ResponseEntity.ok(contaContabilService.listContas());
    }

    @DeleteMapping("/{contaId}")
    public ResponseEntity<Void> deleteById(@PathVariable String contaId){
        contaContabilService.deleteById(contaId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{contaId}")
    public ResponseEntity<Void> updateContaById(@PathVariable String contaId,
                                               @RequestBody UpdateContaDto updateContaDto) {
        contaContabilService.updateContaById(contaId, updateContaDto);
        return ResponseEntity.noContent().build();
    }
}
