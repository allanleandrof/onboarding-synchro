package com.synchro.laser.contas_contabeis_crud.model.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "historico_movimentacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoricoMovimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "conta_id", nullable = false)
    private ContaContabil conta;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private TipoOperacao operacao; // CRIACAO, ALTERACAO

    @Column(length = 500)
    private String descricao;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorAnterior;

    @Column(precision = 15, scale = 2)
    private BigDecimal valorNovo;

    @CreationTimestamp
    private LocalDateTime dataOperacao;

    public enum TipoOperacao {
        CRIACAO, ALTERACAO
    }
}
