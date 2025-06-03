'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Contenido', [
      // Módulo 1
      {
        id_curso: 1,
        modulo: 'Módulo 1',
        nombre: 'Introducción a la Carpintería',
        tipo: 'pdf',
        url: 'https://example.com/carpinteria/intro.pdf',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 2,
        modulo: 'Módulo 1',
        nombre: 'Fundamentos del Diseño Gráfico',
        tipo: 'canva',
        url: 'https://canva.com/diseno/modulo1',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 3,
        modulo: 'Módulo 1',
        nombre: 'Conceptos básicos de Informática',
        tipo: 'docx',
        url: 'https://example.com/informatica/basico.docx',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 4,
        modulo: 'Módulo 1',
        nombre: 'Motores y su funcionamiento',
        tipo: 'mp4',
        url: 'https://example.com/mecanica/motor.mp4',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 5,
        modulo: 'Módulo 1',
        nombre: 'Primeros pasos en Oratoria',
        tipo: 'pptx',
        url: 'https://example.com/oratoria/pasos.pptx',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 6,
        modulo: 'Módulo 1',
        nombre: 'Introducción al color y forma',
        tipo: 'jpg',
        url: 'https://example.com/pintura/color.jpg',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 7,
        modulo: 'Módulo 1',
        nombre: 'Qué es la Administración',
        tipo: 'pdf',
        url: 'https://example.com/administracion/intro.pdf',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 8,
        modulo: 'Módulo 1',
        nombre: 'Trazos básicos en caligrafía',
        tipo: 'svg',
        url: 'https://example.com/caligrafia/trazos.svg',
        fecha_publicacion: '2025-06-01'
      },
      {
        id_curso: 9,
        modulo: 'Módulo 1',
        nombre: 'Cuidados esenciales para uñas',
        tipo: 'mp4',
        url: 'https://example.com/manicuria/cuidados.mp4',
        fecha_publicacion: '2025-06-01'
      },

      // Módulo 2
      {
        id_curso: 1,
        modulo: 'Módulo 2',
        nombre: 'Herramientas Manuales y Seguridad',
        tipo: 'pdf',
        url: 'https://example.com/carpinteria/herramientas.pdf',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 2,
        modulo: 'Módulo 2',
        nombre: 'Diseño para medios digitales',
        tipo: 'canva',
        url: 'https://canva.com/diseno/modulo2',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 3,
        modulo: 'Módulo 2',
        nombre: 'Procesadores de texto',
        tipo: 'docx',
        url: 'https://example.com/informatica/procesadores.docx',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 4,
        modulo: 'Módulo 2',
        nombre: 'Sistema de Frenos',
        tipo: 'mp4',
        url: 'https://example.com/mecanica/frenos.mp4',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 5,
        modulo: 'Módulo 2',
        nombre: 'Control del lenguaje corporal',
        tipo: 'pptx',
        url: 'https://example.com/oratoria/corporal.pptx',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 6,
        modulo: 'Módulo 2',
        nombre: 'Técnicas con acrílico',
        tipo: 'jpg',
        url: 'https://example.com/pintura/acrilico.jpg',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 7,
        modulo: 'Módulo 2',
        nombre: 'Planificación estratégica',
        tipo: 'pdf',
        url: 'https://example.com/administracion/planificacion.pdf',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 8,
        modulo: 'Módulo 2',
        nombre: 'Estilos modernos de caligrafía',
        tipo: 'svg',
        url: 'https://example.com/caligrafia/estilos.svg',
        fecha_publicacion: '2025-06-08'
      },
      {
        id_curso: 9,
        modulo: 'Módulo 2',
        nombre: 'Esmaltado semipermanente',
        tipo: 'mp4',
        url: 'https://example.com/manicuria/esmaltado.mp4',
        fecha_publicacion: '2025-06-08'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contenido', {
      modulo: {
        [Sequelize.Op.in]: ['Módulo 1', 'Módulo 2']
      }
    }, {});
  }
};
