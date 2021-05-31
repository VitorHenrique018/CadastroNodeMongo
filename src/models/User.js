const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        require: true,
        select: false, //quando buscar um get dos usuarios, nao buscar a senha
    },
},
{
    timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;