# onboarding-synchro

# Sistema CRUD de Contas Contábeis

Sistema simples para gerenciar contas contábeis com operações de criação, consulta, atualização e exclusão.

## Tecnologias

### Backend
- Java 17+ (projeto testado com Java 21)
- Spring Boot
- JPA/Hibernate
- Banco de dados MySQL

### Frontend
- React
- React Bootstrap
- React Router
- Axios

## Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/allanleandrof/onboarding-synchro.git
cd projeto-contas-contabeis
```

### 2. Backend (Spring Boot)

#### No IntelliJ IDEA:
1. Abrir pasta `backend/contas-contabeis-crud`
2. Aguardar download das dependências
3. Executar `ContasContabeisCrudApplication.java`
4. Backend rodará em: `http://localhost:8080`

#### Via terminal:
```bash
cd backend/contas-contabeis-crud
./mvnw spring-boot:run
```

### 3. Frontend (React)

#### No VS Code:
1. Abrir pasta `frontend/contas-contabeis-frontend`
2. Abrir terminal integrado
3. Instalar dependências:
```bash
npm install
```
4. Executar projeto:
```bash
npm run dev
```
5. Frontend rodará em: `http://localhost:5173`

## Funcionalidades

- **Criar** nova conta contábil
- **Buscar** conta por codigo e quando ativas
- **Listar** todas as contas
- **Atualizar** dados de conta existente
- **Excluir** conta do sistema

## 📝 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/conta` | Criar conta |
| GET | `/conta` | Listar todas |
| PUT | `/conta/{id}` | Atualizar conta |
| DELETE | `/conta/{id}` | Excluir conta |

### Dependências
- Backend: Execute `./mvnw clean install`
- Frontend: Execute `npm install`
