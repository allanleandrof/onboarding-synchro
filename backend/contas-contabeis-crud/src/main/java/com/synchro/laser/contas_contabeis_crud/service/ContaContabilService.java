package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.repository.ContaContabilRepository;
import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContaContabilService {

    private final ContaContabilRepository contaContabilRepository;
    private final HistoricoMovimentacaoRepository historicoMovimentacaoRepository;

    @Autowired
    public ContaContabilService(ContaContabilRepository contaContabilRepository, HistoricoMovimentacaoRepository historicoMovimentacaoRepository) {
        this.contaContabilRepository = contaContabilRepository;
        this.historicoMovimentacaoRepository = historicoMovimentacaoRepository;
    }

}
