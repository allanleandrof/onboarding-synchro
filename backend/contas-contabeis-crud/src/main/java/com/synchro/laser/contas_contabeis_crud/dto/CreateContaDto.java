package com.synchro.laser.contas_contabeis_crud.dto;

import com.synchro.laser.contas_contabeis_crud.model.entities.ContaContabil;

import java.math.BigDecimal;

public record CreateContaDto(String codigo, String nome, ContaContabil.TipoConta tipo, BigDecimal saldo,
                             Boolean ativo) {
}
