package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.model.entities.HistoricoMovimentacao;
import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class HistoricoMovimentacaoService {

    private final HistoricoMovimentacaoRepository historicoMovimentacaoRepository;

    public HistoricoMovimentacaoService(HistoricoMovimentacaoRepository historicoMovimentacaoRepository) {
        this.historicoMovimentacaoRepository = historicoMovimentacaoRepository;
    }

    public HistoricoMovimentacao createMovimentacao(ContaContabil conta, HistoricoMovimentacao.TipoOperacao operacao,
                                             String descricao, BigDecimal valorAnt){

        var entity = HistoricoMovimentacao.builder()
                .conta(conta)
                .operacao(operacao)
                .descricao(descricao)
                .valorAnterior(valorAnt)
                .valorNovo(conta.getSaldo())
                .build();

        return historicoMovimentacaoRepository.save(entity);
    }

    public List<HistoricoMovimentacao> listContas() {
        return historicoMovimentacaoRepository.findAll();
    }
}
