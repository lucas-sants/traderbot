
# Trader Bot 🤖

Sistema de agregação de dados de cotações de criptomoedas em tempo real.
Processamento e agregação de cotações em candlesticks, com dados de abertura, máxima, mínima e fechamento.


## Índice

 1. [Execução](#execution)
 2. [Tecnologias](#techs)
 3. [Conclusão](#conclusion)
 
 <div id='execution'/>

## Execução 

    Para executar o projeto localmente, basta executar o comando "docker-compose up -d" na raiz.

Caso queira modificar as informações de conexão com o Banco de Dados, como porta, 
usuário e senha basta editar o arquivo "docker-compose.yml". 
Do contrário, o Banco de Dados estará disponível na porta "3306" com o usuário "root" e senha "1234".



<div id='techs'/>

## Tecnologias usadas

 - [Typescript](https://www.typescriptlang.org)
 - [Knex.js](https://knexjs.org)
 - [Objection.js](https://github.com/vincit/objection.js#readme)
 - [MySQL 2](https://github.com/sidorares/node-mysql2#readme)
 - [Dotenv](https://github.com/motdotla/dotenv#readme)
 - [WS](https://github.com/websockets/ws)

<div id='conclusion'/>

## Conclusão

Esse projeto teve como objetivo desenvolver um bot capaz de entregar informações em tempo real de cotações de criptomoedas, os dados são exibidos 
em forma de tabela, informando a moeda cotada, periodicidade, dia e horário da cotação, 
abertura, mínima, máxima e fechamento de cada [candlestick](#https://pt.wikipedia.org/wiki/Candlestick).

As dificuldades e dores encontradas ao longo do desenvolvimento deste projeto foram em resumo 
entender a API Poloniex de início e como fazer com que os dados fossem consumidos e exibidos de acordo com o tempo necessário.
## 🔗
[![portfolio](https://img.shields.io/badge/linktree-0004?style=for-the-badge&logo=linktree&logoColor=white)](https://linktr.ee/lucas.sants)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-s-santos/)
