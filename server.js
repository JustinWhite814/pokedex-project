const express = require("express")

const path = require("path")
const liveReload = require("livereload")
const connectLiveReload = require("connect-livereload")

const app = express()

const api = require('./models')

app.set("view engine", "ejs")

app.set('views', path.join(__dirname, "views"));

// Define a function that will refresh the browser when nodemon restarts
const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


app.use(express.static("public"))
app.use(connectLiveReload())

// here we are saying any route is going to head directly to our gallery
app.get('/', (req,res)=> {
    res.redirect('/gallery')
})


app.get('/gallery', (req,res)=> {
    api.getAllPokemon()
        .then(response => {
            res.render('home', {pokemonCards: response, title: "Gallery"})
        })
})

app.get("/pokemon/:pokemonId", (req, res)=> {
    api.getPokemonDetails(req.params.pokemonId)
        .then(pokemon => res.render('details', {
            pokemon: pokemon,
            title: pokemon.name
        }))
})
/* Tell the app to "listen" or run on the specified port
--------------------------------------------------------------- */
app.listen(3000, function () {
    console.log('Your app is running on port 3000...');
});