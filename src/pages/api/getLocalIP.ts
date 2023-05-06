import {NextApiRequest, NextApiResponse} from 'next';
import {networkInterfaces} from 'os';

const getLocalIP = (): string[] => {
  const nets = networkInterfaces();
  const results: string[] = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }

  return results;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ localIPs: string[] }>
) {
  const localIPs = getLocalIP();
  res.status(200).json({localIPs});
}
