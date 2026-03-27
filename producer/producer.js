const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-producer',
  brokers: ['localhost:29092'], // EXTERNAL listener do teu docker-compose
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner, // evita warning do KafkaJS v2
});

async function run() {
  try {
    console.log('🔌 Connecting to Kafka...');
    await producer.connect();
    console.log('✅ Connected!');

    const orderEvent = {
      orderId: Date.now(),
      product: 'Notebook',
      amount: 1500,
      createdAt: new Date().toISOString(),
    };

    console.log('📤 Sending event:', orderEvent);

    await producer.send({
      topic: 'orders',
      messages: [
        {
          key: String(orderEvent.orderId),
          value: JSON.stringify(orderEvent),
        },
      ],
    });

    console.log('✅ Event sent successfully!');
  } catch (error) {
    console.error('❌ Error sending event:', error);
  } finally {
    await producer.disconnect();
    console.log('🔌 Disconnected from Kafka');
  }
}

run();