package com.example.backend.cadastraProduto.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Produtos")
@Getter
@Setter
public class ProdutoModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long produtoId;

    private String nome;
    private Double preco;
    private String descricao;
    private String nomeImagem;

}
