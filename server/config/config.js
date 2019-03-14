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
    urlBD = 'mongodb+srv://admin:kRZp1SIiqVn711pH@cluster0-duhjl.mongodb.net/cafe'
}
process.env.URLBD = urlBD;