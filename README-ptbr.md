# 🚀 Kafka Event-Driven Order Pipeline (MVP)

Este projeto demonstra uma **arquitetura orientada a eventos mínima** utilizando **Apache Kafka**, com um **Producer em Node.js** e um **Consumer em Node.js** rodando de forma independente.

O objetivo é apresentar um **pipeline funcional de ponta a ponta**, com configuração simples e clara — ideal para aprendizado, demonstrações e portfólio.

---

## 🧠 Visão Geral da Arquitetura

```
[ Producer (Node.js) ] 
          ↓
      [ Kafka ]
          ↓
[ Consumer (Node.js) ]
```

* O **producer** envia eventos de pedidos para o Kafka
* O Kafka atua como o **backbone de eventos**
* O **consumer** processa os eventos recebidos

---

## 📦 Stack Tecnológica

* Node.js
* Kafka (modo KRaft - sem Zookeeper)
* Docker + Docker Compose
* KafkaJS

---

## 📁 Estrutura do Projeto

```
kafka-event-driven-order-pipeline/
│
├── docker-compose.yml
│
├── producer/
│   ├── package.json
│   └── producer.js
│
└── consumer/
    ├── package.json
    ├── consumer.js
    └── .env
```

---

## ⚙️ Pré-requisitos

* Docker & Docker Compose
* Node.js (>= 18 recomendado)
* npm

---

## 🐳 Passo 1 — Subir o Kafka

```bash
docker compose up -d
```

O Kafka estará disponível em:

* Interno (Docker): `kafka:9092`
* Externo (Host): `localhost:29092`

Kafka UI:

```
http://localhost:8080
```

---

## 🧱 Passo 2 — Criar o Tópico

```bash
docker exec -it kafka kafka-topics.sh --create --topic orders --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1
```

---

## 📤 Passo 3 — Executar o Producer

```bash
cd producer
npm install
node producer.js
```

Saída esperada:

```
✅ Connected!
📤 Sending event...
✅ Event sent successfully!
```

---

## 📥 Passo 4 — Executar o Consumer

Em outro terminal:

```bash
cd consumer
npm install
npm start
```

Saída esperada:

```
📡 Subscribing to topic: orders...
📥 Event received:
```

---

## 🔑 Configuração Importante

### Endereço do Kafka

| Contexto          | Endereço        |
| ----------------- | --------------- |
| Máquina local     | localhost:29092 |
| Containers Docker | kafka:9092      |

Este projeto utiliza:

```
KAFKA_BROKER=localhost:29092
```

---

## ⚠️ Problemas Comuns

### ❌ `ENOTFOUND kafka`

Você está tentando conectar usando `kafka:9092` fora do Docker.

✔ Solução: usar `localhost:29092`

---

### ❌ Consumer não recebe mensagens

O Kafka utiliza **consumer groups** e controle de offset.

✔ Soluções:

* Alterar o `groupId`
* Usar `fromBeginning: true`

---

## 🧪 Exemplo de Evento

```json
{
  "orderId": 1711560000000,
  "product": "Notebook",
  "amount": 1500,
  "createdAt": "2026-03-27T19:00:00.000Z"
}
```

---

## 🎯 O que este projeto demonstra

* Fundamentos de arquitetura orientada a eventos
* Kafka como broker de mensagens
* Padrão Producer/Consumer
* Base pronta para arquitetura polyglot

---

## 🚀 Próximos Passos (Evolução)

* Adicionar **consumer em Spring Boot**
* Implementar **retry e DLQ**
* Introduzir **validação de schema (Avro/JSON Schema)**
* Adicionar **observabilidade (logs, métricas)**
* Dockerizar producer e consumer

---

## 📌 Considerações Finais

Este é um **MVP focado em clareza ao invés de complexidade**.

A proposta é fornecer uma base simples e compreensível antes de evoluir para uma arquitetura de nível produtivo.

---

## 👨‍💻 Autor

Francisco Silva
