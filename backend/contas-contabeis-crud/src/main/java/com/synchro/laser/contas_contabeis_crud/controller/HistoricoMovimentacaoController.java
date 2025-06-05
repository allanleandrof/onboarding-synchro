package com.synchro.laser.contas_contabeis_crud.controller;

import com.synchro.laser.contas_contabeis_crud.model.entities.HistoricoMovimentacao;
import com.synchro.laser.contas_contabeis_crud.service.HistoricoMovimentacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/historico")
public class HistoricoMovimentacaoController {

    private final HistoricoMovimentacaoService historicoMovimentacaoService;

    public HistoricoMovimentacaoController(HistoricoMovimentacaoService historicoMovimentacaoService) {
        this.historicoMovimentacaoService = historicoMovimentacaoService;
    }


    @GetMapping
    public ResponseEntity<List<HistoricoMovimentacao>> listContas(){
        return ResponseEntity.ok(historicoMovimentacaoService.listContas());
    }
}
