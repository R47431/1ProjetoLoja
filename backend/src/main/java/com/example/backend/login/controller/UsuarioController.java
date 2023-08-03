package com.example.backend.login.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerErrorException;

import com.example.backend.login.models.Usuario;
import com.example.backend.login.service.UsuarioService;
import com.example.backend.login.usuarioRepositorio.UsuarioRepository;



@Controller
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class UsuarioController {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    @Autowired
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioRepository usuarioRepository, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public Iterable<Usuario> listaUsuario() {
        return usuarioRepository.findAll();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> altera(@RequestBody Usuario usuario) {
        try {
            usuarioService.nomeExistente(usuario);

            usuario.setLogado(true);
            Usuario usuarioCadastra = usuarioRepository.save(usuario);

            return ResponseEntity.ok(usuarioCadastra);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (ServerErrorException e) {
            return ResponseEntity.internalServerError().body("Ocorreu um erro ao processar o cadastro.");
        }
    }

    @DeleteMapping(path = "/{id}")
    public void deleta(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    @PostMapping("/validaUsuario")
    public ResponseEntity<?> acessoAoLogin(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioExistente = usuarioService.validarUsuario(usuario);
            return ResponseEntity.ok().body(usuarioExistente);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("acesso negado");
        }
    }

    @DeleteMapping("/all")
    public void emCasoDeValoresNullOuSemPaciencia() {
        usuarioRepository.deleteAll();
    }
}