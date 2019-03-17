// ========================================
// puerto
// ========================================
process.env.PORT = process.env.PORT || 3000;

// ========================================
// entorno
// ========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; // estoy en heroku o en local

// ========================================
// BBDD
// ========================================
let urlBD;
if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}
process.env.URLBD = urlBD;

// ========================================
// vencimiento del token
// ========================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================================
// seed de autenticacion
// ========================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ========================================
// google client, secret
// ========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || 'your client id'; // poner un dummy para hacer push a git y poner le verdadero para push a heroku
process.env.GOOGLE_SECRET = process.env.GOOGLE_SECRET || 'your google secret'; // poner un dummy para hacer push a git y poner le verdadero para push a heroku