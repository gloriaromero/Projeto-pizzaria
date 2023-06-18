import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
)
{
    //armazena o token enviado na requisição
    const authToken = req.headers.authorization;

    //verifica se o usuário enviou um token na requisição
    if(!authToken)
    {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");
    
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id= sub;

    return next();
    }
    catch(err){
        console.log(err);
        return res.status(401).end();
    }
}