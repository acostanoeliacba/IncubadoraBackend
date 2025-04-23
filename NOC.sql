-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 24-04-2025 a las 01:31:44
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
-- Estructura de tabla para la tabla `Alumnos`
--

CREATE TABLE `Alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Alumnos`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asistencia`
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

CREATE TABLE `DocenteCurso` (
  `id_docente` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `DocenteCurso`:
--   `id_docente`
--       `Docentes` -> `id_docente`
--   `id_curso`
--       `Cursos` -> `id_curso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Docentes`
--

CREATE TABLE `Docentes` (
  `id_docente` int(11) NOT NULL,
  `docenteName` varchar(100) DEFAULT NULL,
  `docenteLastName` varchar(100) DEFAULT NULL,
  `docenteEspeciality` varchar(100) DEFAULT NULL,
  `docentePassword` varchar(150) NOT NULL,
  `docenteEmail` varchar(100) DEFAULT NULL,
  `docenteTelefone` bigint(11) DEFAULT NULL,
  `docenteDni` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Docentes`:
--

--
-- Volcado de datos para la tabla `Docentes`
--

INSERT INTO `Docentes` (`id_docente`, `docenteName`, `docenteLastName`, `docenteEspeciality`, `docentePassword`, `docenteEmail`, `docenteTelefone`, `docenteDni`) VALUES
(1, 'Juana', 'Castaño', 'Biologa', 'juanabsas2025', 'juana', 3114896324, 28654987),
(2, 'Juan', 'Castillo', 'Matematica', 'juan200py', 'Juan2000ag@gmail.com', 3114896555, 29698987);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empresas`
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

CREATE TABLE `Inscripciones` (
  `id_inscripcion` int(11) NOT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `fecha_inscripcion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Inscripciones`:
--   `id_alumno`
--       `Alumnos` -> `id_alumno`
--   `id_curso`
--       `Cursos` -> `id_curso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pagos`
--

CREATE TABLE `Pagos` (
  `id_pago` int(11) NOT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `Pagos`:
--   `id_alumno`
--       `Alumnos` -> `id_alumno`
--   `id_curso`
--       `Cursos` -> `id_curso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ProgramasCredito`
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Alumnos`
--
ALTER TABLE `Alumnos`
  ADD PRIMARY KEY (`id_alumno`);

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
  ADD PRIMARY KEY (`id_docente`,`id_curso`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Docentes`
--
ALTER TABLE `Docentes`
  ADD PRIMARY KEY (`id_docente`);

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
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_curso` (`id_curso`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Alumnos`
--
ALTER TABLE `Alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `Docentes`
--
ALTER TABLE `Docentes`
  MODIFY `id_docente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `DocenteCurso_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `Docentes` (`id_docente`),
  ADD CONSTRAINT `DocenteCurso_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`);

--
-- Filtros para la tabla `EntrenamientosLaborales`
--
ALTER TABLE `EntrenamientosLaborales`
  ADD CONSTRAINT `EntrenamientosLaborales_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `Empresas` (`id_empresa`);

--
-- Filtros para la tabla `Inscripciones`
--
ALTER TABLE `Inscripciones`
  ADD CONSTRAINT `Inscripciones_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumnos` (`id_alumno`),
  ADD CONSTRAINT `Inscripciones_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`);

--
-- Filtros para la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD CONSTRAINT `Pagos_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumnos` (`id_alumno`),
  ADD CONSTRAINT `Pagos_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `Cursos` (`id_curso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
