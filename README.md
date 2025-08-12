# UserHub

Aplicação em TypeScript para gerenciamento de usuários, login e controle de perfis de acesso.

## Requisitos

- Node.js >= 16

## Instalação

```bash
npm install
```

## Execução em desenvolvimento

```bash
npm run dev
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

Um usuário administrador padrão é criado ao iniciar a aplicação:

- Email: `admin@example.com`
- Senha: `admin123`

## Frontend

O frontend em React está na pasta `frontend`.

### Desenvolvimento

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

A aplicação estará disponível em `http://localhost:5173` e fará proxy para a API em `http://localhost:3000`.
