const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Specify the views folder
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_salary_management'
});

db.connect((err) => {
    if (err) console.log(err);
    else{
        console.log('Connected to database');
    }

});


app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.get('/displayemployees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.render('details',{results:results});
    });
});

app.post('/addEmployee', (req, res) => {
    // const { name, salary } = req.body;
    console.log(req.body);
    const id=req.body.employeeid;
    const name=req.body.employeeName;
    const dep=req.body.department;
    const gender=req.body.sex;
    const maritalstatus=req.body.maritalstatus;
    const employeesalary=req.body.employeesalary;
    const address=req.body.employeeaddress;
    const formData=[id,name,dep,gender,maritalstatus,employeesalary,address];
    const sql = `INSERT INTO employees VALUES (?,?,?,?,?,?,?)`;
    db.query(sql, formData, (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            res.status(500).json({ message: 'Error inserting data into the database' });
        } else {
            console.log('Data inserted into the database');
            const sql = 'SELECT * FROM employees';

            db.query(sql, (err, results) => {
                if (err) {
                    console.error('Database retrieval error:', err);
                    res.status(500).json({ message: 'Error retrieving data from the database' });
                } else {
                    res.render('details',{results:results});
                }
            });
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
