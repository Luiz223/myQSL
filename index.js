const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// definindo handlebars como template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

//pasta de arquivos estaticos como CSS, imagens
app.use(express.static("public"))

//trabalhar com dados no formato json
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//CRUD = create, read, uptade, delete

//rotas

app.post("/edit/save", (req, res) =>{
    const {id, title, pageqty} = req.body
    
    const sql = `
    UPTADE books
    SET title = '${title}', pageqty = '${pageqty}
    WHERE id = ${id}
    `

    conn.query(sql, (error) =>{
        if (error){
            return console.log(error)
        }

        res.redirect("/")
    })
})


//rotas
app.post("/register/save", (req, res)=> {
    const {nome, pageqty} = req.body

    const query = `
    INSERT INTO books (nome, pageqty)
    VALUES ('${nome}', '${pageqty}')
    `
    conn.query(query, (error) =>{
        if (error){
            console.log(error)
            return
        }

        res.redirect("/")
    })
})

app.get("/edit/id", (req, res)=>{
    const id = res.params.id
    const sql = `
        SELECT * FROM books
        WHERE id = ${id}
    `

    conn.query(sql,(error,data) => {
        if(error){
            return console.log(error)
        }
        const book = data [0]

        res.render('edit', {book})
    })
})


app.get("/book/:id", (req, res)=> {
    const id = req.params.id

    const sql = `
        SELECT * FROM books
        WHERE id=${id}
    `

    conn.query(sql, (error, data) =>{
        if(error){
            return console.log(error)
        }

        const book = data[0]

        res.render("book", {book})
    })
})

app.get('/register', (req, res)=>{
    res.render("register")
}) 


app.get("/", (req, res) =>{
    const sql = 'SELECT * FROM books'
    conn.query(sql, (error, data) =>{
        if (error) {
            return console.log(error)
        }

        const books = data
        
        res.render('home', { books })
    })
})


app.get('/', (req, res)=> {
    res.render("Home")
})

// conexão com mySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "node_mysql",
    port: 3306
})

conn.connect((error) => {
    if(error) {
        console.log(error)
        return
    }

    console.log("conectado ao MySQL!")

    app.listen(3000,() =>{
        console.log("servidor rodando na porta 3000!")
    })
})