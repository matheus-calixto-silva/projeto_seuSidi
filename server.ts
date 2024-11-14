import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'seu_segredo_seguranca';
const EXPIRES_IN = '1h';

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Função para criar um token JWT
function createToken(payload: object) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

// Middleware para simular login e gerar JWT
server.post('/login', (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const users = router.db.get('users').value();

  // Verifica se o usuário existe
  const user = users.find((u: { email: string; senha: string }) => u.email === email && u.senha === senha);

  if (user) {
    // Gera o token JWT com o ID e email do usuário
    const token = createToken({ id: user.id, email: user.email });
    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Usa o roteador JSON Server padrão
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server está rodando em http://localhost:3001');
});