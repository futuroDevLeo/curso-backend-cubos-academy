const express = require('express');
const multer = require('./filtros/multer');

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

// cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario);

// login
rotas.post('/login', login.login);

// filtro para verificar usuario logado
rotas.use(verificaLogin);

// obter e atualizar perfil do usuario logado
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

// crud de produtos
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.post('/produtos', multer.single('arquivo'), produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto);
rotas.delete('/produtos/:id', produtos.excluirProduto);
rotas.delete('/produtos/:id/imagem', produtos.excluirImagemProduto);
rotas.patch('/produtos/:id/imagem', multer.single('arquivo'), produtos.atualizarImagemProduto);

module.exports = rotas;