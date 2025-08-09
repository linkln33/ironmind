import { env } from './config/env';
import { createApp } from './server';

const app = createApp();

app.listen(env.port, () => {
  console.log(`IronMind backend listening on http://localhost:${env.port}`);
});
