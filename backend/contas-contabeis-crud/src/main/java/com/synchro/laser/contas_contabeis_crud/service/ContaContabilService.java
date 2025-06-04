package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.repository.ContaContabilRepository;
import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ContaContabilService {

    private final ContaContabilRepository contaContabilRepository;
    private final HistoricoMovimentacaoRepository historicoMovimentacaoRepository;

    @Autowired
    public ContaContabilService(ContaContabilRepository contaContabilRepository, HistoricoMovimentacaoRepository historicoMovimentacaoRepository) {
        this.contaContabilRepository = contaContabilRepository;
        this.historicoMovimentacaoRepository = historicoMovimentacaoRepository;
    }

    public ContaContabil createConta(CreateContaDto createContaDto){

        if (contaContabilRepository.existsByCodigo(createContaDto.codigo())) {
            throw new RuntimeException("Código já existe: " + createContaDto.codigo());
        }

        var entity = ContaContabil.builder()
                .codigo(createContaDto.codigo())
                .nome(createContaDto.nome())
                .tipo(createContaDto.tipo())
                .saldo(createContaDto.saldo())
                .ativo(createContaDto.ativo())
                .build();

        return contaContabilRepository.save(entity);
    }

    public Optional<ContaContabil> getContasById(String contaId){

        return contaContabilRepository.findById(UUID.fromString(contaId));
    }

}
