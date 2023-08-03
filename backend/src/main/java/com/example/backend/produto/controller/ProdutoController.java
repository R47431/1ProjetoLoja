package com.example.backend.produto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.produto.model.Produto;
import com.example.backend.produto.repositorio.ProdutoRepositorio;
import com.example.backend.produto.service.ProdutoService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Optional;


@Controller
@RestController
@RequestMapping("/cadastraProduto")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public Iterable<Produto> listar() {
        return produtoRepositorio.findAll();
    }

    @PostMapping
    public ResponseEntity<?> cadastra(@RequestBody Produto produto, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.validaCampo(produto, imagem);

            HashMap<String, String> diterotio = produtoService.diretorios(produto);
            String diretorioArquivo = diterotio.get("caminhoArquivo");

            Files.copy(imagem.getInputStream(), Paths.get(diretorioArquivo), StandardCopyOption.REPLACE_EXISTING);
            produto.setNomeImagem(produto.getNome() + ".jpg");

            Produto alteraProduto = produtoRepositorio.save(produto);
            return ResponseEntity.ok(alteraProduto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao processar o Cadastro.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> altera(@RequestBody Produto produto, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.validaCampo(produto, imagem);

            HashMap<String, String> diterotio = produtoService.diretorios(produto);
            String diretorioArquivo = diterotio.get("caminhoArquivo");

            Files.copy(imagem.getInputStream(), Paths.get(diretorioArquivo), StandardCopyOption.REPLACE_EXISTING);
            produto.setNomeImagem(produto.getNome() + ".jpg");

            Produto alteraProduto = produtoRepositorio.save(produto);
            return ResponseEntity.ok(alteraProduto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao processar o Alteracao.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleta(@PathVariable Long id) {
        try {
            Optional<Produto> findId = produtoRepositorio.findById(id);

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
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao excluir o produto.");
        }
    }

    @GetMapping(path = "/{nome}")
    public ResponseEntity<?> buscaProduto(@PathVariable String nome) {
        try {
            if (nome.isEmpty()) {
                return ResponseEntity.badRequest().body("nao pode esta vazio");
            }

            Optional<Produto> produtoEncontrado = produtoRepositorio.findByNome(nome);
            if (produtoEncontrado.isPresent()) {
                return ResponseEntity.ok(produtoEncontrado.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao buscar o produto.");
        }

    }


    //EM CASO DE POLUIÇÃO USE
    @DeleteMapping("/all")
    public void teate() {
        try {
            Iterable<Produto> produtos = produtoRepositorio.findAll();

            for (Produto produto : produtos) {
                HashMap<String, String> diretorio = produtoService.diretorios(produto);
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