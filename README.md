# Product Stock API

API 'Product Stock' permite que desenvolvedores integrem recursos de um gerenciador de estoque em seus aplicativos.

🚧 Api em construção... 🚧

## Funcionalidades

- Cadastro de usuários
- Listagem de usuários cadastrados
- Listagem de um usuário por Id
- Edição de informações de um usuário
- Deleção de usuário

## Stack utilizada

**Back-end:** Node, Express, Docker, Jest, Coverage, SuperTest, Bcrypt, Cors, Prisma, Prisma Client, DotEnv e Yup.

**Banco de dados:** Postgresql.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`POSTGRES_USER` = Nome de usuário no banco de dados.

`POSTGRES_PASSWORD` = Senha de usuário no banco de dados.

`DATABASE_URL` = Url do banco de dados, exemplo: postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:SUA_PORTA_DO_POSTGRES/NOME_DO_BANCO_DE_DADOS?schema=public

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Alexsandro-ms/product-stock.git
```

Entre no diretório do projeto

```bash
  cd product-stock
```

Instale as dependências

```bash
  npm install ## ou yarn install
```

Inicie o servidor

```bash
  npm run dev ## ou yarn dev
```

Para rodar a imagem do Docker ( banco de dados PostgreSQL ), siga os seguintes passos:

1- Certifique-se de ter o Docker instalado em sua máquina.

2- Abra o terminal ou prompt de comando na pasta onde o arquivo "docker-compose.yml" está salvo.

3- Execute o comando "docker-compose up" para criar e iniciar o contêiner ou "docker-compose up -d" caso queira rodar em segundo plano.

4- Aguarde até que o Docker baixe a imagem do PostgreSQL e crie o contêiner.

5- Verifique se o contêiner está em execução usando o comando "docker ps".

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test ## yarn test
```

## Documentação da API

#### Cadastrar novo usuário

```http
  POST /user
```

| Corpo      | Tipo     | Descrição                                   |
| :--------- | :------- | :------------------------------------------ |
| `name`     | `string` | **Obrigatório**. Nome do usuário            |
| `phone`    | `string` | **Opcional**. Número de telefone do usuário |
| `email`    | `string` | **Obrigatório**. E-mail do usuário          |
| `password` | `string` | **Obrigatório**. Senha do usuário           |

#### Retorna um objeto com as informações do usuário cadastrado

```json
{
    "id": 1,
    "name": "Jane Doe",
    "email": "johndoe@example.com",
    "phone": "12345678901",
    "createAt": "2023-03-18T17:10:19.710Z",
    "updateAt": "2023-03-18T17:10:19.710Z"
  },
```

#### Retorna todos os usuários

```http
  GET /user
```

#### Retorna um Array de usuários

```json
[
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "phone": "12345678901",
    "createAt": "2023-03-18T17:10:19.710Z",
    "updateAt": "2023-03-18T17:10:19.710Z"
  },
  {
    "id": 2,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "",
    "createAt": "2023-03-18T17:17:22.001Z",
    "updateAt": "2023-03-18T17:17:22.001Z"
  }
]
```

#### Retorna um usuário por id

```http
  GET /user/${id}
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer receber |

#### Retorna objeto com as informações do usuário

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "12345678901",
  "createAt": "2023-03-21T18:54:25.987Z",
  "updateAt": "2023-03-22T18:29:32.639Z"
}
```

#### Editar usuário

```http
  PUT /user/${id}
```

#### Parâmetro

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

#### Corpo

| Corpo      | Tipo     | Descrição                                   |
| :--------- | :------- | :------------------------------------------ |
| `name`     | `string` | **Opcional**. Nome do usuário               |
| `phone`    | `string` | **Opcional**. Número de telefone do usuário |
| `email`    | `string` | **Opcional**. E-mail do usuário             |
| `password` | `string` | **Opcional**. Senha do usuário              |

#### Retorna objeto com todas as informações do usuário ( Exceto senha )

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "12345678901",
  "createAt": "2023-03-21T18:54:25.987Z",
  "updateAt": "2023-03-23T19:37:24.566Z"
}
```

#### Deletar um usuário por id

```http
  DELETE /user/${id}
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer deletar |

#### Retorna status 200 (OK)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
