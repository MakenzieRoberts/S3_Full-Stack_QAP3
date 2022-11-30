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

async function getfilmByfilmId(id) {
	if (DEBUG) console.log("films.mongo.dal.getfilmByfilmId()");
	// id = ObjectId(id);
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

async function addfilm(title, releaseYear, rating) {
	// if (DEBUG)
	// 	console.log("dal addfilm() releaseyear type: ", typeof releaseYear);
	// releaseYear = parseInt(releaseYear);

	// let oldDocument = JSON.parse(
	// 	`{ "title": "` +
	// 		title +
	// 		`", "release_year": "` +
	// 		releaseYear +
	// 		`", "rating": "` +
	// 		rating +
	// 		`" }`
	// );
	// if (DEBUG)
	// 	console.log(
	// 		"dal addfilm() olddocument",
	// 		oldDocument,
	// 		" type:",
	// 		typeof oldDocument
	// 	);

	// Ideally I would do some server-side validation as well, to make sure the release year is number, and if it failed then it would return an error to the client, but I don't know where I would put that in my file structure. Thankfully the client-side validation doesn't let you input non-numbers. Also, I'm not sure if the conversion should be done here or in films.js before it gets passed to this function.
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
/* ********************************* old put ******************************** */
// async function putfilm(id, title, releaseYear, rating) {
// 	if (DEBUG) console.log("PUTFILM()", id, title, releaseYear, rating);
// 	id = ObjectId(id);
// 	try {
// 		await dal.connect();
// 		const result = await dal
// 			.db("fs_qap3_db")
// 			.collection("dvds")
// 			.replaceOne(
// 				{ _id: id },
// 				{ title: title, release_year: releaseYear, rating: rating }
// 			);
// 		return result;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
/* ********************************* old put ******************************** */
/* ******************************* new put try ****************************** */
async function putfilm(id, title, releaseYear, rating) {
	// if (DEBUG)
	// 	console.log("dal putfilm() releaseyear type: ", typeof releaseYear);
	// releaseYear = parseInt(releaseYear);
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
/* ******************************* new put try ****************************** */
async function patchfilm(id, title, releaseYear, rating) {
	if (DEBUG)
		console.log("dal patchfilm() releaseyear type: ", typeof releaseYear);
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

async function deletefilm(id) {
	if (DEBUG) console.log("films.mongo.dal.deletefilm()");
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
	getfilmByfilmId,
	addfilm,
	putfilm,
	patchfilm,
	deletefilm,
};
