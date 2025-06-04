package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.dto.UpdateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.repository.ContaContabilRepository;
import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<ContaContabil> listContas() {
        return contaContabilRepository.findAll();
    }

    public void deleteById(String contaId) {
        var id = UUID.fromString(contaId);

        if (contaContabilRepository.existsById(id)) {
            contaContabilRepository.deleteById(id);
        }
    }

    public void updateContaById(String contaId, UpdateContaDto updateContaDto) {
        var id = UUID.fromString(contaId);

        var contaEntity = contaContabilRepository.findById(id);

        if (contaEntity.isPresent()) {
            var conta = contaEntity.get();

            if (updateContaDto.nome() != null) {
                conta.setNome(updateContaDto.nome());
            }

            if (updateContaDto.tipo() != null) {
                conta.setTipo(updateContaDto.tipo());
            }

            if (updateContaDto.saldo() != null) {
                conta.setSaldo(updateContaDto.saldo());
            }

            if (updateContaDto.ativo() != null) {
                conta.setAtivo(updateContaDto.ativo());
            }

            contaContabilRepository.save(conta);
        }
    }

}
