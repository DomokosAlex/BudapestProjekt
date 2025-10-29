-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 28. 18:07
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `glicin`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ajanlas`
--

CREATE TABLE `ajanlas` (
  `id` int(11) NOT NULL,
  `kod` varchar(20) DEFAULT NULL,
  `szazalek` varchar(50) DEFAULT NULL,
  `tanacs` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `bmi` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdoiv`
--

CREATE TABLE `kerdoiv` (
  `id` int(11) NOT NULL,
  `halott` varchar(50) DEFAULT NULL,
  `haigenhonnan` varchar(50) DEFAULT NULL,
  `nemzetiseg` varchar(20) DEFAULT NULL,
  `orszag` varchar(20) DEFAULT NULL,
  `nem` varchar(20) DEFAULT NULL,
  `lakhely` varchar(20) DEFAULT NULL,
  `kor` varchar(20) DEFAULT NULL,
  `egeszsegallapot` varchar(50) DEFAULT NULL,
  `vegzettseg` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ajanlas`
--
ALTER TABLE `ajanlas`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kerdoiv`
--
ALTER TABLE `kerdoiv`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `ajanlas`
--
ALTER TABLE `ajanlas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kerdoiv`
--
ALTER TABLE `kerdoiv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
