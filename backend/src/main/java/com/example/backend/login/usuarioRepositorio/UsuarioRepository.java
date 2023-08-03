package com.example.backend.login.usuarioRepositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.login.models.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNomeAndSenha(String nome, Integer senha);

    Optional<Usuario> findByNome(String nome);
}