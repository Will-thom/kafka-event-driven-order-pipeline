## Problem

Traditional order processing systems using synchronous communication suffer from tight coupling, poor scalability, and cascading failures.

## Solution

An event-driven order pipeline using Kafka to decouple services and enable asynchronous processing.

## Architecture Overview

Order Created → Kafka → Payment → Kafka → Inventory → Kafka → Shipping

## Delivery Guarantees

- At-least-once delivery
- Idempotent consumers required
- Potential duplicate processing handled at service level

