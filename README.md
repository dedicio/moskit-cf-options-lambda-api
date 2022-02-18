# moskit-cf-options-lambda-api
AWS Lambda API para listar as opções de campos personalizados

A API da Moskit tem uma limitação de 50 itens por chamada e máximo 3 chamadas por minuto.

Quando temos campos personalizados com mais de 50 opções cadastradas, há uma dificuldade de trazer todas elas, pois é necessário chamar a API tantas vezes até trazer todos os itens.

Para resolver, criei essa API simples que pode ser publicada diretamente no serviço de Lambda da AWS, criando assim uma API que fará essas chamadas à Moskit e trazer todos as opções de uma vez só.



## Como usar?

### Configurar credenciais AWS no Serverless

Primeiro, você necessita ter o Serverless instalado:
`npm install -g serverless`

Depois é necessário configurar as credentiais da AWS no Serverless, conforme passo-a-passo no link: https://www.serverless.com/framework/docs/providers/aws/guide/credentials


### Configurar environment

Para que seja possível pegar as informações na API da Moskit, é necessário criar um arquivo `.env` com a __API Key__ conforme o template existe no arquivo `.env.template`


### Deploy lambda

Com esses dados configurados, agora é só fazer o deploy da Lambda na AWS, usando o código abaixo:
`serverless deploy`

Caso tudo ocorra corretamente, uma mensagem como essa irá aparecer:
```
✔ Service deployed to stack moskit-cf-options-lambda-api-dev (135s)

endpoint: ANY - https://8hfyu7fdr3.execute-api.us-east-1.amazonaws.com
functions:
  api: moskit-cf-options-lambda-api-dev-api (1.2 MB)
```

A URL mostrada ali é a URL da API.

Agora basta acessá-la passando o ID do campo personalizado:

`https://8hfyu7fdr3.execute-api.us-east-1.amazonaws.com/CF_wkirSDiwWre`


### Como remover o lambda?

Caso queira remover a Lambda criada, basta usar o código:

`serverless remove`



## Como funciona?

A API funciona consumindo a API oficial da Moskit, que possui algumas características:
- Máximo de retorno de 50 itens por chamada
- Máximo de 3 chamadas por segundo

Isso gera um problema para pegar as opções de campos personalizados quando há mais de 50 itens cadastrados.

Para resolver isso, é feito um loop usando o `bottleneck` com chamadas à API da Moskit com delay de 500ms entre elas.

Então basta acessar a URL gerada da Lambda passando o ID do campo personalizado:
`https://8hfyu7fdr3.execute-api.us-east-1.amazonaws.com/CF_wkirSDiwWre`


O retorno da API será no formato:
```json
{
  "items": [
    {
      "id": 1234,
      "label": "Opção 1"
    },
    {
      "id": 2345,
      "label": "Opção 2"
    },
    {
      "id": 3456,
      "label": "Opção 3"
    },
    {
      "id": 4567,
      "label": "Opção 4"
    },
    {
      "id": 5678,
      "label": "Opção 5"
    },
  ],
  "meta": {
    "total": 5
  }
}
```

