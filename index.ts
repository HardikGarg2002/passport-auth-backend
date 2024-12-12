import { Request, Response } from 'express';
import dbutils from '@hardikgarg2002/mongodb_utils';
import createServer from './src/app';

const app = createServer();
const port = process.env.PORT;
const environment = process.env.NODE_ENV;
const service = process.env.APP_SERVICE;
const appVersion = process.env.APP_VERSION;

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  const response = {
    message: 'Welcome to iTuple Product Service',
    environment,
    service,
    appVersion,
    dbconnected: dbutils.isMongoDBConnected(),
  };

  res.send(response);
});
// default end point
app.use('*', (req, res) => {
  res.status(404).send({
    error: 'AUTH404: Could not find the page requested by you',
  });
});
app.use((err: any, req: Request, res: Response, _next: any) => {
  console.error('Error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log('App listening on port environment/ service is ', port, environment, service);
});
