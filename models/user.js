let user = []

class User {
    // Cria um novo usuário
    create(name) {
        if (name.length > 10) {
            return { success: false, message: 'O nome não pode ter mais de 10 caracteres' }
        } else {
            let randomId = Math.floor(Math.random() * 100);
            // TODO: realizar insert no banco
            user.push({
                "id": randomId,
                "name": this.name
            })
            return { success: true, message: 'Usuário cadastrado com sucesso' };
        }
    }
}

module.exports = User;