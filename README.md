
<h1 align="center">
    API REST Sistema de Agendamento
</h1>

## 💻 Sobre o projeto

Projeto desenvolvido como desafio no HiringCoders Gama Academy VTEX.
Desenvolver uma api rest de sistema de agendamento utilizando o banco de dados POSTGRES e o banco de dados MongoDB.


---

## 🛠 Tecnologias/Ferramentas

As seguintes ferramentas foram usadas na construção do projeto:

- NodeJs
- JavaScript
- Sequelize ORM
- Express
- Mongoose
- Yup Schema Validation

---

## 🚀 Melhorias

As seguintes melhorias precisam ser feitas para aprimoramento do projeto

Principais Pontos de Melhoria:
 - Implementação de notificações também para o usuário que fez o agendamento
 - Incorporar a api a um sistema de email
 - Documentação mais detalhada
 - Criar endpoint de exclusão de usuários e agendamentos

---

## 🚀 Como usar

Para utilizar o CRUD de usuários, é necessário acessar o endpoint: ```/users```
  - Para inserir, utiliza-se o método post e é obrigatório os campos: nome, email e senha no JSON.
  - Para alterar, utiliza-se o método put e é obrigatório passar o campo que deseja alterar e o novo valor dessa forma: ```new_nomedocampo``` no JSON.*
   
Para iniciar sessão, é necessário acessar o endpoint: ```/session```
  - Para entrar, utiliza-se o método post e é obrigatório os campos: email e senha no JSON.
  
Para inserir foto do usuário é necessário acessar o endpoint: ```/files```
  - Para inserir, utiliza-se o método post e é obrigatório passar a imagem como file no body do JSON.*

Para visualizar a lista de colaboradores, é necessário acessar o endpoint: ```/collaborators```
  - Para listar, utiliza-se o método get.*
  
Para acessar o CRUD de agendamentos, é necessário acessar o endpoint: ```/appointments```
  - Para criar um agendamento, utiliza-se o método post e é obrigatório o campo de id do colaborador e o campo data.*
  - Para listar os agendamentos de um determinado usuário, utiliza-se o método get e opcionalmente pode ser passado parametros off e page para paginação.*

Para acessar os agendamentos de um colaborador, é necessário acessar o endpoint: ```/schedule```
  - Para listar, utiliza-se o método get e é obrigatório passar via Query o parametro data.**

Para acessar as opções de notificações, é necessário acessar o endpoint: ```/notifications```
  - Para listar, utiliza-se o método get.**
  - Para marcar como lido, utiliza-se o método put e é necessário passar logo após o endpoint o ```/numerodoIDdanotificação```

<p><em>* = Rotas disponíveis apenas para usuário logado (necessário inserir o token no header da requisição)</em></p>
<p><em>** = Rotas disponíveis apenas para usuário do tipo provedor (necessário inserir o token no header da requisição)</em></p>

---

## 🦸 Autor

Desenvolvido por Hamilton Lopes ✌ [Entre em contato!](https://www.linkedin.com/in/hamilton-lopes/)
