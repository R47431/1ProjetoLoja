package com.example.backend.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.login.models.Usuario;
import com.example.backend.login.usuarioRepositorio.UsuarioRepository;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public void nomeExistente(Usuario usuario) {
        Optional<Usuario> nomeExistente = usuarioRepository.findByNome(usuario.getNome());
        if (nomeExistente.isPresent() && !nomeExistente.get().equals(usuario)) {
            throw new IllegalArgumentException("O nome do produto já está em uso.");
        }
    }

    /*
     * public Usuario validarUsuarioExistente(Usuario usuario) {
     * Usuario usuarioExistente =
     * usuarioRepository.findByNomeAndSenha(usuario.getNome(),usuario.getSenha());
     * if (usuarioExistente != null) {
     * if (!usuarioExistente.getNome().equals(usuario.getNome())) {
     * throw new IllegalArgumentException("Nome incorreta");
     * }else if (!usuarioExistente.getSenha().equals(usuario.getSenha())){
     * throw new IllegalArgumentException("Senha incorreta");
     * }
     * } else {
     * throw new IllegalArgumentException("Usuário não cadastrado") ;
     * }
     * return usuario;
     * }
     */
    public Usuario validarUsuario(Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findByNomeAndSenha(usuario.getNome(), usuario.getSenha());
        return Optional.ofNullable(usuarioExistente)
                .filter(u -> u.getNome().equals(usuario.getNome()))
                .filter(u -> u.getSenha().equals(usuario.getSenha()))
                .orElseThrow(() -> new IllegalArgumentException("Usuário não cadastrado"));
    }
}