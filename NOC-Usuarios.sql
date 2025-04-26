-- Servidor: localhost:3307
-- Tiempo de generación: 27-04-2025 a las 00:00:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `NOC`
--
CREATE DATABASE IF NOT EXISTS `NOC` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `NOC`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asistencia`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `Asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_inscripcion` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` enum('presente','ausente','justificado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Asistencia`:
--   `id_inscripcion`
--       `Inscripciones` -> `id_inscripcion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CondicionesAprobacion`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `CondicionesAprobacion` (
  `id_condicion` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `asistencia_minima` int(11) DEFAULT NULL,
  `nota_minima` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `CondicionesAprobacion`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CursoCredito`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `CursoCredito` (
  `id_curso` int(11) NOT NULL,
  `id_programa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `CursoCredito`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_programa`
--       `ProgramasCredito` -> `id_programa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cursos`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `Cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `tipo` enum('gratuito','arancelado','capacitacion','entrenamiento') DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Cursos`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DocenteCurso`
--
-- Creación: 26-04-2025 a las 21:59:39
--

CREATE TABLE `DocenteCurso` (
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `DocenteCurso`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empresas`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `Empresas` (
  `id_empresa` int(11) NOT NULL,
  `nombre_empresa` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `contacto_nombre` varchar(100) DEFAULT NULL,
  `contacto_email` varchar(100) DEFAULT NULL,
  `contacto_telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Empresas`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EntrenamientosLaborales`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `EntrenamientosLaborales` (
  `id_entrenamiento` int(11) NOT NULL,
  `nombre_entrenamiento` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `empresa_id` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `EntrenamientosLaborales`:
--   `empresa_id`
--       `Empresas` -> `id_empresa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Inscripciones`
--
-- Creación: 26-04-2025 a las 21:59:12
--

CREATE TABLE `Inscripciones` (
  `id_inscripcion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `fecha_inscripcion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Inscripciones`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pagos`
--
-- Creación: 26-04-2025 a las 21:59:12
--

CREATE TABLE `Pagos` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Pagos`:
--   `id_curso`
--       `Cursos` -> `id_curso`
--   `id_usuario`
--       `Usuarios` -> `id_usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ProgramasCredito`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `ProgramasCredito` (
  `id_programa` int(11) NOT NULL,
  `nombre_programa` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tasa_interes` decimal(5,2) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `requisitos` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `ProgramasCredito`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Publicaciones`
--
-- Creación: 23-04-2025 a las 02:52:59
--

CREATE TABLE `Publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `tipo` enum('curso','capacitacion','entrenamiento') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Publicaciones`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--
-- Creación: 26-04-2025 a las 21:50:54
--

CREATE TABLE `Usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `tipo_usuario` enum('alumno','docente') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Usuarios`:
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_inscripcion` (`id_inscripcion`);

--
-- Indices de la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  ADD PRIMARY KEY (`id_condicion`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `CursoCredito`
--
ALTER TABLE `CursoCredito`
  ADD PRIMARY KEY (`id_curso`,`id_programa`),
  ADD KEY `id_programa` (`id_programa`);

--
-- Indices de la tabla `Cursos`
--
ALTER TABLE `Cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `DocenteCurso`
--
ALTER TABLE `DocenteCurso`
  ADD PRIMARY KEY (`id_usuario`,`id_curso`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  ADD PRIMARY KEY (`id_entrenamiento`),
  ADD KEY `empresa_id` (`empresa_id`);

--
-- Indices de la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  ADD PRIMARY KEY (`id_inscripcion`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `ProgramasCredito`
--
ALTER TABLE `ProgramasCredito`
  ADD PRIMARY KEY (`id_programa`);

--
-- Indices de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  ADD PRIMARY KEY (`id_publicacion`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  MODIFY `id_condicion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Cursos`
--
ALTER TABLE `Cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Empresas`
--
ALTER TABLE `Empresas`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  MODIFY `id_entrenamiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  MODIFY `id_inscripcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ProgramasCredito`
--
ALTER TABLE `ProgramasCredito`
  MODIFY `id_programa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Publicaciones`
--
ALTER TABLE `Publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Asistencia`
--
ALTER TABLE `Asistencia`
  ADD CONSTRAINT `Asistencia_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `Inscripciones` (`id_inscripcion`);

--
-- Filtros para la tabla `CondicionesAprobacion`
--
ALTER TABLE `CondicionesAprobacion`
  ADD CONSTRAINT `CondicionesAprobacion_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`);

--
-- Filtros para la tabla `CursoCredito`
--
ALTER TABLE `CursoCredito`
  ADD CONSTRAINT `CursoCredito_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `CursoCredito_ibfk_2` FOREIGN KEY (`id_programa`) REFERENCES `ProgramasCredito` (`id_programa`);

--
-- Filtros para la tabla `DocenteCurso`
--
ALTER TABLE `DocenteCurso`
  ADD CONSTRAINT `DocenteCurso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `DocenteCurso_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);

--
-- Filtros para la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  ADD CONSTRAINT `EntrenamientosLaborales_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `Empresas` (`id_empresa`);

--
-- Filtros para la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  ADD CONSTRAINT `Inscripciones_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `Inscripciones_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);

--
-- Filtros para la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD CONSTRAINT `Pagos_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`),
  ADD CONSTRAINT `Pagos_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
