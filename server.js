const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Definindo o armazenamento para os uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Criação do diretório de uploads se não existir
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Middleware para servir arquivos estáticos
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para upload de arquivos
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Arquivo não enviado' });
    }

    // Salvar informações do arquivo (em um banco de dados ou em um arquivo JSON, por exemplo)
    const fileData = {
        image: req.file.filename,
        credits: req.body.credits,
        name: req.body.name,
        description: req.body.description,
        code: req.body.code
    };

    // Salvar no disco em formato JSON (apenas para exemplo, seria melhor usar um banco de dados)
    fs.writeFileSync('uploads/data.json', JSON.stringify(fileData));

    res.json({ success: true });
});

// Endpoint para baixar o ZIP
app.get('/download', (req, res) => {
    const filePath = 'uploads/data.json'; // Aqui você pode especificar o caminho do arquivo ZIP real
    res.download(filePath);
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
