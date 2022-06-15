const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

let users = [
	{
		id: 1,
		name: 'John',
		favoriteMovies: [],
	},
	{
		id: 2,
		name: 'Joe',
		favoriteMovies: ['WALL-E'],
	},
];

let movies = [
	{
		Title: 'The Lord of the Rings: The Fellowship of the Ring',
		Author: 'J. R. R. Tolkien',
		Genre: {
			Name: 'Fantasy Fiction',
			Description:
				'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
		},
		Director: {
			Name: 'Peter Jackson',
			Bio: "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards® (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.",
			Birth: 'October 31, 1961',
		},
	},
	{
		Title: 'The Lord of the Rings: The Two Towers',
		Author: 'J.R.R. Tolkien',
		Genre: {
			Name: 'Fantasy Fiction',
			Description:
				'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Saurons new ally, Saruman, and his hordes of Isengard.',
		},
		Director: {
			Name: 'Peter Jackson',
			Bio: "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards® (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.",
			Birth: 'October 31, 1961',
		},
	},
	{
		Title: 'The Lord of the Rings: The Return of the King',
		Author: 'Stephanie Meyer',
		Genre: {
			Name: 'Fantasy Fiction',
			Description:
				'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
		},
		Director: {
			Name: 'Peter Jackson',
			Bio: "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously. The Fellowship of the Ring, The Two Towers and The Return of the King were nominated for and collected a slew of awards from around the globe, with The Return of the King receiving his most impressive collection of awards. This included three Academy Awards® (Best Adapted Screenplay, Best Director and Best Picture), two Golden Globes (Best Director and Best Motion Picture-Drama), three BAFTAs (Best Adapted Screenplay, Best Film and Viewers' Choice), a Directors Guild Award, a Producers Guild Award and a New York Film Critics Circle Award.",
			Birth: 'October 31, 1961',
		},
	},
];

//Post new user
app.post('/users', (req, res) => {
	const newUser = req.body;

	if (newUser.name) {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).json(newUser);
	} else {
		res.status(400).send('users need names');
	}
});

//Update user info
app.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const updatedUser = req.body;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.name = updatedUser.name;
		res.status(200).json(user);
	} else {
		res.status(400).send('no such user');
	}
});

//Post new movie - send back text confirmation
app.post('/users/:id/:movieTitle', (req, res) => {
	const { id, movieTitle } = req.params;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.favoriteMovies.push(movieTitle);
		res.status(200).send(`${movieTitle} has been added to ${id}'s array`);
	} else {
		res.status(400).send('no such user');
	}
});

// Remove movie
app.delete('/users/:id/:movieTitle', (req, res) => {
	const { id, movieTitle } = req.params;

	let user = users.find((user) => user.id == id);

	if (user) {
		user.favoriteMovies.filter((title) => title !== movieTitle);
		res.status(200).send(`${movieTitle} has been removed from ${id}'s array`);
	} else {
		res.status(400).send('no such movie');
	}
});

// Deregister
app.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	let user = users.find((user) => user.id == id);

	if (user) {
		users = users.filter((user) => user.id != id);
		res.status(200).send(`user ${id} has been deleted`);
	} else {
		res.status(400).send('no such movie');
	}
});

// Get list of all movies to the user
app.get('/movies', (req, res) => {
	res.status(200).json(movies);
});

// Get data about a single movie
app.get('/movies/:title', (req, res) => {
	const { title } = req.params;
	const movie = movies.find((movies) => movies.Title === title);
	if (movie) {
		res.status(200).json(movie);
	} else {
		res.status(400).send('no such movie');
	}
});

// Get data about genre by name
app.get('/movies/genre/:genreName', (req, res) => {
	const { genreName } = req.params;
	const genre = movies.find((movies) => movies.Genre.Name === genreName).Genre;
	if (genre) {
		res.status(200).json(genre);
	} else {
		res.status(400).send('no such genre');
	}
});

// Get data about director by name
app.get('/movies/director/:directorName', (req, res) => {
	const { directorName } = req.params;
	const director = movies.find(
		(movies) => movies.Director.Name === directorName
	).Director;
	if (director) {
		res.status(200).json(director);
	} else {
		res.status(400).send('no such director');
	}
});

// Listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
