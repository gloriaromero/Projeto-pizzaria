import prismaClient from "../../prisma";
import{hash} from 'bcryptjs';

interface UserRequest {
    nome: string;
    email: string;
    senha: string;
}

class CreateUserService {

    async execute({ nome, email, senha }: UserRequest) {

        if (!email) {
            throw new Error("Email não enviado!");
        }

        const UserAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                email: email
            },
        });

        if (UserAlreadyExists) {
            throw new Error("E-mail já cadastrado!");
        }

        //criptografando senha
        const senhaHash = await hash(senha, 8);


        //Criação de um novo usuário no banco de dados
        //cadastro no banco de dados

        const user = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });
        return user;
    }
}

export { CreateUserService };