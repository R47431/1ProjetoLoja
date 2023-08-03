package com.example.backend.produto.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.produto.model.Produto;
import com.example.backend.produto.repositorio.ProdutoRepositorio;

import java.io.File;
import java.util.HashMap;
import java.util.Optional;


@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    String diretorio = "src/assets/image";

    public HashMap<String, String> diretorios(Produto produto) {
        HashMap<String, String> diretorios = new HashMap<>();

        String nomeArquivo = produto.getNome() + ".jpg";
        String nomeImagem = produto.getNomeImagem();

        String caminhoArquivo = diretorio + File.separator + nomeArquivo;
        String caminhoImagem = diretorio + File.separator + nomeImagem;

        diretorios.put("caminhoArquivo", caminhoArquivo);
        diretorios.put("caminhoImagem", caminhoImagem);

        return diretorios;
    }


    public void validaCampo(Produto produto, MultipartFile imagem) {
        if (imagem.isEmpty()) {
            throw new IllegalArgumentException("A imagem do produto é obrigatória.");
        }
        Optional<Produto> produtoExistente = produtoRepositorio.findByNome(produto.getNome());
        if (produtoExistente.isPresent() && !produtoExistente.get().equals(produto)) {
            throw new IllegalArgumentException("O nome do produto já está em uso.");
        }
    }

}
