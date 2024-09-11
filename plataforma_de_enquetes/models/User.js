import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    fotoDePerfil: {
        type: String,
        required: false
    }
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('senha')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
})

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.senha);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;