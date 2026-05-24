import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3502;

  app.use(express.json());

  const settingsFile = path.join(process.cwd(), 'settings_models.json');

  // Ensure settings file exists
  if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, JSON.stringify({}), 'utf-8');
  }

  // API endpoints
  app.get('/api/settings', (req, res) => {
    try {
      if (!fs.existsSync(settingsFile)) {
        res.json({});
        return;
      }
      const data = fs.readFileSync(settingsFile, 'utf-8');
      res.json(JSON.parse(data));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to read settings' });
    }
  });

  app.post('/api/settings', (req, res) => {
    try {
      const { fileName, settings } = req.body;
      if (!fileName || !settings) {
        res.status(400).json({ error: 'Missing fileName or settings' });
        return;
      }
      let allSettings: any = {};
      
      if (fs.existsSync(settingsFile)) {
        const data = fs.readFileSync(settingsFile, 'utf-8');
        try {
          allSettings = JSON.parse(data);
        } catch(e) {
          allSettings = {};
        }
      }
      
      allSettings[fileName] = settings;
      fs.writeFileSync(settingsFile, JSON.stringify(allSettings, null, 2), 'utf-8');
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to write settings' });
    }
  });

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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
