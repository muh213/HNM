// script.js

let students = [];
let drivers = [];
let teachers = [];
let activeTab = 'students';
let isAdding = false;
let editingId = null;

const formContainer = document.getElementById('form-container');
const dataTable = document.getElementById('data-table');

// Render tab data based on active tab
function setActiveTab(tab) {
    activeTab = tab;
    renderForm();
    renderTable();
}

// Render the form based on the active tab (for adding/editing entries)
function renderForm() {
    const formHtml = `
        <div class="flex gap-4 mb-6">
            <input type="text" id="name" placeholder="${activeTab} Name" class="input-field" />
            <input type="text" id="iqama" placeholder="Iqama Number" class="input-field" />
            <button onclick="handleAdd()" class="add-btn">${isAdding ? 'Add' : 'Update'} ${capitalize(activeTab)}</button>
        </div>
    `;
    formContainer.innerHTML = formHtml;
}

// Render the data table based on the active tab
function renderTable() {
    let data = [];
    let headers = [];
    
    if (activeTab === 'students') {
        data = students;
        headers = ['Name', 'Iqama'];
    } else if (activeTab === 'drivers') {
        data = drivers;
        headers = ['Name', 'Iqama'];
    } else if (activeTab === 'teachers') {
        data = teachers;
        headers = ['Name', 'Iqama'];
    }

    const tableHtml = `
        <table>
            <thead>
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('')}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.length === 0 ? '<tr><td colspan="3">No data found</td></tr>' : data.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.iqama}</td>
                        <td>
                            <button onclick="handleEdit(${item.id})">Edit</button>
                            <button onclick="handleDelete(${item.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    dataTable.innerHTML = tableHtml;
}

// Add or update an entry
function handleAdd() {
    const name = document.getElementById('name').value;
    const iqama = document.getElementById('iqama').value;

    if (name && iqama) {
        if (editingId) {
            // Update
            if (activeTab === 'students') {
                students = students.map(s => s.id === editingId ? { ...s, name, iqama } : s);
            } else if (activeTab === 'drivers') {
                drivers = drivers.map(d => d.id === editingId ? { ...d, name, iqama } : d);
            } else if (activeTab === 'teachers') {
                teachers = teachers.map(t => t.id === editingId ? { ...t, name, iqama } : t);
            }
            editingId = null;
        } else {
            // Add new
            const newItem = { id: Date.now(), name, iqama };
            if (activeTab === 'students') {
                students.push(newItem);
            } else if (activeTab === 'drivers') {
                drivers.push(newItem);
            } else if (activeTab === 'teachers') {
                teachers.push(newItem);
            }
        }

        renderTable();
        renderForm();
    }
}

// Edit an entry
function handleEdit(id) {
    const item = getItemById(id);
    document.getElementById('name').value = item.name;
    document.getElementById('iqama').value = item.iqama;
    editingId = id;
    renderForm();
}

// Delete an entry
function handleDelete(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        if (activeTab === 'students') {
            students = students.filter(s => s.id !== id);
        } else if (activeTab === 'drivers') {
            drivers = drivers.filter(d => d.id !== id);
        } else if (activeTab === 'teachers') {
            teachers = teachers.filter(t => t.id !== id);
        }
        renderTable();
    }
}

// Get item by id (helper function)
function getItemById(id) {
    if (activeTab === 'students') {
        return students.find(s => s.id === id);
    } else if (activeTab === 'drivers') {
        return drivers.find(d => d.id === id);
    } else if (activeTab === 'teachers') {
        return teachers.find(t => t.id === id);
    }
}

// Capitalize the first letter of the word
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize
setActiveTab('students');
