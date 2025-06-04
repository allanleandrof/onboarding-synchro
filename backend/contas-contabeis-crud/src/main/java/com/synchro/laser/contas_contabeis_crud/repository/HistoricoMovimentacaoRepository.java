package com.synchro.laser.contas_contabeis_crud.repository;

import com.synchro.laser.contas_contabeis_crud.model.entities.HistoricoMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HistoricoMovimentacaoRepository extends JpaRepository <HistoricoMovimentacao, UUID>{
}
