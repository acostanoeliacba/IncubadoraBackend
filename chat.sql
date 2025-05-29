CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY auto_increment,
    client_offset VARCHAR(255) UNIQUE NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- VARCHAR para longitud definida, NOT NULL
    content TEXT NOT NULL -- NOT NULL para asegurar que el contenido no esté vacío
);