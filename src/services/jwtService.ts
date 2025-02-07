import jwt from 'jsonwebtoken'

const secret = 'chave-jwt'

export const jwtService={
    signToken:(payload:string|object|Buffer,expiration:string)=>{
        console.log('Payload recebido:', payload);
        return jwt.sign(payload,secret,{
            expiresIn:expiration
        })
    },
    verifyToken: (token:string,callbackfn:jwt.VerifyCallback)=>{
        jwt.verify(token,secret,callbackfn)
    }
}