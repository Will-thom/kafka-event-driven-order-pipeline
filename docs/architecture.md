# Event Flow

1. Order Service publishes OrderCreated
2. Payment Service consumes and emits PaymentProcessed
3. Inventory Service consumes and updates stock
4. Shipping Service finalizes order

# Design Notes

- Services are loosely coupled
- Communication is asynchronous
- State is distributed
