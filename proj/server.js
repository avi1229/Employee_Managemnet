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
    else {
        console.log('Connected to database');
    }

});


app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the HTML file
app.get('/', (req, res) => {
    results=[{"maritalstatus":" "}];
    res.render('index',{user:results});
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.render('details', { results: results });
    });
});

app.get('/displayemployees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.render('details', { results: results });
    });
});

app.post('/addEmployee', (req, res) => {
    // const { name, salary } = req.body;
    console.log(req.body);
    const id = req.body.employeeid;
    const name = req.body.employeeName;
    const dep = req.body.department;
    const gender = req.body.sex;
    const maritalstatus = req.body.maritalstatus;
    const employeesalary = req.body.employeesalary;
    const address = req.body.employeeaddress;
    const formData = [id, name, dep, gender, maritalstatus, employeesalary, address];
    const sql = `INSERT INTO employees(e_id,e_name,department,e_gender,e_maritalstatus,e_salary,e_address) VALUES (?,?,?,?,?,?,?)`;
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
                    res.render('details', { results: results });
                }
            });
        }
    });
});

app.get('/delete/:id', (req, res) => {
    console.log(req.params.id)
    const Id = req.params.id;
    db.query('DELETE FROM employees WHERE e_id = ?', [Id], (error, results) => {
        if (error) {
            console.error('Error deleting data:', error);
        } else {
            console.log('Data deleted successfully');
        }
        res.redirect('/displayemployees');
    });
});

app.get('/edit/:id',(req,res)=>{
    const Id = req.params.id;
    db.query('select * from employees where e_id = ?',[Id], (error, results) => {
        if (error) {
            console.log('Error editing data:', error);
        } else {
            res.render('index', { user: results });
        }
    });

});

const port = 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

