
var express = require('express');
const csv = require('csv-parser');

var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const fs = require("fs");
fs.createReadStream('PatientDetails.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row.id);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});




app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(helmet());
app.use(limiter);

server.listen(3000, function(){
  console.log("server is listening on port: 3000");
});



const { create } = require("ipfs-http-client");
// const fs = require("fs")
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https"
        }
    );
    return ipfs;
}

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'page-login.html'));
});

async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}
// saveText();

async function saveFile() {

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result.path)
    fs.writeFileSync('patient_ipfs.json', result.path);

}

async function saveFile() {

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result.path)
    fs.writeFileSync('patient_ipfs.json', result.path);

}
app.post("/update", function(req,res){

        saveFile() 
    });

app.post("/view", function(req,res){

        saveFile() 
});

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}

// getData("QmQbA7BrBNkh1bbSgtUYdUJYsHRfvRN6k5vocxHgjadUjr")
