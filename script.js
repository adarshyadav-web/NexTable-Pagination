const tableBody = document.getElementById('table-body');
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const startIndexEl = document.getElementById('start-index');
const endIndexEl = document.getElementById('end-index');

let currentPage = 1;
const rowsPerPage = 10;
const totalUsers = 50;

// Generate Dummy Data
const users = Array.from({ length: totalUsers }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: 'Active'
}));

function displayTable(page) {
    tableBody.innerHTML = '';
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = users.slice(start, end);

    paginatedItems.forEach(user => {
        const row = `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="status-badge active">${user.status}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    startIndexEl.textContent = start + 1;
    endIndexEl.textContent = Math.min(end, totalUsers);
    
    updatePagination(page);
}

function updatePagination(page) {
    pageNumbers.innerHTML = '';
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === page) btn.classList.add('active');
        btn.onclick = () => {
            currentPage = i;
            displayTable(currentPage);
        };
        pageNumbers.appendChild(btn);
    }

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
    }
};

nextBtn.onclick = () => {
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTable(currentPage);
    }
};

// Initial Render
displayTable(currentPage);
