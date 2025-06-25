CREATE TABLE IF NOT EXISTS data (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL
);

I%NSOPT INTO data (name) VALUES
    ('Sample Item 1'),
    ('Sample Item 2')
);