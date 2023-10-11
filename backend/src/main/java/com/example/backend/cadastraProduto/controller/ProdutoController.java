package com.example.backend.cadastraProduto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.cadastraProduto.model.ProdutoModelo;
import com.example.backend.cadastraProduto.repositorio.ProdutoRepositorio;
import com.example.backend.cadastraProduto.service.ProdutoService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Controller
@RestController
@RequestMapping("/cadastraProduto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepositorio produtoRepositorio;
    private final ProdutoService produtoService;

    @Autowired
    public ProdutoController(ProdutoRepositorio produtoRepositorio, ProdutoService produtoService) {
        this.produtoRepositorio = produtoRepositorio;
        this.produtoService = produtoService;
    }

    @GetMapping
    public Iterable<ProdutoModelo> listar() {
        return produtoRepositorio.findAll();
    }

    @PostMapping
    public ResponseEntity<?> cadastra( ProdutoModelo produtoModelo, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.validaCampo(produtoModelo, imagem);

            ProdutoModelo obterId = produtoRepositorio.save(produtoModelo);

            produtoModelo.setNomeImagem(produtoModelo.getProdutoId() + ".jpg");

            HashMap<String, String> diterotio = produtoService.diretorios(produtoModelo);
            String diretorioArquivo = diterotio.get("caminhoArquivo");

            Files.copy(imagem.getInputStream(), Paths.get(diretorioArquivo), StandardCopyOption.REPLACE_EXISTING);

            ProdutoModelo cadastrarProdutoModelo = produtoRepositorio.save(obterId);
            return ResponseEntity.ok(cadastrarProdutoModelo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao processar o Cadastro.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> altera(ProdutoModelo produtoModelo, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.validaCampo(produtoModelo, imagem);

            produtoModelo.setNomeImagem(produtoModelo.getProdutoId() + ".jpg");

            HashMap<String, String> diterotio = produtoService.diretorios(produtoModelo);
            String diretorioArquivo = diterotio.get("caminhoArquivo");

            Files.copy(imagem.getInputStream(), Paths.get(diretorioArquivo), StandardCopyOption.REPLACE_EXISTING);

            ProdutoModelo alteraProdutoModelo = produtoRepositorio.save(produtoModelo);
            return ResponseEntity.ok(alteraProdutoModelo);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao processar o Alteracao.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleta(@PathVariable Long id) {
        try {
            Optional<ProdutoModelo> findId = produtoRepositorio.findById(id);

            if (findId.isPresent()) {
                HashMap<String, String> diterotio = produtoService.diretorios(findId.get());
                String diretorioImagem = diterotio.get("caminhoImagem");


                File arquivoImagem = new File(diretorioImagem);
                if (arquivoImagem.exists()) {
                    arquivoImagem.delete();
                }

                produtoRepositorio.deleteById(id);

                return ResponseEntity.ok().body("produto deletado");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao excluir o produto.");
        }
    }

    @GetMapping(path = "/{nome}")
    public ResponseEntity<?> buscaProduto(@PathVariable String nome) {
        try {
            List<ProdutoModelo> produtoModeloEncontrado = produtoRepositorio.findByPartialNomeIgnoreCase(nome);
            if (!produtoModeloEncontrado.isEmpty()) {
                return ResponseEntity.ok(produtoModeloEncontrado);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar o produto.");
        }

    }


    //EM CASO DE POLUIÇÃO USE
    @DeleteMapping("/all")
    public void teate() {
        try {
            Iterable<ProdutoModelo> produtos = produtoRepositorio.findAll();

            for (ProdutoModelo produtoModelo : produtos) {
                HashMap<String, String> diretorio = produtoService.diretorios(produtoModelo);
                String caminhoImagem = diretorio.get("caminhoImagem");

                File arquivoImagem = new File(caminhoImagem);
                if (arquivoImagem.exists()) {
                    arquivoImagem.delete();
                }

            }
            produtoRepositorio.deleteAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}