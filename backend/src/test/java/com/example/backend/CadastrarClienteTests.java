package com.example.backend;

import com.example.backend.cadastraCliente.model.Cargo;
import com.example.backend.cadastraCliente.model.ClienteModelo;
import com.example.backend.cadastraCliente.repositorioCliente.ClienteRepositorio;
import com.example.backend.cadastraCliente.service.ClienteService;
import com.example.backend.cadastraProduto.service.ProdutoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class CadastrarClienteTests {

    @InjectMocks
    private ProdutoService produtoService;

    @Mock
    private ClienteRepositorio clienteRepositorio;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCadastrarProdutoComoGerente() {
        // Configuração do cliente como gerente
        ClienteModelo clienteGerente = new ClienteModelo();
        clienteGerente.setId(1L);
        clienteGerente.setCargo(Cargo.GERENTE);

        // Configuração do cliente como gerente no mock do clienteRepositorio
        when(clienteRepositorio.findByCargoAndId(Cargo.GERENTE, 1L)).thenReturn(clienteGerente);

        // Executa o método aa
        ClienteModelo resultado = produtoService.aa(clienteGerente);

        // Verifica se o resultado não é nulo
        assertNotNull(resultado);

        // Verifica se o cliente retornado é o mesmo que foi configurado
        assertEquals(clienteGerente, resultado);
    }
    @Test
    public void testCadastrarProdutoComoClienteNaoGerente() {
        // Configuração do cliente como não gerente
        ClienteModelo clienteNaoGerente = new ClienteModelo();
        clienteNaoGerente.setId(2L); // Suponha que este cliente não seja um gerente
        clienteNaoGerente.setCargo(Cargo.FUNCIONARIO); // Defina o cargo como Cliente ou outro valor não GERENTE

        // Configuração do cliente como não gerente no mock do clienteRepositorio
        when(clienteRepositorio.findByCargoAndId(Cargo.FUNCIONARIO, 2L)).thenReturn(clienteNaoGerente);

        // Executa o método aa e espera uma exceção
        assertThrows(Exception.class, () -> produtoService.aa(clienteNaoGerente));
    }


    // Você também pode escrever testes para cenários onde o cliente não é um gerente e esperar que o método lance uma exceção.
}

