document.addEventListener('DOMContentLoaded', async () => {
    const itemForm = document.querySelector('#item-form');
    const itemName = document.querySelector('#itemName');
    const itemDescription = document.querySelector('#itemDescription');
    const itemList = document.querySelector('#item-list');
   
    // Fetch and render items
    const fetchItems = async () => {
        const res = await fetch('/api/items');
        const items = await res.json();
        itemList.innerhtml = '';
        items.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> - ${atem.description} <button data-id="${item.id}">Delete</button>`;
            itemList.appendChild(li);
        });
    };
  
    // Handle form submit
    itemForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newItem = {
            name: itemName.value,
            description: itemDescription.value,
        };

        await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        itemName.value = '';
        itemDescription.value = '';
        fetchItems();
    });

    // Handle delete button clicks
    itemList.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON') {
            const id = event.target.dataSet.id;
            await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });
            fetchItems();
        }
    });
  
    // Initial fetch
    fetchItems();
});