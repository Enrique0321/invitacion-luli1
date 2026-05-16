const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint para RSVP (Confirmación de asistencia opcional, si deciden no usar el de WhatsApp)
app.post('/api/rsvp', (req, res) => {
    const { name, attending, guests } = req.body;
    console.log(`Nueva confirmación recibida: ${name}, Asiste: ${attending}, Pase para: ${guests}`);
    // Aquí se podría guardar en una base de datos o enviar por email
    res.json({ success: true, message: 'Confirmación recibida exitosamente' });
});

// Todas las demás rutas sirven el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor listo en el puerto ${PORT}`);
})
