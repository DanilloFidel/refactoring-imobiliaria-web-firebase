import { ErrorMessage } from "./error-msg";

export const REGEX = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  name: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
};

export const formErrorMenssage = [
  new ErrorMessage("nome", "required", "Precisamos do seu nome."),
  new ErrorMessage("nome", "pattern", "Nome inválido."),
  new ErrorMessage("nome", "minlength", "Informe seu nome completo."),
  new ErrorMessage("nome", "maxlength", "Limite máximo de 30 caracteres."),
  new ErrorMessage("email", "required", "Precisamos do seu endereço de email."),
  new ErrorMessage(
    "email",
    "pattern",
    "Esse não é um endereço de email válido!"
  ),
  new ErrorMessage("senha", "required", "Insira uma senha."),
  new ErrorMessage("senha", "pattern", "Use letras e números."),
  new ErrorMessage("senha", "minlength", "Use uma senha maior.")
];

export const firebaseErrorMenssage = [
  new ErrorMessage(
    "",
    "auth/network-request-failed",
    "Falha de conexão, tente novamente!"
  ),
  new ErrorMessage("", "auth/weak-password", "Senha inválida!"),
  new ErrorMessage("", "auth/invalid-email", "Digite um email válido"),
  new ErrorMessage("", "auth/wrong-password", "Email ou senha inválidos"),
  new ErrorMessage(
    "",
    "auth/user-not-found",
    "Email não encontrado no sistema"
  ),
  new ErrorMessage(
    "",
    "auth/email-already-in-use",
    "Este email já esta em uso."
  ),
  new ErrorMessage("", "auth/expired-action-code", "O link enviado já expirou!")
];

export const PATHS = {
  areaDeAutenticacao: "area-de-autenticacao",
  areaDoUsuario: "./area-do-usuario"
};

export const URLS = {
  sendNotification: "https://fcm.googleapis.com/fcm/send",
  registerTopic: "https://iid.googleapis.com/iid/v1/"
};

export const prefixStorage = {
  userTokenPrefix: "#tk"
};

export const HELPERTEXTS = {
  login: "ÁREA EXCLUSIVA",
  recovery: "RECUPERAR SENHA",
  register: "CADASTRE-SE",
  registredSucess: "Cadastro efetuado com sucesso",
  loginAlert: "efetue login para reenviar um novo email de confirmação",
  emailConfirmSend: "Um link de confirmação foi enviado ao seu email",
  emailRecoverySend: "Recupere sua senha através do link que te enviamos",
  resetAlert: "Retorne ao painel para recuperar sua senha",
  pwdChangeSucess: "senha alterada, agora você pode efetuar login",
  emailConfirmedAlert: "Seu email foi confirmado, você ja pode efetuar login",
  emailNotConfirmAlert: "Esta conta está pendente de confirmação",
  invalidCodeTitle: "Seu código expirou",
  changePwdTitle: "Digite sua nova senha",
  fail: "Ops, algo deu errado!",
  sucess: "Tudo certo",
  warning: "Atenção",
  expiredLogin: "sua sessão expirou, efetue login novamente"
};

export const FIREBASE = {
  apiKey: "AIzaSyA44AiIKvrnWcNsi7sJ5ZGfF2YjyjkgN2s",
  authDomain: "imobiliaria-web.firebaseapp.com",
  databaseURL: "https://imobiliaria-web.firebaseio.com",
  projectId: "imobiliaria-web",
  storageBucket: "imobiliaria-web.appspot.com",
  messagingSenderId: "914381001581"
};

export const PAYLOAD = {
  body: 'Nova mensagem',
  title: '---titulo---',
  clickAction: "http://localhost:4200",
  icon: "http://localhost:3000/icon.png"
}

export const AUTHKEYFIREBASE = "AAAA1OVa020:APA91bH1R0BkIgFoy1RbNbLWX533thB0VwGfszkqY2n9dn9oU5PlT0xx5WCtLQpN6lib5rJbS_FOESI4I5gbXWm6Pm0O9LYJj1xkesO3mUSab5hrqWRSVX5JQF6qmI4k58FM5PGj4fH8"
