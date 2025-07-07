const API_BASE_URL = 'http://localhost:8000'; // Assuming backend runs on localhost:8000

const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const productStockInput = document.getElementById('productStock');
const submitButton = document.getElementById('submitButton');
const cancelEditButton = document.getElementById('cancelEditButton');
const productTableBody = document.querySelector('#productTable tbody');

// Function to fetch all products
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Please ensure the backend is running.');
    }
}

// Function to display products in the table
function displayProducts(products) {
    productTableBody.innerHTML = ''; // Clear existing rows
    products.forEach(product => {
        const row = productTableBody.insertRow();
        row.insertCell(0).textContent = product.id;
        row.insertCell(1).textContent = product.name;
        row.insertCell(2).textContent = product.description || 'N/A';
        row.insertCell(3).textContent = `$${product.price.toFixed(2)}`;
        row.insertCell(4).textContent = product.stock_quantity;

        const actionsCell = row.insertCell(5);
        actionsCell.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => populateFormForEdit(product);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteProduct(product.id);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to populate the form for editing
function populateFormForEdit(product) {
    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productDescriptionInput.value = product.description || '';
    productPriceInput.value = product.price;
    productStockInput.value = product.stock_quantity;

    submitButton.textContent = 'Update Product';
    cancelEditButton.style.display = 'inline-block';
}

// Function to reset the form
function resetForm() {
    productIdInput.value = '';
    productNameInput.value = '';
    productDescriptionInput.value = '';
    productPriceInput.value = '';
    productStockInput.value = '';
    submitButton.textContent = 'Add Product';
    cancelEditButton.style.display = 'none';
}

// Event listener for form submission
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = productIdInput.value;
    const name = productNameInput.value;
    const description = productDescriptionInput.value;
    const price = parseFloat(productPriceInput.value);
    const stock_quantity = parseInt(productStockInput.value, 10);

    const productData = { name, description, price, stock_quantity };

    try {
        let response;
        if (id) {
            // Update existing product
            response = await fetch(`${API_BASE_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
        } else {
            // Create new product
            response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
        }

        resetForm();
        fetchProducts(); // Refresh the list
    } catch (error) {
        console.error('Error saving product:', error);
        alert(`Failed to save product: ${error.message}`);
    }
});

// Event listener for cancel edit button
cancelEditButton.addEventListener('click', resetForm);

// Function to delete a product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
        }

        fetchProducts(); // Refresh the list
    } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Failed to delete product: ${error.message}`);
    }
}

// Initial fetch of products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);