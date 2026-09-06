/**
 * Veggie Cake Recipes - Node.js Web Application

 * Design System: Velvet & Vine (Boutique Bakery aesthetic)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Route map
const routes = {
  '/': 'public/index.html',
  '/index.html': 'public/index.html',
  '/recipes/lavender-honey-cake': 'public/recipes/lavender-honey-cake.html',
  '/recipes/dark-chocolate-torte': 'public/recipes/dark-chocolate-torte.html',
  '/recipes/matcha-sponge-cake': 'public/recipes/matcha-sponge-cake.html',
  '/recipes/lemon-raspberry-cake': 'public/recipes/lemon-raspberry-cake.html',
  '/recipes/classic-carrot-cake': 'public/recipes/classic-carrot-cake.html',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  console.log('[' + new Date().toISOString() + '] ' + req.method + ' ' + pathname);

  // Check if this is a static asset request
  const ext = path.extname(pathname);
  if (ext && ext !== '.html') {
    const filePath = path.join(__dirname, 'public', pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
    return;
  }

  // Route handling
  const routeFile = routes[pathname];
  if (routeFile) {
    const filePath = path.join(__dirname, routeFile);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Internal Server Error</h1>');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    // 404 page
    const notFoundPath = path.join(__dirname, 'public', '404.html');
    fs.readFile(notFoundPath, 'utf8', (err, data) => {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      if (err) {
        res.end('<h1>404 - Page Not Found</h1>');
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log('');
  console.log('Veggie Cake Recipes - Boutique Bakery');
  console.log('Stitch Project: 471041588526456500');
  console.log('Server running at: http://localhost:' + PORT);
  console.log('');
  console.log('Available Pages:');
  console.log('  Home:                 http://localhost:' + PORT + '/');
  console.log('  Lavender Honey Cake:  http://localhost:' + PORT + '/recipes/lavender-honey-cake');
  console.log('  Dark Chocolate Torte: http://localhost:' + PORT + '/recipes/dark-chocolate-torte');
  console.log('  Matcha Sponge Cake:   http://localhost:' + PORT + '/recipes/matcha-sponge-cake');
  console.log('  Lemon Raspberry Cake: http://localhost:' + PORT + '/recipes/lemon-raspberry-cake');
  console.log('  Classic Carrot Cake:  http://localhost:' + PORT + '/recipes/classic-carrot-cake');
  console.log('');
  console.log('Press Ctrl+C to stop the server.');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use. Try: PORT=3001 node server.js');
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
