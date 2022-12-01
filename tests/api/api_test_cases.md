<!--
    In VSCode, To switch to markdown preview mode, press Ctrl+Shift+V in the editor.

    To view preview side-by-side press (Ctrl+K V).
-->

---

# Test Cases (API)

| Method(s) | URL                          | Scenario                                                                             |
| :-------: | :--------------------------- | :----------------------------------------------------------------------------------- |
|    GET    | localhost:3000/api/films     | Business Partner can fetch JSON from all films in dvds database from a REST API.     |
|    GET    | localhost:3000/api/films/:id | Business Partner can fetch JSON for a film in the database (by ID) using a REST API. |
|   POST    | localhost:3000/api/films/:id | Business Partner can add a new item to the films table using a REST API Client.      |
|    PUT    | localhost:3000/api/films/:id | Business Partner can replace information for a film using a REST API Client.         |
|   PATCH   | localhost:3000/api/films/:id | Business Partner can edit information for a film using a REST API Client.            |
|  DELETE   | localhost:3000/api/films/:id | Business Partner can delete a film from the database using a REST API Client.        |
