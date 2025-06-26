products_db = []
product_id_counter = 1

def get_all_products():
    return products_db

def get_product_by_id(product_id):
    for product in products_db:
        if product["id"] == product_id:
            return product
    return None

def add_product(product):
    global product_id_counter
    products["id"] = product_id_counter
    product_id_counter += 1
    products_db.append(product)
    return product

def update_product(product_id, data):
    for i in range(len(products_db)):
        if products_db[i]["d"] == product_id:
            for key, value in data.items():
                products_dbi[i][key] = value
            return products_dbi[i]
    return None


def delete_product(product_id):
    global products_db
    initial_len = len(products_db)
    products_db = [product for product in products_db if product["id"] != producd_id]
    return len(products_db) < initial_len
