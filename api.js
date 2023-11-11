const express = require('express');

const app = express();
app.use(express.json());
const hostname = '127.0.0.1';
const port = 3000;

// サンプルデータ（DBの代わり）
const places = [
  { id: 1, name: '初富'},
  { id: 2, name: '二和'},
  { id: 3, name: '三咲'},
  { id: 4, name: '豊四季'},
  { id: 5, name: '五香'},
  { id: 6, name: '六実'},
  { id: 7, name: '七栄'},
  { id: 8, name: '八街'},
  { id: 9, name: '九美上'},
  { id: 10, name: '十倉'},
  { id: 11, name: '十余一'},
  { id: 12, name: '十余二'},
  { id: 13, name: '十余三'}
];

// 接続テスト用
app.get('/', (req, res) => {
  res.send('This is REST API Endpoint!');
});

/* CRUD */
const basePath = '/api/places'; // Router使ってないので

// Create POST
app.post(basePath, (req, res) => {
  const place = {
    id: places.length,
    name: req.body.name
  };
  places.push(place);
  res.status(201).send(places);
});

// Windowsテスト用
// curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"九十九里\"}" http://localhost:3000/api/places

// Read GET
// all
app.get(basePath, (req, res) => {
  res.status(200).send(places);
});

// id指定
app.get(`${basePath}/:id`, (req, res) => {
  const place = places.find((p) => p.id === parseInt(req.params.id));

  // 存在しない場合は404を返す
  if (!place) {
    res.status(404).send('Not found');
  } else {
    res.status(200).send(place);
  }
});

// Update PUT
app.put(`${basePath}/:id`, (req, res) => {
  const place = places.find((p) => p.id === parseInt(req.params.id));

  // 存在しない場合は404を返す
  if (!place) {
    res.status(404).send('Not found');
  } else {
    place.name = req.body.name;
    res.status(200).send(place);
  }
});

// Windowsテスト用
// curl -X PUT -H "Content-Type: application/json" -d "{\"name\":\"八柱\"}" http://localhost:3000/api/places/8

// Delete DELETE


// listen
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});