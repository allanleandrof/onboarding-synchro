package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.stereotype.Service;

@Service
public class HistoricoMovimentacaoService {

    private final HistoricoMovimentacaoRepository historicoMovimentacaoRepository;

    public HistoricoMovimentacaoService(HistoricoMovimentacaoRepository historicoMovimentacaoRepository) {
        this.historicoMovimentacaoRepository = historicoMovimentacaoRepository;
    }
}
