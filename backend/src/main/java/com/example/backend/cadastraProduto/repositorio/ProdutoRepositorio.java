package com.example.backend.cadastraProduto.repositorio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.cadastraProduto.model.ProdutoModelo;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
    Optional<ProdutoModelo> findByNome(String nome);

    @Query("SELECT p FROM ProdutoModelo p WHERE LOWER(p.nome) LIKE %:nome%")
    List<ProdutoModelo> findByPartialNomeIgnoreCase(@RequestParam("nome") String nome);

}
