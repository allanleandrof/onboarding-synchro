package com.synchro.laser.contas_contabeis_crud.repository;

import com.synchro.laser.contas_contabeis_crud.model.entities.HistoricoMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricoMovimentacaoRepository extends JpaRepository <HistoricoMovimentacao, Long>{
}
