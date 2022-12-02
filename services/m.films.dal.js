const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getfilms() {
	if (DEBUG) console.log("films.mongo.dal.getfilms()");
	try {
		await dal.connect();
		const cursor = dal.db("fs_qap3_db").collection("dvds").find();
		const results = await cursor.toArray();
		return results;
	} catch (error) {
		console.log(error);
	}
}

async function getFilmByFilmId(id) {
	if (DEBUG) console.log("films.mongo.dal.getFilmByFilmId()");
	try {
		await dal.connect();
		const result = await dal
			.db("fs_qap3_db")
			.collection("dvds")
			.findOne({ _id: ObjectId(id) });
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function addFilm(title, releaseYear, rating) {
	if (DEBUG)
		console.log("films.mongo.dal.addFilm(): ", title, releaseYear, rating);
	// I wanted to play around with entering data into the database with a type other than
	// string, and I wanted to make sure the ratings were always uppercase, so I did the
	// conversion here.

	// Ideally I would do some server-side validation as well, to make sure the release
	// year is number, and if it failed then it would return an error to the client.
	// Thankfully the client-side validation doesn't let you input non-numbers so it
	// shouldn't be an issue. Also, I'm not sure if the conversion should be done here or
	// in films.js before it gets passed to this function - but from what I read online it
	// seems like many people like to put it here to separate the logic from the routing.

	let newDocument = {
		title: title,
		release_year: Number(releaseYear),
		rating: rating.toUpperCase(),
	};

	try {
		await dal.connect();
		const result = await dal
			.db("fs_qap3_db")
			.collection("dvds")
			.insertOne(newDocument);
		return result.insertedId;
	} catch (error) {
		console.log(error);
	}
}

async function putFilm(id, title, releaseYear, rating) {
	if (DEBUG) console.log("films.mongo.dal.putFilm()");
	try {
		await dal.connect();
		const result = await dal
			.db("fs_qap3_db")
			.collection("dvds")
			.replaceOne(
				{ _id: ObjectId(id) },
				{ title: title, release_year: releaseYear, rating: rating }
			);
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function patchFilm(id, title, releaseYear, rating) {
	if (DEBUG) console.log("films.mongo.dal.patchFilm()");
	try {
		await dal.connect();
		const result = await dal
			.db("fs_qap3_db")
			.collection("dvds")
			.updateOne(
				{ _id: ObjectId(id) },
				{ $set: { title: title, release_year: releaseYear, rating: rating } },
				{ upsert: true, returnDocument: "after" }
			);
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function deleteFilm(id) {
	if (DEBUG) console.log("films.mongo.dal.deleteFilm()");
	try {
		await dal.connect();
		const result = await dal
			.db("fs_qap3_db")
			.collection("dvds")
			.deleteOne({ _id: ObjectId(id) });
		return result;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getfilms,
	getFilmByFilmId,
	addFilm,
	putFilm,
	patchFilm,
	deleteFilm,
};
