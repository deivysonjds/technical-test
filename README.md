🏢 Technical Test – CRUD de Empresas e Fornecedores

Este projeto consiste em um sistema completo com backend em Spring Boot e frontend em React + TypeScript, utilizando Axios e Zustand.
Toda a aplicação é executada via Docker Compose, incluindo banco de dados PostgreSQL.

O backend também faz consulta automática de CEP usando a API pública ViaCEP durante o cadastro e atualização de empresas/fornecedores.

📦 Tecnologias utilizadas
Backend

Java 17

Spring Boot

Spring Web

Spring Data JPA

PostgreSQL

Validações

Integração com ViaCEP

Docker

Frontend

React com Next.js

TypeScript

Axios

Zustand (state management)

TailwindCSS

Infra

Docker

Docker Compose

🚀 Como rodar o projeto
1️⃣ Pré-requisitos

Certifique-se de ter instalado:

Docker

Docker Compose

Verifique:

docker -v
docker compose version

▶️ 2️⃣ Subir todo o ambiente com Docker

Na raiz do projeto (onde está o docker-compose.yml), execute:

docker compose up --build


Isso irá subir:

Backend: http://localhost:8080

Frontend: http://localhost:3000 -> Obs.: não finalizado

PostgreSQL rodando nos containers

Para rodar em background:

docker compose up -d

🧱 3️⃣ Estrutura dos serviços
Frontend – porta 3000

Aplicação em React + TS + Zustand, consumindo as APIs do backend.

Backend – porta 8080

APIs REST responsáveis pelo CRUD:

Empresas

Fornecedores

Validação automática de CEP via ViaCEP

Database

PostgreSQL com volume persistente

🔧 4️⃣ Variáveis de ambiente

Crie um arquivo .env na raiz do projeto e copie os dados do arquivo .env.example

🌐 5️⃣ Doumentação da API via swagger

acesse (http://localhost:8080/swagger-ui/index.html)[http://localhost:8080/swagger-ui/index.html]

Consulta ViaCEP (backend interno)

Sem endpoint exposto — usado automaticamente nas inserções/atualizações.

💻 6️⃣ Scripts úteis
Parar todos os containers:
docker compose down

Resetar volumes (zerar banco):
docker compose down -v

📁 7️⃣ Estrutura do repositório
/  
├── backend/       # Projeto Spring Boot  
├── frontend/      # Projeto React/Next.js  
└── docker-compose.yml

📝 8️⃣ Funcionalidades
✔ Cadastro de empresas
✔ Cadastro de fornecedores
✔ Relação N:N entre empresa e fornecedores
✔ Listagem, edição e remoção
✔ Consulta automática de CEP com ViaCEP
✔ Interface moderna com React + Tailwind
✔ Gerenciamento de estado com Zustand
✔ Chamadas HTTP centralizadas com Axios
✔ Aplicação toda containerizada
