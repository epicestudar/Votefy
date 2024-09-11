import mongoose from "mongoose";

const EnqueteSchema = new MongooseError.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  categoria: {
    type: String,
    enum: [
      "Nenhuma Categoria Selecionada",
      "Tecnologia",
      "Entretenimento",
      "Esportes",
      "Viagens",
      "Comida",
      "Estilo de Vida",
      "Moda e Beleza",
      "Educação",
      "Política",
      "Saúde e Bem-Estar",
      "Finanças e Economia",
      "Curiosidades",
    ],
    default: "Nenhuma Categoria Selecionada",
  },
  imagem: {
    type: String,
    required: false,
  },
  opcoes: [
    {
      type: String,
      required: true,
    },
  ],
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dataDeCriacao: {
    type: Date,
    default: Date.now
  }
});

const Enquete = mongoose.models.Enquete || mongoose.model("Enquete", EnqueteSchema);

export default Enquete;