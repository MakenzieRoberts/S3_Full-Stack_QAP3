<!--
    In VSCode, To switch to markdown preview mode, press Ctrl+Shift+V in the editor.

    To view preview side-by-side press (Ctrl+K V).
-->

<!--
    The route 'localhost:3000/films/listing' was created to purely to fulfil the scenario of a customer being able to see the list of films without the post input and edit/delete/replace options.

    Ideally, in the future I could add authentication to make sure only staff members are able to access post/put/patch/delete, but for now I just separated them into different pages.

    While a customer can visit 'localhost:3000/films/listing' to view a list of films, the route structure for the API is simply 'localhost:3000/api/films/<param><query>' as per your examples.
-->

---

# Test Cases (Routes)

| Method(s)  | URL                              | Scenario                                                                            |
| :--------: | :------------------------------- | :---------------------------------------------------------------------------------- |
|    GET     | localhost:3000/films/listing     | Customer can see a web page listing all films from the dvds database.               |
|    GET     | localhost:3000/films/:id         | Staff member can see a web page listing film information for a specific ID.         |
| GET + POST | localhost:3000/films             | Staff member can see a web page allowing them to add a new item to the films table. |
|    PUT     | localhost:3000/films/:id/replace | Staff member can see a web page allowing them to replace information for a film.    |
|   PATCH    | localhost:3000/films/:id/edit    | Staff member can see a web page allowing them to edit information for a film.       |
|   DELETE   | localhost:3000/films/:id/delete  | Staff member can see a web page allowing them to delete a film from the database.   |
