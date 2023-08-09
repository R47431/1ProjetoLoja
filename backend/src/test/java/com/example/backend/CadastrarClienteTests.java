package com.example.backend;

import com.example.backend.cadastraCliente.model.ClienteModelo;
import com.example.backend.cadastraCliente.repositorioCliente.ClienteRepositorio;
import com.example.backend.cadastraCliente.service.ClienteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CadastrarClienteTests {

    @Mock
    private ClienteRepositorio clienteRepositorio;

    @InjectMocks
    private ClienteService cadastroService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testTelefonePattern_TelefoneValido_RetornaTrue() {
        ClienteModelo cliente = new ClienteModelo();
        cliente.setTelefone(123456789);
        assertTrue(cadastroService.telefonePattern(cliente));
    }

    @Test
    public void testTelefonePattern_TelefoneInvalido_RetornaFalse() {
        ClienteModelo cliente = new ClienteModelo();
        cliente.setTelefone(12345);
        assertFalse(cadastroService.telefonePattern(cliente));
    }

    @Test
    public void testValidarNomeIdadeTelefone_DadosValidos_NaoLancaExcecao() {
        ClienteModelo cliente = new ClienteModelo();
        cliente.setNome("Fulano de Tal");
        cliente.setIdade(30);
        cliente.setTelefone(123456789);
        assertDoesNotThrow(() -> cadastroService.validarNomeIdadeTelefone(cliente));
    }

    @Test
    public void testValidarNomeIdadeTelefone_NomeNulo_LancaIllegalArgumentException() {
        ClienteModelo cliente = new ClienteModelo();
        cliente.setIdade(30);
        cliente.setTelefone(123456789);
        assertThrows(IllegalArgumentException.class, () -> cadastroService.validarNomeIdadeTelefone(cliente));
    }

    @Test
    public void clienteSalvo() {
        ClienteModelo cliente = new ClienteModelo();
        cliente.setNome("Nome Existente");
        cliente.setIdade(30);
        cliente.setTelefone(123456789);
        assertDoesNotThrow(() -> clienteRepositorio.save(cliente));

    }
}
