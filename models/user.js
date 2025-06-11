const pool = require("../db/database");

class User {
    // Cria um novo usuário
    async create(name) {
        const userQuery = "INSERT INTO users(name) VALUES ($1) RETURNING id, name";
        let userResult = await pool.query(userQuery, [name]);
        return userResult.rows[0];
    }
}

module.exports = User;