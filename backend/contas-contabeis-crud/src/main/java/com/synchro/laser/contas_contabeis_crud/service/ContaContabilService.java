package com.synchro.laser.contas_contabeis_crud.service;

import com.synchro.laser.contas_contabeis_crud.dto.CreateContaDto;
import com.synchro.laser.contas_contabeis_crud.dto.UpdateContaDto;
import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import com.synchro.laser.contas_contabeis_crud.model.entities.HistoricoMovimentacao;
import com.synchro.laser.contas_contabeis_crud.repository.ContaContabilRepository;
import com.synchro.laser.contas_contabeis_crud.repository.HistoricoMovimentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContaContabilService {

    private final ContaContabilRepository contaContabilRepository;
    private final HistoricoMovimentacaoRepository historicoMovimentacaoRepository;
    private final HistoricoMovimentacaoService historicoMovimentacaoService;

    @Autowired
    public ContaContabilService(ContaContabilRepository contaContabilRepository, HistoricoMovimentacaoRepository historicoMovimentacaoRepository, HistoricoMovimentacaoService historicoMovimentacaoService) {
        this.contaContabilRepository = contaContabilRepository;
        this.historicoMovimentacaoRepository = historicoMovimentacaoRepository;
        this.historicoMovimentacaoService = historicoMovimentacaoService;
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

        var contaSalva = contaContabilRepository.save(entity);

        BigDecimal valorAnt = BigDecimal.valueOf(0);
        HistoricoMovimentacao.TipoOperacao operacao = HistoricoMovimentacao.TipoOperacao.valueOf("CRIACAO");

        historicoMovimentacaoService.createMovimentacao(contaSalva, operacao, "Conta "
                + contaSalva.getNome() + " criada", valorAnt);

        return contaSalva;
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
        var valorAnt = contaEntity.get().getSaldo();

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

            HistoricoMovimentacao.TipoOperacao operacao = HistoricoMovimentacao.TipoOperacao.valueOf("ALTERACAO");

            contaContabilRepository.save(conta);

            historicoMovimentacaoService.createMovimentacao(conta, operacao, "Conta "
                    + conta.getNome() + " atualizada", valorAnt);
        }
    }

}
