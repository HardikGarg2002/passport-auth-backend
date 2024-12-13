import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dbutils from '@hardikgarg2002/mongodb_utils';
import { initializePassport } from './passport-config.js';

export default function createServer() {
  dbutils.initMongoDB();
  initializePassport();
  // console.log(process.env.MONGO_URI);
  const app = express().use(express.json()).use(cors()).use(helmet());
  return app;
}

export function destroyApp(event?: string) {
  console.log('destroying app on event:', event);
  try {
    dbutils.disconnectMongoDB();
    process.exit(0);
  } catch (error) {
    console.warn('Error while destroying app', error);
  }
}

process.on('SIGINT', () => destroyApp('SIGINT'));
process.on('SIGTERM', () => destroyApp('SIGTERM'));
process.on('SIGQUIT', () => destroyApp('SIGQUIT'));
process.on('SIGUSR2', () => destroyApp('SIGUSR2'));
process.on('exit', () => console.log('exit called'));
process.on('uncaughtException', (err) => {
  console.warn('debug', 'Uncaught exception', err);
  // destroyApp('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
  console.warn('debug', 'Unhandled Rejection at:', promise, 'reason:', reason);
  // destroyApp('unhandledRejection');
});
