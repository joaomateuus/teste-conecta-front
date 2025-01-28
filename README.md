# Super OrgContact - Front-End

Repositório do front-end da aplicação **Super OrgContact**, desenvolvida para listar e organizar contatos do Google por domínio.

## Tecnologias Utilizadas

- Vue.js
- Vue Router
- Firebase Hosting
- Material Design para UI com Vuetify
- OAuth2 com Google Login

## Funcionalidades

- Login com Google utilizando OAuth2.
- Listagem de contatos do Google agrupados por domínio.
- Proteção de rotas para impedir o acesso de usuários não autenticados.

## Pré-requisitos

- Node.js (>= 14.x)
- Yarn ou npm

## Project Setup

```sh
npm install
yarn install
```

### Compilar e Hot-Reload para Desenvolvimento

```sh
npm run dev
yarn dev
```

### Verificação de Tipos, Compilação e Minificação para Produção

```sh
npm run build
yarn build
```

### Executar Testes Unitários com [Vitest](https://vitest.dev/)

```sh
npm run test:unit
yarn test:unit
```

### Verificar Código com [ESLint](https://eslint.org/)

```sh
npm run lint
yarn lint
```

## URL do Deploy

O projeto foi implantado para acesso público, permitindo que você o utilize sem a necessidade de configuração local.

- **Front-End:** O front-end está hospedado no Firebase Hosting e pode ser acessado através do seguinte link:

  ```
    https://vue-teste-conecta.web.app/
  ```

- **Back-End:** O back-end está hospedado no Google Cloud Run e pode ser acessado através do seguinte link:
  ```
  https://sapient-fabric-322416.uc.r.appspot.com
  ```
