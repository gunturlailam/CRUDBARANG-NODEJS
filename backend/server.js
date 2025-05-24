const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'toko_guntur'
})

db.connect()

// GET semua
app.get('/barang', (req, res) => {
  db.query("SELECT * FROM barang", (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// POST tambah
app.post('/barang', (req, res) => {
  const { nama_barang, stok, harga,kategori, deskripsi } = req.body
  db.query("INSERT INTO barang (nama_barang,stok,harga,kategori,deskripsi) VALUES (?, ?, ?, ?, ?)", [nama_barang, stok, harga,kategori, deskripsi ],
    (err, result) => {
      if (err) throw err
      res.json({ success: true, result })
    }
  )
})

// PUT update barang
app.put('/barang/:id', (req, res) => {
  const { nama_barang, stok, harga, kategori, deskripsi } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE barang SET nama_barang = ?, stok = ?, harga = ?, kategori = ?, deskripsi = ? WHERE id = ?",
    [nama_barang, stok, harga, kategori, deskripsi, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Gagal update data" });
      }
      res.json({ success: true, result });
    }
  );
});


// DELETE
app.delete('/barang/:id', (req, res) => {
  const id = req.params.id
  db.query("DELETE FROM barang WHERE id = ?", [id], (err, result) => {
    if (err) throw err
    res.json({ success: true, result })
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`))
