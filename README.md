# 🚀 Kafka Event-Driven Order Pipeline (MVP)

This project demonstrates a **minimal event-driven architecture** using **Apache Kafka**, with a **Node.js Producer** and a **Node.js Consumer** running independently.

The goal is to showcase a **fully working end-to-end pipeline**, with a clean and simple setup — ideal for learning, demos, and portfolio use.

---

## 🧠 Architecture Overview

```id="u7xq3p"
[ Producer (Node.js) ] 
          ↓
      [ Kafka ]
          ↓
[ Consumer (Node.js) ]
```

* The **producer** sends order events to Kafka
* Kafka acts as the **event backbone**
* The **consumer** processes incoming events

---

## 📦 Tech Stack

* Node.js
* Apache Kafka (KRaft mode — no Zookeeper)
* Docker + Docker Compose
* KafkaJS

---

## 📁 Project Structure

```id="y9m2k1"
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

## ⚙️ Prerequisites

* Docker & Docker Compose
* Node.js (>= 18 recommended)
* npm

---

## 🐳 Step 1 — Start Kafka

```bash id="4s8k2z"
docker compose up -d
```

Kafka will be available at:

* Internal (Docker): `kafka:9092`
* External (Host): `localhost:29092`

Kafka UI:

```id="x2n8vd"
http://localhost:8080
```

---

## 🧱 Step 2 — Create Topic

```bash id="p0x7lm"
docker exec -it kafka kafka-topics.sh \
  --create \
  --topic orders \
  --bootstrap-server kafka:9092 \
  --partitions 1 \
  --replication-factor 1
```

---

## 📤 Step 3 — Run Producer

```bash id="f3d6hk"
cd producer
npm install
node producer.js
```

Expected output:

```id="c9s1rw"
✅ Connected!
📤 Sending event...
✅ Event sent successfully!
```

---

## 📥 Step 4 — Run Consumer

In another terminal:

```bash id="k1d8bz"
cd consumer
npm install
npm start
```

Expected output:

```id="h7q4vt"
📡 Subscribing to topic: orders...
📥 Event received:
```

---

## 🔑 Important Configuration

### Kafka Brokers

| Context           | Address         |
| ----------------- | --------------- |
| Host machine      | localhost:29092 |
| Docker containers | kafka:9092      |

This project uses:

```env id="a5j9qp"
KAFKA_BROKER=localhost:29092
```

---

## ⚠️ Common Pitfalls

### ❌ `ENOTFOUND kafka`

You are trying to connect using `kafka:9092` from outside Docker.

✔ Fix: use `localhost:29092`

---

### ❌ Consumer not receiving messages

Kafka uses **consumer groups** and offset management.

✔ Fix options:

* Change the `groupId`
* Use `fromBeginning: true`

---

## 🧪 Example Event

```json id="m2k7qz"
{
  "orderId": 1711560000000,
  "product": "Notebook",
  "amount": 1500,
  "createdAt": "2026-03-27T19:00:00.000Z"
}
```

---

## 🎯 What This Project Demonstrates

* Event-driven architecture fundamentals
* Kafka as a message broker
* Producer/Consumer pattern
* A foundation ready for polyglot architectures

---

## 🚀 Next Steps (Future Improvements)

* Add a **Spring Boot consumer**
* Implement **retry and DLQ**
* Introduce **schema validation (Avro/JSON Schema)**
* Add **observability (logs, metrics)**
* Dockerize producer and consumer

---

## 📌 Final Notes

This is an **MVP focused on clarity over complexity**.

The goal is to provide a **simple and understandable baseline** before evolving into a production-grade architecture.

---

## 👨‍💻 Author

Francisco Silva