-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 29. 23:13
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
  `kod` varchar(255) DEFAULT NULL,
  `szazalek` varchar(255) DEFAULT NULL,
  `tanacs` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `bmi` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ajanlas`
--

INSERT INTO `ajanlas` (`id`, `kod`, `szazalek`, `tanacs`, `status`, `bmi`) VALUES
(1, 'b958', '0', 'Növeld a kollagénben gazdag ételek (csontlé, bőr, zselatin) fogyasztását.,Próbálj 5–10 g napi glicint vagy kollagénport 1–2 hétig, és figyeld a változásokat.,Alacsony testsúly: növeld a kalória- és fehérjebevitelt.', 'Glicin/kollagén bevitel valószínű hiányos', '16.5');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdoiv`
--

CREATE TABLE `kerdoiv` (
  `id` int(11) NOT NULL,
  `halott` varchar(255) DEFAULT NULL,
  `haigenhonnan` varchar(255) DEFAULT NULL,
  `nemzetiseg` varchar(255) DEFAULT NULL,
  `orszag` varchar(255) DEFAULT NULL,
  `nem` varchar(255) DEFAULT NULL,
  `lakhely` varchar(255) DEFAULT NULL,
  `kor` varchar(255) DEFAULT NULL,
  `egeszsegallapot` varchar(255) DEFAULT NULL,
  `vegzettseg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kerdoiv`
--

INSERT INTO `kerdoiv` (`id`, `halott`, `haigenhonnan`, `nemzetiseg`, `orszag`, `nem`, `lakhely`, `kor`, `egeszsegallapot`, `vegzettseg`) VALUES
(2, 'Igen, és tudom, mire való', 'Orvostól, dietetikustól', 'Szomszédos ország', 'Szomszédos ország', 'Férfi', 'Nagyváros / városközpont', '18–25 év', 'Jó', 'Középiskola / érettségi'),
(3, 'Igen, és tudom, mire való', 'Egyéb / nem tudom', 'Szomszédos ország', 'Szomszédos ország', 'Nem szeretném megadni', 'Nagyváros / városközpont', '18–25 év', 'Közepes', 'Felsőfokú szakképzés'),
(4, 'Igen, de nem tudom pontosan', 'Közösségi médiából / fórumokról', 'Magyar', 'Magyarország', 'Férfi', 'Nagyváros / városközpont', '18–25 év', 'Rossz', 'Felsőfokú szakképzés');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `kerdoiv`
--
ALTER TABLE `kerdoiv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
