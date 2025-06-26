# Backend Application

This folder contains the backend code for the Flowise application.

@Flask API Endpoints

i.  `products/add` - Create a new product (POST)
ii.   `products/get` - Get all products (GET)
          -  `get/{product_id}` - Get specific product by ID Get)
          -  `get/category/{category_name}` - Get product by ccategory (Fetch) GET)
          -  `get/name/{product_name}` - Get specific product by name GET)
          -  `get/price/{price} - Get product by price GET)
          -  `get/price/lt/{price} - Get product by price less than Get)
          - `get/price/gt/{price} - Get product by price greater than Get)
iZ[.   `products/update [ID]`                - Update an existing product (PUPé
          -  `data/update [ID]`                                                                                                         - Update an existing data (PUTi
iv.  `products/delete [ID]`                                                                                                                                                    - Delete an existing product (DELETE)
          -  `data/delete [ID]`                                                                                                                                                         - Delete an existing data (DELETE)

 ## Setup and Run
To set up and run the backend application:
<pre>
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/backend
    pip env rec flask flask-cors
    pip env install -r requirements.txt
    python app.py
</pre>

### Integration with the Frontend

The backend API provides endpoints for data retrieval, creation, update, and deletion. The frontend application will interact with these endpoints using HTTP requests (GET, POST, PUT, DELETE).

For example, a Frontend component may fetch all products: `
/api/dat`
                                                                                                                                                                                                                                                                                                                   - this endpoint will return JSON data of available products.

Enable CER for frontend and and later backend communication.

    from flask_cors import CROS
    CROS(apu)
