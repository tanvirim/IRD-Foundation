const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

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

//route to fetch caterogies subcategories and dua names
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

//route to fetch all duas
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

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
