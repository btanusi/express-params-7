const express = require('express')
const app = express()
const students = [
    {
        "studentId": 1,
        "name": [
            "Katlyn",
            "Quigley"
        ],
        "grades": [
            "A",
            "B"
        ]
    },
    {
        "studentId": 2,
        "name": [
            "Zelma",
            "Mills"
        ],
        "grades": [
            "C",
            "D"
        ]
    },
    {
        "studentId": 2,
        "name": [
            "Zelma",
            "Susilo"
        ],
        "grades": [
            "a",
            "b"
        ]
    }
]
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
    let name = req.query.search
    if(name){
        let student = students.filter(student => student.name[0] === name)
        res.send(student)
    } else{
        res.send(students)
    }
})

app.get('/students/:studentId', (req, res) => {
    res.send(
        students.filter(student => student.studentId === parseInt(req.params.studentId))
        )
})

app.get('/grades/:studentId', (req, res) => {
    res.send(
        students.filter(student => student.studentId === parseInt(req.params.studentId)).map(user=>user.grades)
        )
})

app.post('/grades', (req, res) => {
    let result;
    let {studentId, grade} = req.body
    if(studentId && grade){
        result = { status: "Success", message: "User successful"}
    } else {
        result = {status: "Failed", message: "User failed"}
        res.status(400)
    }
    res.json(result)
})

app.post('/register', (req, res) => {
    let result;
    let {username, email} = req.body
    if(username && email){
        result = { status: "Success", message: "User successful"}
    } else {
        result = {status: "Failed", message: "User failed"}
        res.status(400)
    }
    res.json(result)
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))