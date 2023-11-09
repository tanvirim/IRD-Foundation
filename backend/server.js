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
app.get('/data', (req, res) => {
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

// // Endpoint to fetch categories
// app.get('/category', (req, res) => {
//   db.all('SELECT * FROM category', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ categories: rows });
//   });
// });

// // Endpoint to fetch duas
// app.get('/dua', (req, res) => {
//   db.all('SELECT * FROM dua', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ duas: rows });
//   });
// });

// // Endpoint to fetch subcategories
// app.get('/sub_category', (req, res) => {
//   db.all('SELECT * FROM sub_category', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ subcategories: rows });
//   });
// });

// // Endpoint to fetch subcategories for a specific category
// app.get('/sub_category/:cat_id', (req, res) => {
//   const cat_id = parseInt(req.params.cat_id, 10);
//   db.all(
//     'SELECT * FROM sub_category WHERE cat_id IN (?)',
//     [cat_id],
//     (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({ subcategories: rows });
//     }
//   );
// });

// // Endpoint to fetch duas for a specific subcategory
// app.get('/dua/:subcat_id', (req, res) => {
//   const subcat_id = parseInt(req.params.subcat_id, 10);
//   db.all('SELECT * FROM dua WHERE subcat_id = ?', [subcat_id], (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ duas: rows });
//   });
// });

//port
const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
