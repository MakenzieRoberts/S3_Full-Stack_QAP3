<!--
    In VSCode, To switch to markdown preview mode, press Ctrl+Shift+V in the editor.

    To view preview side-by-side press (Ctrl+K V).
-->

# Semester 3 | Full-Stack QAP 3 | REST API (MongoDB)

## **Test Cases (API)**

| Method(s) | URL                          | Scenario                                                                             |
| :-------: | :--------------------------- | :----------------------------------------------------------------------------------- |
|    GET    | localhost:3000/api/films     | Business Partner can fetch JSON from all films in dvds database from a REST API.     |
|    GET    | localhost:3000/api/films/:id | Business Partner can fetch JSON for a film in the database (by ID) using a REST API. |
|   POST    | localhost:3000/api/films/    | Business Partner can add a new item to the films table using a REST API Client.      |
|    PUT    | localhost:3000/api/films/:id | Business Partner can replace information for a film using a REST API Client.         |
|   PATCH   | localhost:3000/api/films/:id | Business Partner can edit information for a film using a REST API Client.            |
|  DELETE   | localhost:3000/api/films/:id | Business Partner can delete a film from the database using a REST API Client.        |

---

## **Test Cases (Routes)**

| Method(s)  | URL                              | Scenario                                                                            |
| :--------: | :------------------------------- | :---------------------------------------------------------------------------------- |
|    GET     | localhost:3000/films/listing     | Customer can see a web page listing all films from the dvds database.               |
|    GET     | localhost:3000/films/:id         | Staff member can see a web page listing film information for a specific ID.         |
| GET + POST | localhost:3000/films             | Staff member can see a web page allowing them to add a new item to the films table. |
|    PUT     | localhost:3000/films/:id/replace | Staff member can see a web page allowing them to replace information for a film.    |
|   PATCH    | localhost:3000/films/:id/edit    | Staff member can see a web page allowing them to edit information for a film.       |
|   DELETE   | localhost:3000/films/:id/delete  | Staff member can see a web page allowing them to delete a film from the database.   |

---

## **Example Documents (BSON)**

```
[
	{
		"title": "Dazed Punk",
		"release_year": 2003,
		"rating": "PG-13"
	},
	{
		"title": "Airplane Sierra",
		"release_year": 2007,
		"rating": "PG-13"
	},
	{
		"title": "Dirty Ace",
		"release_year": 2002,
		"rating": "R"
	},
	{
		"title": "Lord Arizona",
		"release_year": 2009,
		"rating": "R"
	},
	{
		"title": "Informer Double",
		"release_year": 2010,
		"rating": "PG-13"
	},
	{
		"title": "Owl Altar",
		"release_year": 2005,
		"rating": "R"
	}
]
```
