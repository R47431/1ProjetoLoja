package com.example.backend.cadastraCliente.controller;

import com.example.backend.cadastraCliente.service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.cadastraCliente.model.ClienteModelo;
import com.example.backend.cadastraCliente.repositorioCliente.ClienteRepositorio;

import java.util.Optional;

@Controller
@RestController
@RequestMapping("/cadastraCliente")
@CrossOrigin("*")
public class ControllerCliente {

    private ClienteRepositorio cadastraRepositorio;

    private ClienteService cadastroService;

    @Autowired
    public ControllerCliente(ClienteRepositorio cadastraRepositorio, ClienteService cadastroService) {
        this.cadastraRepositorio = cadastraRepositorio;
        this.cadastroService = cadastroService;
    }

    @GetMapping
    public Iterable<ClienteModelo> lista() {
        return cadastraRepositorio.findAll();
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModelo cliente) {
        try {
            cadastroService.validarNomeIdadeTelefone(cliente);
            cadastroService.nomeExistente(cliente);
            cliente.setLogado(true);

            ClienteModelo retonarCliente = cadastraRepositorio.save(cliente);
            return ResponseEntity.ok(retonarCliente);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o cliente");
        }
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody ClienteModelo clienteAltera) {
        try {
            cadastroService.validarNomeIdadeTelefone(clienteAltera);
            cadastroService.nomeExistente(clienteAltera);
            clienteAltera.setLogado(true);

            Optional<ClienteModelo> cliente = cadastraRepositorio.findById(id);
            if (cliente.isPresent()) {
                clienteAltera.setId(id);
                ClienteModelo retonarCliente = cadastraRepositorio.save(clienteAltera);
                return ResponseEntity.ok(retonarCliente);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao alterar o cliente");
        }
        return null;
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        try {
            Optional<ClienteModelo> idCliente = cadastraRepositorio.findById(id);
            if (idCliente.isPresent()) {
                cadastraRepositorio.deleteById(id);
                return ResponseEntity.ok(id);
            }
            return ResponseEntity.badRequest().body("Nao encotrado");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/all")
    public void deletaTudo() {
        cadastraRepositorio.deleteAll();
    }

}
