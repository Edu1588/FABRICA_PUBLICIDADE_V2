const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const newRoutes = `
  // Analytics Routes
  app.post("/api/track", (req, res) => {
    try {
      const { path, client_id, user_agent } = req.body;
      const dataPath = require("path").join(process.cwd(), "data", "analytics.json");
      let analytics = { pageViews: [], leads: [] };
      if (fs.existsSync(dataPath)) {
        analytics = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      }
      analytics.pageViews.push({
        path,
        client_id,
        user_agent,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(dataPath, JSON.stringify(analytics, null, 2));
      return res.json({ success: true });
    } catch(err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to track" });
    }
  });

  app.get("/api/analytics", (req, res) => {
    try {
      const dataPath = require("path").join(process.cwd(), "data", "analytics.json");
      let analytics = { pageViews: [], leads: [] };
      if (fs.existsSync(dataPath)) {
        analytics = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      }
      return res.json(analytics);
    } catch(err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to get analytics" });
    }
  });

  // Vite middleware for development
`;

code = code.replace(/  \/\/ Vite middleware for development/, newRoutes);
fs.writeFileSync('server.ts', code);
