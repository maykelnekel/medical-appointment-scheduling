# medical-appointment-scheduling

Essa é uma API simples para agendamento de consultas, desenvolvida com o intuito de implementar funções lamdas na amazon com o auxilio do serverless framework, para realizar o desenvolvimento e deploy da API nos servidores da Amazon, de forma simples e intuitiva.

## Ferramentas utilizadas

Para o desenvolvimento desse projeto, foram utilizadas as seguintes ferramentas:

- [Typescript](https://www.typescriptlang.org/): como linguagem de programação;
- [Node](https://nodejs.org/pt): como motor da api;
- [Serverless Framework](https://www.serverless.com/): para implementação das funções lambda e deploy da aplicação na amazon;
- [serverless-offline](https://www.serverless.com/plugins/serverless-offline): para teste local da api;
- [Middy](https://middy.js.org/): para criação de middlewares nas funções lambda;
- [Joi](https://joi.dev/): para validação de dados;
- [Jest](https://jestjs.io/pt-BR/): para testes unitários;

## Configurações prévias

Essa aplicação necessita de uma conexão com a amazon, a minha recomendação é que você utilize usuários IAM para liberar o acesso à aplicação. Mas caso prefira, pode consultar a documentação do serverless framework sobre ([Setting Up AWS Credentials](https://www.serverless.com/framework/docs/getting-started#setting-up-aws-credentials)).

Caso ainda não tenha credenciais IAM válidas na sua máquina você poderá configura-las da seguinte forma:

1. Utilize o comando para inciar o framework :

   ```cmd
   serverless
   ```

2. Após isso selecione a opção `Save AWS Credentials in a Local Profile`;

3. Adicione as chaves conforme solicitado. Caso você ainda não possua uma chave poderá seguir o seguinte caminho para conseguir suas credenciais:
   `dashboard da AWS > IAM > Usuários > Credenciais de segurança > Chaves de acesso > Criar chave de acesso`;

   **Atenção**: Não esqueça de salvar as credenciais em um local seguro, pois elas não poderão ser recuperadas

4. Confira se o seu usuário IAM possui as seguintes permissões. Elas serão necessárias para realizar o deploy:

   - AmazonAPIGatewayAdministrator
   - AmazonS3FullAccess
   - AWSCloudFormationFullAccess
   - AWSLambda_FullAccess
   - IAMFullAccess

5. Além dessas permissões, você pode precisar criar uma permissão customizada com as seguintes políticas:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "cloudwatch:PutMetricData",
           "ds:CreateComputer",
           "ds:DescribeDirectories",
           "ec2:DescribeInstanceStatus",
           "logs:*",
           "ssm:*",
           "ec2messages:*"
         ],
         "Resource": "*"
       },
       {
         "Effect": "Allow",
         "Action": "iam:CreateServiceLinkedRole",
         "Resource": "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*",
         "Condition": {
           "StringLike": {
             "iam:AWSServiceName": "ssm.amazonaws.com"
           }
         }
       },
       {
         "Effect": "Allow",
         "Action": [
           "iam:DeleteServiceLinkedRole",
           "iam:GetServiceLinkedRoleDeletionStatus"
         ],
         "Resource": "arn:aws:iam::*:role/aws-service-role/ssm.amazonaws.com/AWSServiceRoleForAmazonSSM*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "ssmmessages:CreateControlChannel",
           "ssmmessages:CreateDataChannel",
           "ssmmessages:OpenControlChannel",
           "ssmmessages:OpenDataChannel"
         ],
         "Resource": "*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "ssm:PutParameter",
           "ssm:GetParameter",
           "ssm:DeleteParameter"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

## Iniciando o projeto

- Clone o projeto em sua máquina:

  ```cmd
  git clone git@github.com:maykelnekel/medical-appointment-scheduling.git
  ```

- Entre no diretório clonado:

  ```cmd
  cd medical-appointment-scheduling
  ```

- Instale as dependencias do projeto:

  ```cmd
  npm install
  ```

- Inicie o servidor local para testes:

  ```python
  npm run local
  ou
  npm run local:debug
  # para logs mais completos
  ```

- Para rodar os testes utilize:

  ```python
  npm run test
  ```

- Para realizar o deploy do projeto utilize:

  ```python
  npm run deploy
  ou
  npm run deploy:debug
  # para logs mais completos
  ```

## Documentação da api

### <b style="color: green;">GET</b> /agendas

Retorna uma lista de médicos com suas respectivas agendas e horários disponíveis.

#### Respostas esperadas

Caso a listagem seja executada com sucesso;

- Status code: <b style="color: green;">200 SUCCESS</b>
  ;
- Exemplo:

  ```json
  {
    "medicos": [
      {
        "id": 1,
        "nome": "Dr. João Silva",
        "especialidade": "Cardiologista",
        "horarios_disponiveis": [
          "2024-10-05 09:00",
          "2024-10-05 10:00",
          "2024-10-05 11:00"
        ]
      },
      {
        "id": 2,
        "nome": "Dra. Maria Souza",
        "especialidade": "Dermatologista",
        "horarios_disponiveis": ["2024-10-06 14:00", "2024-10-06 15:00"]
      }
    ]
  }
  ```

#

### <b style="color: yellow;">POST</b> /agendamento

Permite que o paciente marque um horário de consulta com um médico.

#### Payload

- Body: JSON
- Campos:
  - **medico_id**: número inteiro;
  - **paciente_nome**: string;
  - **data_horário**: string de data, no formato `AAAA-MM-DD HH:MM`;
- Exemplo:
  ```json
  {
    "medico_id": 1,
    "paciente_nome": "Carlos Almeida",
    "data_horario": "2024-10-05 09:00"
  }
  ```

#### Respostas esperadas

Caso o agendamento seja executado com sucesso:

- Status code: <b style="color: green;">200 SUCCESS</b>
  ;
- Exemplo:

  ```json
  {
    "mensagem": "Agendamento realizado com sucesso",
    "agendamento": {
      "data_horario": "2024-10-05 09:00",
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida"
    }
  }
  ```

Caso o payload seja enviado com um campo um inválido:

- Status code: <b style="color: orange;">400 BAD REQUEST</b>
  ;
- Exemplo:

  ```json
  {
    "message": "Corpo da requisição inválido",
    "details": [
      {
        "message": "O valor precisa ser uma string",
        "path": ["paciente_nome"],
        "type": "string.base",
        "context": {
          "label": "paciente_nome",
          "value": 1,
          "key": "paciente_nome"
        }
      },
      {
        "message": "O campo data_horario é obrigatório",
        "path": ["data_horario"],
        "type": "any.required",
        "context": {
          "label": "data_horario",
          "key": "data_horario"
        }
      },
      {
        "message": "O valor precisa ser um número inteiro",
        "path": ["medico_id"],
        "type": "number.base",
        "context": {
          "label": "medico_id",
          "value": true,
          "key": "medico_id"
        }
      }
    ]
  }
  ```

Caso não seja encontrado um médico com o ID informado:

- Status code: <b style="color: orange;">404 NOT FOUND</b>
  ;
- Exemplo:

  ```json
  {
    "message": "O médico com o ID informado não foi encontrado na nossa base de dados"
  }
  ```

Caso o horário informado não esteja disponível;

- Status code: <b style="color: orange;">406 NOT ACEPTABLE</b>
  ;
- Exemplo:

  ```json
  {
    "message": "O horário do agendamento não está disponível"
  }
  ```

#
