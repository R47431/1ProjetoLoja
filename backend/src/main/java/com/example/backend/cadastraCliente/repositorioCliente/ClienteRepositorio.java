package com.example.backend.cadastraCliente.repositorioCliente;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.cadastraCliente.model.ClienteModelo;

@Repository
public interface ClienteRepositorio extends CrudRepository<ClienteModelo, Long> {
    ClienteModelo findByNomeAndIdadeAndTelefone(String nome, Integer idade, Integer telefone);

    Optional<ClienteModelo> findByNome(String nome);
}
