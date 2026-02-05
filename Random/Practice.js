import { JsonWebTokenError } from "jsonwebtoken";
import { useMemo } from "react";
import { fileURLToPath } from "url";

const { log } = require("console");
const { chownSync } = require("fs");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

function add(a,b){
    return a+b;
}

add(10, 20);


function closure(){
    let a=10;
    function inner(){
        console.log(a)
    }
    return inner;
}

let result = closure();
result();

function debounce(func, delay){
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => func.apply(this, args), delay);
    }
}



// http.createServer((req, res) => {
// })



http.createServer().listen(port, hostname, () => {
    console.log(`server running at http://localhost:${5000}`)
})


function throttling(func, delay){
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => func.apply(this, args), delay);
    }
}

function checkPalindrome(str){
    let left = 0;
    let right = str.length - 1;
    while(left < right){
        if(str[left] !== str[right]){
            return false
        }
        left++;
        right--;
    }
    return true;
}



class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

let person1 = new Person("john", 30);
console.log(person1);

Object.freeze(person1);
person1.name = "doe";
console.log(person1);



const[state, UseState] = useState();
return(
    <div>kampit ojha</div>
)


useEffect(() =>){
    console.log("useEffect")
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json()
    .then((data) => console.log(data))
    return () => {
        console.log("useEffect cleanup")
    }
}


const fs = require("fs");

console.log(fs.readFileSync("./Practice.js", "utf-8"))

fs.writeFileSync("./Practice.js", "utf-8")

useMemo(() => {
    console.log("useMemo")
    return () =>
{
    console.log("useMemo cleanup")

}
}, [state])



const express = require("express");
const app = express();

app.get("/",(req, res) => {
    res.send("Hello World")
})

app.get("/about", (req, res) =>{
    res.send("About Page")
})

app.post("/login", (req, res) => {
    if (req.body.username === "kampit" && req.body.password === "123"){
        res.send("Login Success")
    } else {
        res.send("Login Failed")
    }
})

app.put("/update", (req, res) => {
    if (req.body.username === "kampit" && req.body.password === "123"){
        res.send("Update Success")
    } else {
        res.send("Update Failed")
    }
})

app.delete("/delete", (req, res) => {
    if (req.body.username === "kampit" && req.body.password === "123"){
        res.send("Delete Success")
    } else {
        res.send("Delete Failed")

    }
})

app.listen(3000, () => {
    console.log("Server runnig at http://localhost:3000")
})

// {
//   title: "First Note",
//   description: "This is my note"
// }

 
{
    title: "First Note",
    description: "This is my note",
    id: 1,
    address: "123 Main St",
     [1,2,3,4,5],
     {
        name: "kampit",
        age: 22
     }
     city[{name: "kampit", age: 22}]            
     
     kampit{
        name:"kampit"{
            age:22{
                city:"kolkata"{
                    pincode:110094{
                        country:"Russia"{
                            Language:"Sanskrit"{
                                Gender:"Male"{
                                    Post:"Software Engineer"{
                                        salary:100000{
                                            Company:"Google"{
                                                Location:"Silicon Valley"{
                                                    Country: "USA"{
                                                    }
                                                }
                                            }
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }
     }
}




const notes = [1,2,3,4,5];

notes.forEach(() => {
    console.log("kampit")
    return "Kampit"
    console.log("la")
    return "la"
});




for(i=0; i<notes.length; i++){
    console.log("kampit")
    return "kampit"
    console.log("la")
    return "la"
    for(j = 0; j<notes.length;j++){
        console.log("la")
        return "la"
        console.log("la")
        return "la"
    }
}




const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/about", (req, res) => {
    res.send("About Page")
})

app.post("/login", (req, res) => {
    res.send("Login Page")
})

app.put("/update", (req, res) => {
    res.send("Update Page")
})

app.delete("/delete", (req, res) => {
    res.send("Delete Page")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


module.exports = app;





bearer JsonWebTokenError 






function authentication(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve ("success")
        },2000)
    })
}

authentication().then((res) => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})


app.use(express.json());
req.body.title
req.body.description


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/practice_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/practice_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const NoteSchema - new mongoose.Schema({
    title: String,
    description: String,
    number: Number,
    boolean: Boolean,
    date: Date,
    array: Array,
    object: Object,
    mixed: mongoose.Schema.Types.Mixed
})


const Note = mongoose.model('Note', NoteSchema);

const note = new Note({
    title: 'First Note',
    description: 'This is my note',
    number: 1,
    boolean: true,
    date: new Date(),
    array: [1,2,3,4,5],
    object: {name: 'John', age: 30},
    mixed: 'This is a mixed type'
});

note.save()
    .then(() => console.log('Note saved to MongoDB...'))
    .catch(err => console.error('Could not save note to MongoDB...', err));

    const note = new Note({
        title: 'First Note',
        description: 'This is my note',
        number: 1,
        boolean: true,
        date: new Date(),
        array: [1,2,3,4,5],
        object: {name: 'John', age: 30},
        mixed: 'This is a mixed type'
    });

    note.save()
        .then(() => console.log('Note saved to MongoDB...'))
        .catch(err => console.error('Could not save note to MongoDB...', err));

        const NewSchema = new mongoose.Schema({
            title: String,
            description: String,
            number: Number,
            boolean: Boolean,
            date: Date,
            array: Array,
            object: Object,
            mixed: mongoose.Schema.Types.Mixed
        })

        const NewNote = mongoose.model('NewNote', NewSchema);

        const newNote = new NewNote({
            title: 'First Note',
            description: 'This is my note',
            number: 1,
            boolean: true,
            date: new Date(),
            array: [1,2,3,4,5],
            object: {name: 'John', age: 30},
            mixed: 'This is a mixed type'
        });

        newNote.save()
            .then(() => console.log('New Note saved to MongoDB...'))
            .catch(err => console.error('Could not save new note to MongoDB...', err));

            const newNote = new NewNote({
                title: 'First Note',
                description: 'This is my note',
                number: 1,
                boolean: true,
                date: new Date(),
                array: [1,2,3,4,5],
                object: {name: 'John', age: 30},
                mixed: 'This is a mixed type'
            });

            newNote.save()
                .then(() => console.log('New Note saved to MongoDB...'))
                .catch(err => console.error('Could not save new note to MongoDB...', err));


                findNote = NewNote.find({});
                findNote.then(res => console.log(res))
                .catch(err => console.error(err));


                findOneAndDelete = NewNote.findOneAndDelete({title: 'First Note'});
                findOneAndDelete.then(res => console.log(res))
                .catch(err => console.error(err));

                findOneAndUpdate = NewNote.findOneAndUpdate({title: 'First Note'}, {title: 'Updated Note'});
                findOneAndUpdate.then(res => console.log(res))
                .catch(err => console.error(err));

                findByIdAndDelete = NewNote.findByIdAndDelete('646d2b9b3b9b3b9b3b9b3b9b');
                findByIdAndDelete.then(res => console.log(res))
                .catch(err => console.error(err));

                findByIdAndUpdate = NewNote.findByIdAndUpdate('646d2b9b3b9b3b9b3b9b3b9b', {title: 'Updated Note'});
                findByIdAndUpdate.then(res => console.log(res))
                .catch(err => console.error(err));       
                
                


                const multer = require('multer');
                const upload = multer({dest: 'uploads/'});

                app.post('/upload', upload.single('file'), (req, res) => {

                     while(true){
                        for(let i = 0; i < 1000000; i++){
                            console.log(i);
                            console.log("la")
                        }
                        console.log("la")
                     }

                    for(let i = 0; i < 1000000; i++){
                        console.log(i);
                        console.log("la")
                        if(i === 999999){
                            console.log("kampit")
                        } else if (i === 999998) {
                            console.log("kampit2")
                        } else if (i === 999997) {
                            console.log("kampit3")
                        } else if (i === 999996) {
                            console.log("kampit4")
                        } else if (i === 999995) {
                            console.log("kampit5")
                        } else if (i === 999994) {
                            console.log("kampit6")
                        } else if (i === 999993) {
                            console.log("kampit7")
                        } else if (i === 999992) {
                            console.log("kampit8")
                        } else if (i === 999991) {
                            console.log("kampit9")
                        } else if (i === 999990) {
                            console.log("kampit10")
                        } else {
                            console.log("kampit11")
                        }
                    }
                    res.send('File uploaded successfully');
                });

                app.listen(3000, () => {
                    console.log('Server started on port 3000');
                });

                

                env fileURLToPath


                OPENAI_API_KEY = ioahgokagklaiohioaugkohgakg
                POSTMAN_API_KEY = ioahgokagklaiohioaugkohgakg
                CLAUDE_API_KEY = ioahgokagklaiohioaugkohgakg
                IMAGE_API_KEY = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_KEY = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_SECRET = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_ENDPOINT = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_URL = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_VERSION = ioahgokagklaiohioaugkohgakg
                IMAGEKIT_API_REGION = ioahgokagklaiohioaugkohgakg
                
