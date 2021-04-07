# 🎙 _Projeto LAMA - Labenu Music Awards_ 🎙

Este projeto foi desenvolvido no curso da `Labenu` é uma API com funcionalidades básicas da administração de eventos em um festival, onde bandas irão participar.

***
<br/>

**Para utilizar este projeto você precisa dos primeiros passos abaixo:**

- Clonar este repositório
- Executar o comando npm install no terminal
- Criar um arquivo .env na raiz do projeto e preencher com os valores corretos.

```
   #exemplo de endereço do host
   DB_HOST = 00.000.000.000
   PORT = 0000
   DB_USER = nome-usuario
   DB_PASSWORD = 1a2b3c4d5e
   DB_NAME = nome-banco
   JWT_KEY = chave
   JWT_EXPIRES_IN = 1d
   BCRYPT_COST = 12
```

***
<br/>

No arquivo `mySqlSetup.ts` estão todas as tabelas que foram criadas para guardar as informações no banco de dados.
 
Para criar estas tabelas no seu banco de dados basta rodar o comando `npm run script` e as tabelas serão criadas.

***
<br/>

**Para rodar este projeto:**
- npm run start
- npm run dev
- npm run test (testes com jest)

*** 
<br/>

**Endpoints existentes neste projeto são divididos em três partes:** endpoints relacionados aos usuários, aos shows e as bandas.

<br/>

## Endpoints de Usuários:
<br/>
 
**POST** SignUp

- Para criar um novo usuário
- O usuário pode ser cadastrado como "NORMAL" ou "ADMIN"
- Exemplo:
```
   http://localhost:3003/user/signup
```

Body:

```json
   {
      "name":"usuario",
      "email":"usuario@email.com.br",
      "password":"123456",
      "role": "ADMIN"
   }
```
<br/>

**POST** Login

- Fazer Login
- Exemplo:
```
   http://localhost:3003/user/login
```

Body:

```json
   {
      "email":"usuario@email.com.br",
      "password":"123456"
   }
```

***
<br/>

## Endpoints de Shows:
<br/>

**PUT** Create Show

- Para adicionar um novo show
- Exemplo:
```
   http://localhost:3003/shows/create
```

Authorization(token):

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

Body:

```json
{
   "week_day": "FRIDAY",
   "start_time": 22,
   "end_time": 23,
   "band_id": "8bd70545-4bf9-47fe-a227-770d8663e61f"
}
```
<br/>

**GET** Get Shows By Week Day 

- Buscar shows através do "Query Param" por dia da semana
- Exemplo:
```
   http://localhost:3003/shows/get-by-week-day?weekDay=FRIDAY
```

Authorization(token):

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

***
<br/>

## Endpoints de Bandas:
<br/> 

**POST** Create Band

- Para cadastrar uma nova banda
- Exemplo:
```
   http://localhost:3003/bands/create
```

Authorization(token):

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```

Body:

```json
   {
      "name": "BDS",
      "music_genre": "Metal",
      "responsible": "jason"
   }
```
<br/>

**GET** Get Band By Id Or Name

- Buscar um banda através do "Query Param" por id ou nome da banda
- Exemplo:

```
   http://localhost:3003/bands/get-details?id=eec84eb2-0a79-48cc-9382-ec08614f9f5e
```

Authorization(token)

```json
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiNTEzMTIxLTE0MTEtNDZiZC1hMjEwLTQ0OGQ2YjA0ODIzZSIsImlhdCI6MTYxNTA2NTU3MywiZXhwIjoxNjE1MTUxOTczfQ.IuXjGbKiAMZZmTKhzWKD3RsboN7qRwOO7z4xUqupgso
```
***

**Bibliotecas, Frameworks e recursos utilizados neste projeto:**

<ul style="font-size: 14px; margin-left: 25px;">
   <li>Express</li>  
   <li>Cors</li>
   <li>Dotenv</li>
   <li>Jest</li>
   <li>Knex</li>
   <li>uuid</li>
   <li>bcryptjs</li>
   <li>jsonwebtoken</li>
   <li>mysql</li>
   <li>typescript</li>
   <li>ts-jest</li>
   <li>ts-node-dev</li>
</ul>



