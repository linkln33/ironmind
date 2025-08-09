import { ExpoConfig } from 'expo/config';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  name: 'IronMind',
  slug: 'ironmind',
  extra: {
    ...config.extra,
    BACKEND_URL,
  },
});
