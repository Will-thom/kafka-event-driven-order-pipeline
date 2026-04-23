# Kafka Event-Driven Order Pipeline

## Overview

This project demonstrates the design of an **event-driven order processing pipeline** using Apache Kafka, focusing on **decoupling, scalability, and fault tolerance**.

Instead of relying on synchronous service-to-service communication, the system models the order lifecycle as a sequence of events flowing through independent services.

---

## Problem

Traditional order processing systems often rely on synchronous communication between services (e.g., REST), which introduces:

* tight coupling between components
* cascading failures under partial outages
* limited scalability due to blocking operations
* difficulty evolving individual services independently

As systems grow, these constraints become a bottleneck for both performance and maintainability.

---

## Solution

This project adopts an **event-driven architecture** where services communicate asynchronously via Kafka topics.

Each stage of the order lifecycle emits and consumes events, enabling:

* loose coupling between services
* independent scalability
* improved fault isolation
* better alignment with real-world asynchronous workflows

---

## Architecture

### Event Flow

```
Order Created
    ↓
[Kafka Topic: orders]
    ↓
Payment Service
    ↓
[Kafka Topic: payments]
    ↓
Inventory Service
    ↓
[Kafka Topic: inventory]
    ↓
Shipping Service
```

Each service:

* consumes events from a topic
* performs its domain-specific logic
* emits a new event for the next stage

---

## Services and Responsibilities

### Order Service

* Produces `OrderCreated` events
* Entry point of the pipeline

### Payment Service

* Consumes `OrderCreated`
* Processes payment
* Emits `PaymentProcessed`

### Inventory Service

* Consumes payment events
* Updates stock
* Emits inventory confirmation

### Shipping Service

* Finalizes the order lifecycle
* Simulates shipment processing

---

## Why Event-Driven?

This architecture was chosen to:

* decouple services and reduce interdependencies
* allow independent deployment and scaling
* avoid synchronous bottlenecks
* improve resilience under partial failures

---

## Why Kafka?

Kafka was selected due to:

* high throughput and low latency for event streaming
* partition-based scalability model
* durability and replay capability
* strong fit for log-based event pipelines

### Why not RabbitMQ?

RabbitMQ would simplify message routing but:

* is less suited for high-throughput streaming workloads
* lacks native log-based replay semantics
* introduces different scaling characteristics

---

## Delivery Guarantees

This system follows an **at-least-once delivery model**:

* messages may be delivered more than once
* consumers must be designed to be **idempotent**

### Implications

* duplicate processing is possible
* state updates must handle reprocessing safely

---

## Ordering and Partitioning

* Ordering is guaranteed **within a partition only**
* Cross-partition ordering is not guaranteed

This is a deliberate trade-off to enable horizontal scalability.

---

## Failure Handling

This project intentionally exposes common failure scenarios:

* consumer failure → message reprocessed
* partial pipeline failure → downstream delay
* duplicate event delivery

### Current Strategy

* retry via Kafka re-delivery
* stateless consumers for easier recovery

### Future Improvements

* dead-letter queues (DLQ)
* exponential backoff retry strategies
* poison message handling

---

## Trade-offs

### Advantages

* strong decoupling between services
* scalable event processing
* fault isolation
* flexible evolution of components

### Disadvantages

* eventual consistency
* increased operational complexity
* harder debugging and tracing
* need for idempotent logic

---

## Key Design Decisions

* prioritized **decoupling over simplicity**
* accepted **eventual consistency** as a trade-off
* avoided synchronous fallbacks to preserve architecture integrity
* kept services stateless to simplify recovery

---

## What This Project Demonstrates

* practical use of Kafka in an event-driven pipeline
* understanding of distributed system trade-offs
* handling of asynchronous workflows
* awareness of failure modes and delivery semantics

---

## What Could Be Improved

* observability (metrics, tracing, logging correlation)
* schema evolution (Avro / Schema Registry)
* exactly-once semantics exploration
* dynamic scaling of consumers
* real persistence layer integration

---

## How to Run

```bash
docker-compose up
```

[doing...]
```

---

## Notes

This is not intended to be a production-ready system.

It is a **focused exploration of event-driven architecture using Kafka**, with emphasis on **design decisions, trade-offs, and system behavior under real-world constraints**.

---

## Final Thought

The goal of this project is not to showcase a perfect implementation, but to demonstrate **how to think about distributed systems**:

* where things break
* what guarantees matter
* and which trade-offs are worth making
