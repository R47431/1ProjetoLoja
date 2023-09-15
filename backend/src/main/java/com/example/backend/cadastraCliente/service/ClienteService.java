package com.example.backend.cadastraCliente.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.cadastraCliente.model.ClienteModelo;
import com.example.backend.cadastraCliente.repositorioCliente.ClienteRepositorio;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ClienteService {

    private final ClienteRepositorio clienteRepositorio;

    @Autowired
    public ClienteService(ClienteRepositorio cadastraRepositorio) {
        this.clienteRepositorio = cadastraRepositorio;
    }

    public boolean telefonePattern(ClienteModelo cliente) {
        String telefone = cliente.getTelefone().toString();
        Pattern pattern = Pattern.compile("\\d{9}");
        Matcher matcher = pattern.matcher(telefone);

        return matcher.matches();
    }

    public void validarNomeIdadeTelefone(ClienteModelo cadastratoModelo) {
        if (cadastratoModelo.getNome() == null || cadastratoModelo.getNome().isEmpty()) {
            throw new IllegalArgumentException("Coloquer um nome");
        } else if (cadastratoModelo.getIdade() == null || cadastratoModelo.getIdade() < 0) {
            throw new IllegalArgumentException("Coloquer uma idade");
        } else if (!telefonePattern(cadastratoModelo)) {
            throw new IllegalArgumentException("O telefone tem quer ter 9 digitos");
        }
    }

    public void nomeExistente(ClienteModelo cadastratoModelo) {
        Optional<ClienteModelo> nomeExistente = clienteRepositorio.findByNome(cadastratoModelo.getNome());
        if (nomeExistente.isPresent() && !nomeExistente.get().equals(cadastratoModelo)) {
            throw new IllegalArgumentException("O nome do produto já está em uso.");
        }
    }
    public ClienteModelo validarUsuario(ClienteModelo clienteModelo) {
        ClienteModelo usuarioExistente = clienteRepositorio.findByNomeAndSenha(clienteModelo.getNome(), clienteModelo.getSenha());
        return Optional.ofNullable(usuarioExistente)
                .filter(u -> u.getNome().equals(clienteModelo.getNome()))
                .filter(u -> u.getSenha().equals(clienteModelo.getSenha()))
                .orElseThrow(() -> new IllegalArgumentException("Usuário não cadastrado"));
    }


}
