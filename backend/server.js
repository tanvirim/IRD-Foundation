const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

//config dotenv file
dotenv.config();

app.use(cors());

const db = new sqlite3.Database(
  './assets/dua_main.sqlite',
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  }
);

//query
app.get('/', (req, res) => {
  const { category_id, subcategory_id } = req.query;

  if (category_id && !subcategory_id) {
    // Fetch subcategories for a specific category
    db.all(
      'SELECT * FROM sub_category WHERE cat_id = ?',
      [category_id],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ subcategories: rows });
      }
    );
  } else if (category_id && subcategory_id) {
    // Fetch duas for a specific category and subcategory
    db.all(
      'SELECT * FROM dua WHERE cat_id = ? AND subcat_id = ?',
      [category_id, subcategory_id],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ duas: rows });
      }
    );
  } else {
    // Fetch all categories when no parameters are provided
    db.all('SELECT * FROM category', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ categories: rows });
    });
  }
});

// Create a route to fetch all duas from a specific category
app.get('/duas', (req, res) => {
  const { category_id } = req.query;

  if (!category_id) {
    res.status(400).json({ error: 'Category ID is required.' });
    return;
  }

  db.all('SELECT * FROM dua WHERE cat_id = ?', [category_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ duas: rows });
  });
});

// app.get('/duas', (req, res) => {
//   const { cat_id, subcat_id } = req.query;

//   if (!cat_id) {
//     res.status(400).json({ error: 'Category ID is required.' });
//     return;
//   }

//   let query = 'SELECT * FROM dua WHERE cat_id = ?';
//   const params = [cat_id];

//   if (subcat_id) {
//     query += ' AND subcat_id = ?';
//     params.push(subcat_id);
//   }

//   db.all(query, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ duas: rows });
//   });
// });

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
