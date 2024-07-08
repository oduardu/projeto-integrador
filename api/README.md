# BackEnd

Esta API foi construída para fornecer dados e funcionalidades para o sistema de gerenciamento da vinícola.

## Requisitos

É necessário ter instalado na sua máquina:

- Node (+ algum gerenciador de pacotes, como npm, yarn ou pnpm)
- Docker 

## Como rodar

### 1. Instale os pacotes necessários

Execute o comando abaixo para instalar todas as dependências necessárias:

#### 1.1 Usando npm

```sh
npm install
```
#### 1.2 Usando yarn

```sh
yarn
```
#### 1.3 Usando pnpm

```sh
pnpm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e insira os dados conforme o exemplo fornecido no arquivo .env-example.

### 3. Suba o container Docker

Utilize o Docker para criar e iniciar o container necessário. Execute o comando:

```sh
docker compose up -d
```
### 4. Inicie a API

Inicie a API utilizando o seguinte comando:

#### 4.1 Usando npm

```sh
npm start
```
#### 4.2 Usando yarn

```sh
yarn start
```
#### 4.3 Usando pnpm

```sh
pnpm start
```

 
