const {createServer} = require('http');
const next = require('next');
const {parse} = require('url');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const mime = require('mime');

const envFilePath = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({path: path.join(process.cwd(), envFilePath)});

const dev = process.env.NODE_ENV !== 'production';
const port = Number(process.env.PORT) || 5002;
const app = next({dev});
const handle = app.getRequestHandler();

console.log('server dev: ', dev)
console.log('server port: ', port)
console.log('email username: ', process.env.EMAIL_USERNAME)
console.log('email HOST: ', process.env.EMAIL_HOST)

app.prepare().then(() => {
    createServer(async (req, res) => {
        const parsedUrl = parse(req.url, true);
        const {pathname} = parsedUrl;

        const publicPath = path.join(process.cwd(), 'public', pathname);

        try {
            const stats = await fs.stat(publicPath);
            if (stats.isFile()) {
                res.setHeader('Content-Type', mime.getType(publicPath) || 'application/octet-stream');
                require('stream').pipeline(
                    fs.createReadStream(publicPath),
                    res,
                    (err) => {
                        if (err) console.error('Error occurred handling', req.url, err);
                    }
                );
            } else {
                handle(req, res, parsedUrl);
            }
        } catch (err) {
            handle(req, res, parsedUrl);
        }
    }).listen(port, () => {
        // if (dev) {
        const localIPs = getLocalIP();
        //     console.log(`Local IP ready on http://${localIPs}:${port}`);
        // }
        console.log(`Local IP ready on http://${localIPs}:${port}`);
        console.log(`> Server is ready on http://localhost:${port}`);
    });
});

function getLocalIP() {
    const {networkInterfaces} = require('os');
    const nets = networkInterfaces();
    const results = [];

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                results.push(net.address);
            }
        }
    }

    return results;
}
