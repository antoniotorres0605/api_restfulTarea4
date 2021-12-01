let express = require("express");
let path = require("path");

let app = express();

let {Router} = express;

let router = new Router();
let id = new Router();

let PORT = 3000;




let Contenedor = require("./contenedor");
let c1 = new Contenedor('./productos.txt');

router.get("/",(req,res,next)=>{
  c1.getAll().then(data=>{
    res.send(data);
  }).catch(error=>{
    res.send(error);
  })
});



id.get("/:id",(req,res,next)=>{
  console.log("Entre al get")
  let id = (req.params.id);
  console.log(id)
  const data = c1.getById(id).then(data=>{
    console.log(data);
    res.send(data);
  }).catch(error=>{
    res.send(error);
  })
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

router.post("/",(req,res,next)=>{
  console.log(req.body.producto);
});

// MIDDLEWARE
app.use("/api/productos",router);
app.use("/api/productos",id);
app.use("/api",express.static(path.join(__dirname,"public","html")));



app.get("/", (req,res,next) => {
  res.send("<h1>Pagina de Inicio<br></h1>");
});

app.listen(PORT,()=>{
  console.log(`Escuchando en http://localhost:${PORT}`);
});