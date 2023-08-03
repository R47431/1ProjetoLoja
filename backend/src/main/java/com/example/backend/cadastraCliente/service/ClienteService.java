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
    @Autowired
    private ClienteRepositorio cadastraRepositorio;

    public boolean telefonePattern(ClienteModelo cliente) {
        String telefone = cliente.getTelefone().toString();
        Pattern pattern = Pattern.compile("\\d{9}");
        Matcher matcher = pattern.matcher(telefone);

        return matcher.matches();
    }

    public void validarNomeIdadeTelefone(ClienteModelo cliente) {
        if (cliente.getNome() == null || cliente.getNome().isEmpty()) {
            throw new  IllegalArgumentException("Coloquer um nome");
        } else if (cliente.getIdade() == null || cliente.getIdade() < 0) {
            throw new  IllegalArgumentException("Coloquer uma idade");
        } else if (telefonePattern(cliente)) {
            throw new  IllegalArgumentException("O telefone tem quer ter 9 digitos");
        }
    }

    public void nomeExistente(ClienteModelo cadastratoModelo) {
        Optional<ClienteModelo> nomeExistente = cadastraRepositorio.findByNome(cadastratoModelo.getNome());
        if (nomeExistente.isPresent() && !nomeExistente.get().equals(cadastratoModelo)) {
            throw new IllegalArgumentException("O nome do produto já está em uso.");
        }
    }

    /*
     * public Cliente valida(Cliente cliente){
     * Cliente validaCliente = cadastraRepositorio.cliente(cliente);
     * return Optional.ofNullable(validaCliente)
     * .filter(u -> u.getNome().isEmpty())
     * .filter(u -> u.getIdade()<= 0)
     * .filter(u -> telefonePattern(cliente))
     * .orElseThrow(()-> new IllegalArgumentException("preenche os campos") );
     * }
     */

}
