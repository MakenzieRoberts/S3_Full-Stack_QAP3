const express = require("express");
const router = express.Router();
const filmsDal = require("../services/m.films.dal");

/* **************************** Get + Render EJS **************************** */

router.get("/", async (req, res) => {
	// Data Example:
	// [
	// 		{ "title": "Dazed Punk", "release_year": 2003, "rating": "PG-13" },
	// 		{ "title": "Airplane Sierra", "release_year": 2007, "rating": "PG-13" },
	// 		{ "title": "Dirty Ace", "release_year": 2002, "rating": "R" },
	// ];
	try {
		let theFilms = await filmsDal.getfilms();
		if (DEBUG) console.table(theFilms);
		res.render("films.ejs", { theFilms });
	} catch {
		res.render("503");
	}
});

router.get("/listing", async (req, res) => {
	// Data Example:
	// [
	// 		{ "title": "Dazed Punk", "release_year": 2003, "rating": "PG-13" },
	// 		{ "title": "Airplane Sierra", "release_year": 2007, "rating": "PG-13" },
	// 		{ "title": "Dirty Ace", "release_year": 2002, "rating": "R" },
	// ];
	try {
		let theFilms = await filmsDal.getfilms();
		if (DEBUG) console.table(theFilms);
		res.render("filmListing.ejs", { theFilms });
	} catch {
		res.render("503");
	}
});

router.get("/:id", async (req, res) => {
	// Data Example:
	// [
	// 		{ "title": "Dazed Punk", "release_year": 2003, "rating": "PG-13" }
	// ];
	try {
		let aFilm = await filmsDal.getFilmByFilmId(req.params.id);
		aFilm = new Array(aFilm);
		if (DEBUG) console.log({ aFilm });
		// This validation was originally 'if (aFilm.length === 0)', but when using
		// findOne(), if a record is found it returns the object, and if not it returns null. Even if I put the result object into an array, if the result is
		// null the array will still 1 because it contains '[null]', therefore that
		// validation would fail. So instead, I'm going to add 'if (aFilm === null)' as well.
		if (aFilm.length === 0 || aFilm.includes(null))
			res.render("norecord.ejs", { id: req.params.id });
		else res.render("film.ejs", { aFilm });
	} catch {
		res.render("503");
	}
});

router.get("/:id/replace", async (req, res) => {
	if (DEBUG) console.log("film.Replace : " + req.params.id);
	res.render("filmPut.ejs", {
		title: req.query.title,
		releaseYear: req.query.releaseYear,
		rating: req.query.rating,
		id: req.params.id,
	});
});

router.get("/:id/edit", async (req, res) => {
	if (DEBUG) console.log("film.Edit : " + req.params.id);
	res.render("filmPatch.ejs", {
		title: req.query.title,
		releaseYear: req.query.releaseYear,
		rating: req.query.rating,
		id: req.params.id,
	});
});

router.get("/:id/delete", async (req, res) => {
	if (DEBUG) console.log("film.Delete : " + req.params.id);
	res.render("filmDelete.ejs", {
		title: req.query.title,
		releaseYear: req.query.releaseYear,
		rating: req.query.rating,
		id: req.params.id,
	});
});

/* ********************* Calling HTTP Methods + Redirect ******************** */

router.post("/", async (req, res) => {
	try {
		await filmsDal.addFilm(
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		res.render("503");
	}
});

router.put("/:id", async (req, res) => {
	if (DEBUG) console.log("films.PUT: " + req.params.id);
	try {
		await filmsDal.putFilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		res.render("503");
	}
});

router.patch("/:id", async (req, res) => {
	if (DEBUG) console.log("films.PATCH: " + req.params.id);
	try {
		await filmsDal.patchFilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		res.render("503");
	}
});

router.delete("/:id", async (req, res) => {
	if (DEBUG) console.log("films.DELETE: " + req.params.id);
	try {
		await filmsDal.deleteFilm(req.params.id);
		res.redirect("/films/");
	} catch {
		res.render("503");
	}
});

module.exports = router;
