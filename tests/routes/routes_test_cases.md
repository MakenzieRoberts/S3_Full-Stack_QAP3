<!--
    In VSCode, To switch to markdown preview mode, press Ctrl+Shift+V in the editor.

    To view preview side-by-side press (Ctrl+K V).
-->

---

# Test Cases (Routes)

| Method(s)  | URL                              | Scenario                                                                            |
| :--------: | :------------------------------- | :---------------------------------------------------------------------------------- |
|    GET     | localhost:3000/films             | Customer can see a web page listing all films from the dvds database.               |
|    GET     | localhost:3000/films/:id         | Staff member can see a web page listing film information for a specific ID.         |
| GET + POST | localhost:3000/films/add         | Staff member can see a web page allowing them to add a new item to the films table. |
|    PUT     | localhost:3000/films/:id/replace | Staff member can see a web page allowing them to replace information for a film.    |
|   PATCH    | localhost:3000/films/:id/edit    | Staff member can see a web page allowing them to edit information for a film.       |
|   DELETE   | localhost:3000/films/:id/delete  | Staff member can see a web page allowing them to delete a film from the database.   |
