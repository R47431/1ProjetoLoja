package com.example.backend.cadastraProduto.service;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.cadastraProduto.model.ProdutoModelo;
import com.example.backend.cadastraProduto.repositorio.ProdutoRepositorio;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Optional;


@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    //TODO mude se estive com erro de nao acha cadastra e deleta
    Path currentPath = Paths.get(System.getProperty("user.dir"));
    Path desiredPath = currentPath.getParent();

    String diretorio = desiredPath.toString() + "/frontend/src/assets/image";
    public HashMap<String, String> diretorios(ProdutoModelo produtoModelo) {
        HashMap<String, String> diretorios = new HashMap<>();

        String nomeArquivo = produtoModelo.getProdutoId() + ".jpg";
        String nomeImagem = produtoModelo.getNomeImagem();

        String caminhoArquivo = diretorio + File.separator + nomeArquivo;
        String caminhoImagem = diretorio + File.separator + nomeImagem;

        diretorios.put("caminhoArquivo", caminhoArquivo);
        diretorios.put("caminhoImagem", caminhoImagem);

        return diretorios;
    }

    public void validaCampo(ProdutoModelo produtoModelo, MultipartFile imagem) {
        if (imagem.isEmpty()) {
            throw new IllegalArgumentException("A imagem do produto é obrigatória.");
        }
        Optional<ProdutoModelo> produtoExistente = produtoRepositorio.findByNome(produtoModelo.getNome());
        if (produtoExistente.isPresent() && !produtoExistente.get().equals(produtoModelo)) {
            throw new IllegalArgumentException("O nome do produto já está em uso.");
        }
    }

}
