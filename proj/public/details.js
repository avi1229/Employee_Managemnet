document.addEventListener('DOMContentLoaded', function() {
    fetch('/employees')
        .then(response => response.json())
        .then(data => {
            const detailsContainer = document.getElementById('details-container');
            let recordsHTML = '<h1>Records</h1>';

            data.forEach(record => {
                recordsHTML += `
                    <div class="record">
                        <p>Name: ${record.name}</p>
                        <p>Email: ${record.email}</p>
                        <button class="edit-btn" data-id="${record.id}">Edit</button>
                        <button class="delete-btn" data-id="${record.id}">Delete</button>
                    </div>
                `;
            });

            detailsContainer.innerHTML = recordsHTML;

            // Attach event listeners to edit and delete buttons
            const editButtons = document.querySelectorAll('.edit-btn');
            const deleteButtons = document.querySelectorAll('.delete-btn');

            editButtons.forEach(button => {
                button.addEventListener('click', editRecord);
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteRecord);
            });
        })
        .catch(error => {
            console.error('Error fetching records:', error);
        });
});

function editRecord(event) {
    const recordId = event.target.dataset.id;
    // Redirect to an edit page or implement editing logic
}

function deleteRecord(event) {
    const recordId = event.target.dataset.id;
    // Implement delete logic here, e.g., send a delete request to the server
}
