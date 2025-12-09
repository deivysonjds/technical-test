CREATE TABLE enterprise_supplier (
    id BIGSERIAL PRIMARY KEY,
    enterprise_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_enterprise_supplier_enterprise
        FOREIGN KEY (enterprise_id)
        REFERENCES enterprise(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_enterprise_supplier_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES supplier(id)
        ON DELETE CASCADE,

    CONSTRAINT uc_enterprise_supplier_unique
        UNIQUE (enterprise_id, supplier_id)
);