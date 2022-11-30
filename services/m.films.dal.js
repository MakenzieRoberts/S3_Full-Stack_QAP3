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
	if (DEBUG) console.log("films.mongo.dal.addfilm()");
	let newDocument = JSON.parse(
		`{ "title": "` +
			title +
			`", "release_year": "` +
			releaseYear +
			`", "rating": "` +
			rating +
			`" }`
	);
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
	if (DEBUG) console.log("actors.mongo.dal.putActor()");
	releaseYear = parseInt(releaseYear);
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
// async function patchfilm(id, fname, lname) {
//   if(DEBUG) console.log("films.mongo.dal.patchfilm()");
//   try {
//     await dal.connect();
//     const result = await dal.db("Auth").collection("film")
//       .updateOne({_id: ObjectId(id)},
//         {$set: {first_name: fname, last_name: lname}},
//         {upsert: true, returnDocument: 'after'}
//         );
//     return result;
//   } catch(error) {
//     console.log(error);
//   }
// };
// async function deletefilm(id) {
//   if(DEBUG) console.log("films.mongo.dal.deletefilm()");
//   try {
//     await dal.connect();
//     const result = dal.db("Auth").collection("film").deleteOne({ _id: ObjectId(id) });
//     return result;
//   } catch(error) {
//     console.log(error);
//   }
// };

module.exports = {
	getfilms,
	getfilmByfilmId,
	addfilm,
	putfilm,
	// patchfilm,
	// deletefilm,
};
