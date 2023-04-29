import Paciente from "@/app/models/Paciente";

class PacienteService {
    async findByNome(nome) {
        return Paciente.findOne({ where: {nome: nome}});
    }

    async findByCpf(cpf) {
        return Paciente.findOne({ where: {cpf: cpf}});
    }
}

export default new PacienteService();