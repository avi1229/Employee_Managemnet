document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');
    const employeeList = document.getElementById('employeeList');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const salary = event.target.salary.value;
        const response = await fetch('/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, salary })
        });
        if (response.ok) {
            const data = await response.json();
            const employeeItem = document.createElement('li');
            employeeItem.textContent = `${data.name}: $${data.salary}`;
            employeeList.appendChild(employeeItem);
            form.reset();
        }
    });

    async function fetchEmployees() {
        const response = await fetch('/employees');
        if (response.ok) {
            const employees = await response.json();
            employees.forEach(employee => {
                const employeeItem = document.createElement('li');
                employeeItem.textContent = `${employee.name}: $${employee.salary}`;
                employeeList.appendChild(employeeItem);
            });
        }
    }

    fetchEmployees();
});
