const express = require('express');
const router = express.Router();
const { Church, Pastor, News, HelpRequest, ContactMessage, Contribution } = require('../models');

// ═══════════════ IGLESIAS Y PASTORES ═══════════════
router.get('/iglesias', async (req, res) => {
  try {
    const iglesias = await Church.findAll({ include: Pastor });
    res.json(iglesias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener iglesias' });
  }
});

// ═══════════════ NOTICIAS ═══════════════
router.get('/noticias', async (req, res) => {
  try {
    const noticias = await News.findAll({ order: [['publishedDate', 'DESC']] });
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// ═══════════════ FORMULARIOS ═══════════════
// Solicitud de Ayuda
router.post('/ayuda', async (req, res) => {
  try {
    const solicitud = await HelpRequest.create(req.body);
    res.status(201).json({ message: 'Solicitud enviada correctamente', data: solicitud });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar solicitud' });
  }
});

// Contribuciones / Voluntariado
router.post('/contribucion', async (req, res) => {
  try {
    const contribucion = await Contribution.create(req.body);
    res.status(201).json({ message: 'Contribución registrada correctamente', data: contribucion });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar contribución' });
  }
});

// Contacto General
router.post('/contacto', async (req, res) => {
  try {
    const mensaje = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Mensaje enviado correctamente', data: mensaje });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

module.exports = router;
