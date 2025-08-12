# UserHub

Aplicação em TypeScript para gerenciamento de usuários, login e controle de perfis de acesso.

## Estrutura

O repositório está organizado em duas pastas principais:

- `backend/` — API Express em TypeScript com autenticação JWT, TypeORM e MongoDB.
- `frontend/` — aplicação React com Vite e Tailwind CSS para consumir a API.

## Requisitos

- Node.js >= 16
- MongoDB

## Backend

### Instalação

```bash
npm --prefix backend install
```

### Migrações

```bash
npm --prefix backend run migration:run
```

### Execução em desenvolvimento

```bash
npm --prefix backend run dev
```

O servidor ficará disponível em `http://localhost:3000`.

## Endpoints

### Autenticação

- `POST /login` — retorna um token JWT ao informar `email` e `password`.

### Usuários (requer token)

- `GET /users` — lista usuários.
- `POST /users` — cria usuário `{ name, email, password, profileId }`.
- `GET /users/:id` — exibe usuário.
- `PUT /users/:id` — atualiza usuário.
- `DELETE /users/:id` — remove usuário.

### Perfis (requer token)

- `GET /profiles` — lista perfis.
- `POST /profiles` — cria perfil `{ name }`.
- `GET /profiles/:id` — exibe perfil.
- `PUT /profiles/:id` — atualiza perfil.
- `DELETE /profiles/:id` — remove perfil.

Um usuário administrador padrão é criado pela migração inicial:

- Email: `admin@example.com`
- Senha: `admin123`

## Frontend

### Instalação

```bash
npm --prefix frontend install
```

### Desenvolvimento

```bash
npm --prefix frontend run dev
```

A aplicação estará disponível em `http://localhost:5173` e fará proxy para a API em `http://localhost:3000`.

## Docker

Uma alternativa é utilizar contêineres Docker para executar os serviços:

```bash
docker-compose up --build
```

O `docker-compose.yml` agora sobe três serviços: `mongo`, `backend` na porta `3000` e `frontend` na porta `5173`. O backend executa as migrações automaticamente antes de iniciar.
