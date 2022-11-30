var router = require("express").Router();
//const filmsDal = require('../../services/pg.films.dal')
const filmsDal = require("../../services/m.films.dal");

// api/films
router.get("/", async (req, res) => {
	if (DEBUG) console.log("ROUTE: /api/films/ GET " + req.url);
	try {
		let thefilms = await filmsDal.getfilms();
		res.json(thefilms);
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});
// api/films/:id
router.get("/:id", async (req, res) => {
	if (DEBUG) console.log("ROUTE: /api/films/:id GET " + req.url);
	try {
		let anfilm = await filmsDal.getfilmByfilmId(req.params.id);
		if (anfilm.length === 0) {
			// log this error to an error log file.
			res.statusCode = 404;
			res.json({ message: "Not Found", status: 404 });
		} else res.json(anfilm);
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});

router.post("/", async (req, res) => {
	if (DEBUG) {
		console.log("ROUTE: /api/films/ POST");
		//    console.log(req);
	}
	try {
		await filmsDal.addfilm(
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.statusCode = 201;
		res.json({ message: "Created", status: 201 });
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});

router.put("/:id", async (req, res) => {
	if (DEBUG)
		console.log(
			"API/ROUTER PUT",
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
	try {
		await filmsDal.putfilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.statusCode = 200;
		res.json({ message: "OK", status: 200 });
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});

router.patch("/:id", async (req, res) => {
	if (DEBUG) console.log("ROUTE: /api/films PATCH " + req.params.id);
	try {
		await filmsDal.patchfilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.statusCode = 200;
		res.json({ message: "OK", status: 200 });
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});

router.delete("/:id", async (req, res) => {
	if (DEBUG) console.log("ROUTE: /api/films DELETE " + req.params.id);
	try {
		await filmsDal.deletefilm(req.params.id);
		res.statusCode = 200;
		res.json({ message: "OK", status: 200 });
	} catch {
		// log this error to an error log file.
		res.statusCode = 503;
		res.json({ message: "Service Unavailable", status: 503 });
	}
});

// list the active api routes
if (DEBUG) {
	router.stack.forEach(function (r) {
		if (r.route && r.route.path) {
			console.log(r.route.path);
		}
	});
}

module.exports = router;
