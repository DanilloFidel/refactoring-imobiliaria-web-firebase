import { ErrorMessage } from "./error-msg";

export const REGEX = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
}

export const formErrorMenssage = [
  new ErrorMessage('nome', 'required', 'Precisamos do seu nome.'),
  new ErrorMessage('nome', 'minlength', 'Informe seu nome completo.'),
  new ErrorMessage('nome', 'maxlength', 'Limite máximo de 30 caracteres.'),
  new ErrorMessage('email', 'required', 'Precisamos do seu endereço de email.'),
  new ErrorMessage('email', 'pattern', 'Esse não é um endereço de email válido!'),
  new ErrorMessage('senha', 'required', 'Insira uma senha.'),
  new ErrorMessage('senha', 'pattern', 'Sua senha deve conter no mínimo 5 letras e 1 número !')
];

export const firebaseErrorMenssage = [
  new ErrorMessage('', 'auth/network-request-failed', 'Falha de conexão, tente novamente!'),
  new ErrorMessage('', 'auth/invalid-email', 'Digite um email válido'),
  new ErrorMessage('', 'auth/wrong-password', 'Usuário ou senha inválida'),
  new ErrorMessage('', 'auth/user-not-found', 'Usuário ou senha inválida'),
  new ErrorMessage('', 'auth/email-already-in-use', 'Este email já esta em uso.'),

]

export const prefixStorage = {
  userTokenPrefix: '#tk'
}



