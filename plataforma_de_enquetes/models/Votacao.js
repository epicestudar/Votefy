import mongoose from "mongoose";

const VotacaoSchema = new mongoose.Schema({
  enqueteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enquete",
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  opcaoVotada: {
    type: Number, // Armazena o índice da opção votada
    required: true,
  },
  dataQueVotou: {
    type: Date,
    default: Date.now,
  },
});

const Votacao =
  mongoose.models.Votacao || mongoose.model("Votacao", VotacaoSchema);

export default Votacao;
