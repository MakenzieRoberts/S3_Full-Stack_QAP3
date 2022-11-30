const express = require("express");
const router = express.Router();
// const filmsDal = require('../services/pg.films.dal')
const filmsDal = require("../services/m.films.dal");

router.get("/", async (req, res) => {
	// const thefilms = [
	//     {first_name: 'Youn', last_name: 'Yuh-jung'},
	//     {first_name: 'Laura', last_name: 'Dern'},
	//     {first_name: 'Regina', last_name: 'King'}
	// ];
	try {
		let thefilms = await filmsDal.getfilms();
		if (DEBUG) console.table(thefilms);
		res.render("films.ejs", { thefilms });
	} catch {
		res.render("503");
	}
});

router.get("/:id", async (req, res) => {
	// const anfilm = [
	//     {first_name: 'Regina', last_name: 'King'}
	// ];
	if (DEBUG) console.log(req.params.id);
	try {
		let anfilm = await filmsDal.getfilmByfilmId(req.params.id); // from postgresql
		if (DEBUG) console.log("INVALID ID ROUTE TEST: ", anfilm);
		if (anfilm === null) res.render("norecord.ejs", { id: req.params.id });
		else res.render("film.ejs", { anfilm });
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

router.post("/", async (req, res) => {
	if (DEBUG) console.log("films.POST");
	try {
		await filmsDal.addfilm(
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		// log this error to an error log file.
		res.render("503");
	}
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
	if (DEBUG) console.log("films.PUT: " + req.params.id);
	try {
		await filmsDal.putfilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		// log this error to an error log file.
		res.render("503");
	}
});

router.patch("/:id", async (req, res) => {
	if (DEBUG) console.log("films.PATCH: " + req.params.id);
	try {
		await filmsDal.patchfilm(
			req.params.id,
			req.body.title,
			req.body.releaseYear,
			req.body.rating
		);
		res.redirect("/films/");
	} catch {
		// log this error to an error log file.
		res.render("503");
	}
});

router.delete("/:id", async (req, res) => {
	if (DEBUG) console.log("films.DELETE: " + req.params.id);
	try {
		await filmsDal.deletefilm(req.params.id);
		res.redirect("/films/");
	} catch {
		// log this error to an error log file.
		res.render("503");
	}
});

module.exports = router;
