const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

const KUBE_API = 'https://kubernetes.default.svc';
const TOKEN_PATH = '/var/run/secrets/kubernetes.io/serviceaccount/token';
const CA_CERT = '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt';

function getToken() {
  return fs.readFileSync(TOKEN_PATH, 'utf8');
}

function queryKubeAPI(apiPath, callback) {
  const token = getToken();
  const options = {
    hostname: 'kubernetes.default.svc',
    port: 443,
    path: apiPath,
    method: 'GET',
    ca: fs.readFileSync(CA_CERT),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk });
    res.on('end', () => { callback(null, data) });
  });

  req.on('error', (e) => {
    callback(e, null);
  });

  req.end();
}

app.get('/', (req, res) => {
  res.send(`
    <h2>📊 KubeArena Internal Dashboard</h2>
    <p>Status: All systems green</p>
    <p>Environment: prod</p>
    <!-- Nothing suspicious here :) -->
  `);
});

app.get('/admin', (req, res) => {
  res.send(`
    <h2>🛠 Kubernetes Debug Tool</h2>
    <form method="POST">
      API path: <input name="path" value="/api/v1/secrets" size="40"/>
      <button type="submit">Query</button>
    </form>
    <pre></pre>
  `);
});

app.post('/admin', (req, res) => {
  const apiPath = req.body.path || '/api/v1/pods';

  queryKubeAPI(apiPath, (err, result) => {
    const output = err ? `Error: ${err.message}` : result;
    res.send(`
      <h2>🛠 Kubernetes Debug Tool</h2>
      <form method="POST">
        API path: <input name="path" value="${apiPath}" size="40"/>
        <button type="submit">Query</button>
      </form>
      <pre>${output}</pre>
    `);
  });
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Vulnerable web app running on port ${PORT}`);
});