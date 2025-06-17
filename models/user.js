const pool = require("../db/database");
const { errorToString } = require("../utils/error_string");

class User {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    validate() {
        let name = this.data.name;

        if (typeof name != 'string') {
            this.errors.push('Formato de name inválido.');
        }

        if (name.length > 150) {
            this.errors.push('O nome não pode ter mais que 150 caracteres.')
        }

        if (this.errors.length == 0) {
            return { ok: true, errors: [] };
        }
        return { ok: false, errors: this.errors };
    }

    // Cria um novo usuário
    create() {
        return new Promise((resolve, reject) => {
            let validate = this.validate();
            if (!validate.ok) {
                reject('Usuário com dados inválidos:', errorToString(validate.errors));
            }

            const userQuery = "INSERT INTO users(name) VALUES ($1) RETURNING id";
            
            pool.query(userQuery, [this.data.name], (error, result) => {
                if (error) {
                    reject('Não foi possível criar o usuário', error);
                } else {
                    this.data.id = result.rows[0].id;
                    resolve(result.rows[0].id)
                }
            });
        });
    }
}

module.exports = User;