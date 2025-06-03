package com.synchro.laser.contas_contabeis_crud.repository;

import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContaContabilRepository extends JpaRepository<ContaContabil, Long> {
}
