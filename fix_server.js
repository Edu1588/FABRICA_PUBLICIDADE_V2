import fs from 'fs';
const code = fs.readFileSync('server.ts', 'utf-8');

let newCode = code.replace(/async function startServer\(\) \{/, '');
newCode = newCode.replace(/const app = express\(\);/, 'const app = express();');

// We need to find the Vite part and move it.
const viteMiddleware = `
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.NODE_ENV !== 'production' || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:\${PORT}\`);
    });
  }
  
  return app;
}

const appPromise = startServer();
export default (req, res) => {
  appPromise.then(app => app(req, res)).catch(err => {
    console.error(err);
    res.status(500).send('Server Error');
  });
};
`;

const replaceWith = `
async function startViteServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.NODE_ENV !== 'production' || process.env.RENDER || process.env.RAILWAY_ENVIRONMENT || (!process.env.VERCEL && !process.env.VERCEL_ENV)) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:\${PORT}\`);
    });
  }
}

if (!process.env.VERCEL && !process.env.VERCEL_ENV) {
  startViteServer();
}

export default app;
`;

newCode = newCode.replace(viteMiddleware, replaceWith);

fs.writeFileSync('server.ts', newCode);
