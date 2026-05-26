# ⚙️ HelpDesk API

O ecossistema de backend e persistência de dados para o sistema **HelpDesk**, responsável por gerenciar a autenticação, controle de acessos baseados em perfil (**RBAC**), regras de negócio de chamados, e relacionamento com clientes e prestadores de serviço técnico.

Esta API RESTful foi desenvolvida como o projeto backend integrado da trilha Full-stack da **Rocketseat**.

---

## 🚀 Hospedagem e Deploy

* **Ambiente de Produção (API):** Hospedado na plataforma **Render**
* **Banco de Dados Relacional:** Integrado com persistência via containerização e migrações estruturadas.

---

## 📌 Funcionalidades e Regras de Negócio (Endpoints)

A API atua como o motor de controle de acessos da aplicação, aplicando validações rigorosas de segurança através de tokens criptográficos.

### 🔐 Autenticação e Autorização (JWT)
* **Criação de Conta e Sessão:** Endpoints de registro de usuários e geração de tokens JWT para manutenção de sessões ativas.
* **Middlewares de RBAC:** Bloqueio e liberação de endpoints específicos baseado nas credenciais do usuário (**Administrador, Técnico ou Cliente**).

### 📋 Fluxo de Chamados
* **Clientes:** Permissão exclusiva para registrar chamados e consultar a listagem de suas próprias solicitações abertas.
* **Técnicos:** Endpoints dedicados para buscar chamados designados, acionar a alteração do status do atendimento (*Iniciar* ou *Encerrar*) e lançar serviços associados.
* **Administradores:** Controle absoluto sobre os recursos. Endpoints para reatribuição de técnicos, edição completa de registros e exclusão/arquivamento de chamados antigos.

### 💼 Gestão de Cadastros e Perfis
* **Usuários:** Rotas globais para atualização de dados pessoais (Nome, Alteração de Senha Segura e Atualização de Fotos/Avatares).
* **Catálogo de Serviços:** Endpoints administrativos para cadastro, atualização de valores e desativação/arquivamento lógico de serviços realizáveis no suporte.

---

## 🛠️ Tecnologias e Arquitetura do Sistema

O backend foi arquitetado em cima do ecossistema do **Node.js** focado em segurança de dados, integridade transacional e testes automatizados.

* **Ambiente de Execução:** `Node.js` com suporte a módulos e tipagem via `TypeScript`
* **Framework Web:** `Express` (Gerenciamento de roteamento, controle de requisições, respostas HTTP e tratamento global de exceções)
* **Mapeamento Objeto-Relacional (ORM):** `Prisma ORM` (Construção estruturada do esquema de dados, relacionamentos complexos, JOINS nativos e geração automatizada de migrations)
* **Banco de Dados:** `PostgreSQL` / `SQLite` (Configuração modular de variáveis de ambiente para produção e testes)
* **Containerização:** `Docker` e `Docker Compose` (Isolamento do ambiente de banco de dados garantindo portabilidade em qualquer sistema operacional, inclusive WSL 2)
* **Segurança e Validação:** `Zod` (Validação em nível de runtime para payloads de entrada das rotas) & Criptografia com cripto-hashes para persistência de senhas.

---

## 📁 Arquitetura Sugerida do Projeto (`src`)

```text
src/
├── @types/          # Definições globais de tipos do TypeScript (Ex: Express Request com User ID)
├── config/          # Arquivos de parametrização (Configurações de JWT, Uploads e Banco)
├── controllers/     # Controladores das requisições (Validação com Zod e chamada de Casos de Uso)
├── database/        # Inicialização do Prisma Client e sementes do banco (Seed files)
├── errors/          # Classe customizada de AppError e Handler global de exceções
├── middlewares/     # Interceptadores de segurança (Autenticação JWT e validação de Roles/RBAC)
├── repositories/    # Camada de acesso a dados (Operações diretas via Prisma)
├── routes/          # Definição e agrupamento dos endpoints da API HTTP
├── services/        # Regras de negócio e Casos de Uso (Use Cases) do ecossistema
├── utils/           # Funções auxiliares e helpers de apoio do sistema
├── app.ts           # Configuração da instância Express e middlewares globais
└── server.ts        # Ponto de entrada que inicializa o servidor HTTP na porta desejada

```
---
# 🔧 Como Executar a API Localmente
**Pré-requisitos**
* Node.js (Versão LTS recomendada)
* Docker instalado e rodando na máquina (ou WSL 2 no Windows)

**Passo a Passo**
* Clonar o repositório:


```Bash
git clone [https://github.com/seu-usuario/HelpDesk-API.git](https://github.com/seu-usuario/HelpDesk-API.git)
cd HelpDesk-API
```

* Instalar as dependências do projeto:

```Bash
npm install
```

* Iniciar a infraestrutura do Banco de Dados via Docker:


```Bash
docker compose up -d
```
---

**Rodar as Migrations do Banco de Dados:**


```Bash
npx prisma migrate dev
```


Executar o Script de População Inicial (Seed - Opcional):

```Bash
npx prisma db seed
```

**Iniciar o Servidor em Modo de Desenvolvimento:**

```Bash
npm run dev
```
A API estará rodando com sucesso no endereço http://localhost:3333.

---

# 📄 Licença
Este projeto foi desenvolvido para fins estritamente educacionais como parte dos desafios propostos na plataforma Rocketseat.
