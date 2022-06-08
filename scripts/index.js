const express = require('express'),
	morgan = require('morgan');

const app = express();

let topMovies = [
	{
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		author: 'J. R. R. Tolkien',
	},
	{
		title: 'The Lord of the Rings: The Two Towers',
		author: 'J.R.R. Tolkien',
	},
	{
		title: 'The Lord of the Rings: The Return of the King',
		author: 'Stephanie Meyer',
	},
	{
		title: 'City of God',
		author: 'Bráulio Mantovani',
	},
	{
		title: 'American History X',
		author: 'David McKenna',
	},
	{
		title: 'The Dark Knight',
		author: 'Christopher Nolan',
	},
	{
		title: 'Inglourious Basterds',
		author: 'Quentin Tarantino',
	},
	{
		title: 'The Wolf of Wall Street',
		author: 'Terence Winter',
	},
	{
		title: 'Shutter Island',
		author: 'Laeta Kalogridis',
	},
	{
		title: 'Monsters, Inc.',
		author: 'Pete Docter',
	},
];

app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
	res.send('Welcome to my Top Movies');
});

app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
	res.json(topMovies);
});

// Error handlers
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
