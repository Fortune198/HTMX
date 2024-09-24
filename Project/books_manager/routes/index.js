const express = require('express');

const router = express.Router();

//sample books array
const books = [
  { id: 1, title: 'Subtle art of not giving a fuck', description: 'Self help book' },
  { id: 2, title: 'The psychology of money', description: 'Finance' },
  { id: 3, title: 'Power of letting go', description: 'Self help' },
  { id: 4, title: 'Things we do not talk about', description: 'A history read' },
  { id: 5, title: '2084', description: 'Horror fiction' },
  { id: 6, title: 'Why Nations Fail', description: 'Leadership from historical perspective' },
];

// GET /books
router.get('/books', (req, res) => {
  res.render('index', { action: '', books, book: {} });
});

// GET /books/new
router.get('/books/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { book: {} });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});

// GET /books/1
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('book', { book });
  } else {
    res.render('index', { action: 'show', books, book });
  }
});

// GET /books/1/edit
router.get('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { book });
  } else {
    res.render('index', { action: 'edit', books, book });
  }
});

// POST /books
router.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  books.push(newBook);

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Book was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});

// PUT /books/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newBook = {
    id: Number(id),
    title: req.body.title,
    description: req.body.description,
  };

  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books[index] = newBook;

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      res.render('book', { book: books[index] }, (err, bookHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Book was successfully updated!</p>
            ${bookHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/books/${index + 1}`);
  }
});

// DELETE /books/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Book was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/books');
  }
});

module.exports = router;
