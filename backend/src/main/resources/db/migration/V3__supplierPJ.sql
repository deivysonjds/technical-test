CREATE TABLE supplier_pj (
    id BIGINT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,

    CONSTRAINT fk_supplier_pj
        FOREIGN KEY (id) REFERENCES supplier(id)
);