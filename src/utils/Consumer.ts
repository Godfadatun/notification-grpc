import amqplib from 'amqplib';
import logger from './logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { URL } = require('url');

export class Consumer {
  private readonly url: string;

  private conn: amqplib.Connection | undefined;

  private channel: amqplib.Channel | undefined;

  private readonly queue: string;

  private readonly onMessage: (msg: amqplib.ConsumeMessage | null) => void;

  private readonly prefetchCount: number;

  constructor(url: string, queue: string, onMessage: (msg: amqplib.ConsumeMessage | null) => void, prefetchCount = 50) {
    this.url = url;
    this.queue = queue;
    this.onMessage = onMessage;
    this.prefetchCount = prefetchCount;
  }

  public getChannel(): amqplib.Channel {
    return this.channel as amqplib.Channel;
  }

  public async start(): Promise<amqplib.Replies.Consume> {
    const { channel, conn } = await this.createConnection();
    this.channel = channel;
    this.conn = conn;
    await channel.assertQueue(this.queue);
    logger.info(`Consumer listening on queue ${this.queue}`);
    const consumer = await channel.consume(this.queue, (msg) => {
      this.onMessage(msg);
    });
    return consumer;
  }

  public async close(): Promise<void> {
    if (!this.channel || !this.conn) {
      throw new Error('No connection');
    }
    await this.channel.close();
    await this.conn.close();
  }

  private async createConnection(): Promise<{
    conn: amqplib.Connection;
    channel: amqplib.Channel;
  }> {
    const { hostname } = new URL(this.url);
    const conn = await amqplib.connect(this.url, { servername: hostname });
    logger.info(`AMQP connected successfully on ${hostname}`);
    const channel = await conn.createChannel();
    await channel.prefetch(this.prefetchCount);
    return { conn, channel };
  }
}
