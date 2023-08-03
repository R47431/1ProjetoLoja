package com.example.backend.produto.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.produto.model.Produto;

import java.util.Optional;


@Repository
public interface ProdutoRepositorio extends CrudRepository<Produto, Long> {
    Optional<Produto> findByNome(String nome);

}
