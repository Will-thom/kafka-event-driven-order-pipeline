require('dotenv').config();

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:29092'],
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || 'order-group',
});

async function run() {
  try {
    console.log('🔌 Connecting consumer to Kafka...');
    await consumer.connect();
    console.log('✅ Connected!');

    const topic = process.env.KAFKA_TOPIC || 'orders';

    console.log(`📡 Subscribing to topic: ${topic}...`);
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });

    console.log('🚀 Consumer is running...\n');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const rawValue = message.value?.toString();

          if (!rawValue) {
            console.warn('⚠️ Received empty message');
            return;
          }

          const parsed = JSON.parse(rawValue);

          console.log('📥 Event received:');
          console.log({
            topic,
            partition,
            offset: message.offset,
            key: message.key?.toString(),
            value: parsed,
          });

          // 🔥 Aqui entra sua lógica de negócio
          await processOrder(parsed);

        } catch (err) {
          console.error('❌ Error processing message:', err);
        }
      },
    });

  } catch (error) {
    console.error('❌ Consumer error:', error);
  }
}

async function processOrder(order) {
  // Simulação de processamento
  console.log(`🛠️ Processing order ${order.orderId}...`);

  // Exemplo de delay (simula IO)
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(`✅ Order ${order.orderId} processed`);
}

run();