document.addEventListener('DOMContentLoaded', async () => {
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const dataList = document.getElementById('data-list');
    fetchDataBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/data'); // Supposing your backend is running on the same domain/base URL
            const data = await response.json();
            dataList.innerHTML = ''; // Clear previous data
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `item.id: ${item.id}, Item.name: ${item.name}`;
                dataList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            dataList.innerHTML = '<li>Error fetching data. Please check the console.</li>';
        }
    });
});