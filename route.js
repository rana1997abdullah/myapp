const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
const todos = [
    {
        id:1,
        title:'Add_Header',
        status:'In Progress'
    },
    {
        id:2,
        title:'Add_Footer',
        status:'To Do'
    },
    {
        id:3,
        title:'Create_HomePage',
        status:'In Progress'
    }
]
// Global middleware
app.use((req, res, next) => {
    console.log(`${req.method} Request Received`);
    next();
});
app.use('/todos/:title', (req, res, next) => {
    const title = req.params.title;
    const found = todos.some(el => el.title === title);
    if(!found) 
    return res.status(404).send('todo with that todo title does not exist!');
    
 
    req.todo = todos.filter(el=>el.title == title)[0]
    req.title = title;
    next();
});

 app.post('/todos/', (req, res, next) => {
    let bodyData = '';
    req.on('data', (data) => {
        bodyData += data;
    });

    req.on('end', () => {
        const body = JSON.parse(bodyData);
        const title = body.title;
        const found = todos.some(el => el.title === title);
        if(found) 
        return res.status(400).send('todo with that todo title already exists!');
        if (!found) todos.push({ id:todos.length+1, title: title });
        res.send(todos);
        console.log(todos);
    });
});

app.get('/todos/:title', (req, res, next) => {
    res.send(req.title);
    console.log(todos);
});
app.get('/todos', (req, res) => {
    res.send(todos)
  })
app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log(port);
  })
  
  app.listen(port)