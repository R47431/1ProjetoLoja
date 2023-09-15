package com.example.backend.cadastraCliente.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter
public class ClienteModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer idade;
    private Integer telefone;
    private Integer senha;
    private Boolean logado;

    @Enumerated(EnumType.STRING)
    private Cargo cargo;



}