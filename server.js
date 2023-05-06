const {createServer} = require('http');
const express = require('express');
const next = require('next');
const {parse} = require('url');
const fs = require('fs');
const {networkInterfaces} = require('os');
const path = require('path');
const dotenv = require('dotenv');
const mime = require('mime');

const envFilePath = path.join(process.cwd(), '.env.development');
dotenv.config({path: envFilePath});

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = Number(process.env.PORT) || 3000;
const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

const getLocalIP = () => {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e., 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }

  return results;
};

async function handleRequest(
  req,
  res,
  parsedUrl
) {
  try {
    const parsedUrl = parse(req.url, true);
    const {pathname, query} = parsedUrl;

    if (pathname) {
      await app.render(req, res, pathname, query);
    } else {
      await handle(req, res, parsedUrl);
    }
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.end('Node - internal server error');
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const {pathname} = parsedUrl;

    const publicPath = path.join(process.cwd(), 'public', pathname);

    fs.stat(publicPath, (err, stats) => {
      if (err || !stats.isFile()) {
        // If the file doesn't exist, let Next.js handle the request
        return handle(req, res, parsedUrl);
      }

      const contentType = mime.getType(publicPath) || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);

      fs.createReadStream(publicPath).pipe(res);
    });
  }).listen(port, (err) => {
    if (err) throw err;
    const localIPs = getLocalIP();
    console.log(`Local IP ready on http://${localIPs}:${port}`);
    console.log(`> Server is ready on http://${hostname}:${port}`);
  });
});

module.exports = {};
