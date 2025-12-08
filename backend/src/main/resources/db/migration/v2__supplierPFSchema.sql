CREATE TABLE supplier_pf (
    id BIGINT PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,

    CONSTRAINT fk_supplier_pf
        FOREIGN KEY (id) REFERENCES supplier(id)
);