import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

type Data = {
  redirectUrl?: string;
  error?: string;
  details?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { mtype } = req.query;

  if (typeof mtype !== 'string') {
    res.status(400).json({ error: 'Invalid mtype parameter' });
    return;
  }

  const Url = "http://cdn.foo.com/vod/file.mp4";
  const Master_key = "mskey";
  const TimeOut = "60";
  const userID = "CDNTest";

  const WebServerTime = Math.round(Date.now() / 1000);
  const AquaAuth = "1";

  const serverIp =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  let return_url = "";
  if (mtype === "iOS") {
    return_url = ""; // iOS return URL
  }

  let param = `MasterKey=${Master_key}&userid=${userID}&serverip=${serverIp}`;
  param += `&WebServerTime=${WebServerTime}&AquaAuth=${AquaAuth}&timeout=${TimeOut}`;
  if (return_url) {
    param += `&return_url=${encodeURIComponent(return_url)}`;
  }
  param += `&url=${Url}`;

  const command = `./Module/ENCAQALINK_V2_x64 -t ENC "${param}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error', details: stderr });
      return;
    }

    const encParam = stdout.trim();
    const iosUrl = `cdnmp://cddr_dnp/webstream?param=${encParam}`;
    const androidUrl = `intent://cddr_dnp/webstream?param=${encParam}#Intent;scheme=cdnmp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.cdn.aquanmanager;end`;

    if (mtype === "iOS") {
      res.json({ redirectUrl: iosUrl });
    } else {
      res.json({ redirectUrl: androidUrl });
    }
  });
}
