const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config');

const bodyParser  = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}))


//config CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
}); 



app.get('/api/heroes', (req, res) => {
	connection.query('SELECT * from heroe', (err, results) => {
		if (err) {
			res.status(500).send('Error retrieving employees');
		} else {
			res.json(results);
		}
	});
});

app.post('/api/url', (req, res) => {
	const formData = req.body;
	connection.query('INSERT INTO table SET ?', formData, (err, results) => {
		if (err) {
			res.status(500).send('Error saving');
		} else {
			res.sendStatus(200);
		}
	});
});

app.put('/api/url/:id', (req, res) => {
	const idUrl = req.params.id;
	const formData = req.body;

	connection.query('UPDATE table SET ? WHERE id = ?', [ formData, idUrl ], (err) => {
		if (err) {
			res.status(500).send('Error editing');
		} else {
			res.sendStatus(200);
		}
	});
});

app.delete('/api/url/:id', (req, res) => {
	const idUrl = req.params.id;
	connection.query('DELETE FROM table WHERE id = ?', [ idUrl ], (err) => {
		if (err) {
			res.status(500).send('Error deleting');
		} else {
			res.sendStatus(200);
		}
	});
});

app.listen(port, (err) => {
    if(err) {
       throw new Error('There is an error')
     }
     console.log('There is an port')
});
//