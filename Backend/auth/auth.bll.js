import jwt from 'jsonwebtoken';
import { hashSync, compare } from 'bcrypt';
import * as usersRepository from '../user/users.repository.js'

function getToken(user) {
  const payload = {
    id: user._id,
    username: user.username
  };

  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, {
    // expiresIn: 60 * 60 // in secs
    expiresIn: process.env.AUTH_EXPIRES_IN // string
  });

  return token;
}

async function login ({username, password}){
    const user = await usersRepository.getByUsername({username});
    if (!user) {
        throw new Error('Wrong credentials no user');
      }
    const isSamePassword = await password === user.password;
   
    if (!isSamePassword) {
        throw new Error('Wrong credentials no es la misma pass');
      } else {
        throw new Error('CONTRASEÑA CORRECTA')
      }
}

async function register ({username, password}){
  const hashedPassword = hashSync (password, 10);
   const user = await usersRepository.createUsername({username, password: hashedPassword})
   if (!user) {
    throw new Error ('Some problem at insert');
   }
  const token = getToken({ username : user.username, _id: user._id });
  return token;
}

export {login, register}
