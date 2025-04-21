-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2025 at 08:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newlearn`
--

-- --------------------------------------------------------

--
-- Table structure for table `coursecategories`
--

CREATE TABLE `coursecategories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursecategories`
--

INSERT INTO `coursecategories` (`id`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(4, 'Backend', '2025-03-13 07:00:55', '2025-03-13 07:00:55'),
(5, 'Frontend ', '2025-03-13 07:01:07', '2025-03-13 07:01:07'),
(6, 'Ui/Ux', '2025-03-13 07:01:23', '2025-03-13 07:01:23');

-- --------------------------------------------------------

--
-- Table structure for table `coursechapters`
--

CREATE TABLE `coursechapters` (
  `id` int(11) NOT NULL,
  `chapterTitle` varchar(255) NOT NULL,
  `chapterDescription` text NOT NULL,
  `courseVideo` varchar(255) DEFAULT NULL,
  `chapterStatus` enum('published','unpublished') DEFAULT 'published',
  `chapterType` enum('free','premium') DEFAULT 'free',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursechapters`
--

INSERT INTO `coursechapters` (`id`, `chapterTitle`, `chapterDescription`, `courseVideo`, `chapterStatus`, `chapterType`, `createdAt`, `updatedAt`, `courseId`) VALUES
(1, 'Day 1 HTML Introduction', 'Description', 'uploads\\videos\\1741451432320Roblox 2023-08-31 13-01-50.mp4', 'published', 'free', '2025-03-08 16:30:32', '2025-03-08 16:30:32', NULL),
(2, 'css', 'hello welcome', 'uploads\\videos\\1741451904137Display Data By joining multiple tables in Visual Studio.mp4', 'published', 'premium', '2025-03-08 16:38:24', '2025-03-08 16:38:24', NULL),
(3, 'askjdfas', 'ASFASDF', 'uploads\\videos\\1741510638398Display Data By joining multiple tables in Visual Studio.mp4', 'published', 'free', '2025-03-09 08:57:18', '2025-03-09 08:57:18', NULL),
(4, 'week 1', 'Best ', 'uploads\\videos\\1741511404203Data and web development coursework - Microsoft Visual Studio 2025-03-05 11-56-22.mp4', 'published', 'free', '2025-03-09 09:10:04', '2025-03-09 09:10:04', NULL),
(5, 'week 1', 'JSAHJA', 'uploads\\videos\\1741512482491Roblox 2023-08-31 13-01-50.mp4', 'published', 'free', '2025-03-09 09:28:02', '2025-03-09 09:28:02', 7),
(6, 'WEEK 2', 'Learn html', 'uploads\\videos\\1741512860134Display Data By joining multiple tables in Visual Studio.mp4', 'published', 'free', '2025-03-09 09:34:20', '2025-03-09 09:34:20', 7),
(7, 'Lesson 1', 'html css ', 'uploads\\videos\\1741761122935Display Data By joining multiple tables in Visual Studio.mp4', 'published', 'free', '2025-03-12 06:32:03', '2025-03-12 06:32:03', 8),
(8, 'Chapter 1', 'node ', 'uploads\\videos\\1741849495734Data and web development coursework - Microsoft Visual Studio 2025-03-05 11-56-22.mp4', 'published', 'free', '2025-03-13 07:04:55', '2025-03-13 07:04:55', 9),
(9, 'week1', 'xdsds', 'uploads\\videos\\1741850438598Roblox 2023-08-31 13-01-50.mp4', 'published', 'free', '2025-03-13 07:20:39', '2025-03-13 07:20:39', 11),
(10, 'lesson 2 ', 'full course ', 'uploads\\videos\\1742114532971html-course-for-beginners-in-hindi--by-rahul-chaudhary---what-is-html.mp4', 'published', 'free', '2025-03-16 08:42:13', '2025-03-16 08:42:13', 8),
(11, 'Lesson 1', 'Full Video', 'uploads\\videos\\1742114877464learn-css-in-2-minutes.mp4', 'published', 'free', '2025-03-16 08:47:57', '2025-03-16 08:47:57', 10),
(12, 'new chapter ', 'good ', 'uploads\\videos\\1743058597479Data and web development coursework - Microsoft Visual Studio 2025-03-05 11-56-22.mp4', 'published', 'free', '2025-03-27 06:56:37', '2025-03-27 06:56:37', NULL),
(13, 'new chapter ', 'lesson 1', 'uploads\\videos\\1743058938201Data and web development coursework - Microsoft Visual Studio 2025-03-05 11-56-22.mp4', 'published', 'free', '2025-03-27 07:02:18', '2025-03-27 07:02:18', NULL),
(14, 'new premium ', '600', 'uploads\\videos\\1743261886300Data and web development coursework - Microsoft Visual Studio 2025-03-05 11-56-22.mp4', 'published', 'premium', '2025-03-29 15:24:46', '2025-03-29 15:24:46', 16),
(15, 'new premium course ', 'done ', 'uploads\\videos\\1743662167514Roblox 2023-08-31 13-01-50.mp4', 'published', 'premium', '2025-04-03 06:36:08', '2025-04-03 06:36:08', NULL),
(16, 'new premium course ', 'new chapter ', 'uploads\\videos\\1743662658240Roblox 2023-08-31 13-01-50.mp4', 'published', 'premium', '2025-04-03 06:44:18', '2025-04-03 06:44:18', 18),
(17, 'xampp1 ', 'lesson 1', 'uploads\\videos\\1744474518698Roblox 2023-08-31 13-01-50.mp4', 'published', 'premium', '2025-04-12 16:15:19', '2025-04-12 16:15:19', 19);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `coursePrice` varchar(255) NOT NULL,
  `courseImage` varchar(255) DEFAULT NULL,
  `courseDescription` text DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `courseCategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `courseName`, `coursePrice`, `courseImage`, `courseDescription`, `isVerified`, `createdAt`, `updatedAt`, `userId`, `courseCategoryId`) VALUES
(7, 'React ', '300', 'uploads\\images\\1741512405374OIP.jpg', 'Nice', 1, '2025-03-09 09:26:45', '2025-03-09 09:27:05', 12, NULL),
(8, 'Html ', '300', 'uploads\\images\\1741761034091OIP (1).jpg', 'Best Course', 1, '2025-03-12 06:30:34', '2025-03-12 06:31:08', 12, NULL),
(9, 'Node.js', '600', 'uploads\\images\\1741849374799node.jpg', 'Best Backend Course', 1, '2025-03-13 07:02:54', '2025-03-13 07:06:00', 12, 4),
(10, 'CSS', '200', 'uploads\\images\\1741849746147OIP (2).jpg', 'Frontend ', 1, '2025-03-13 07:09:06', '2025-03-13 07:09:39', 12, 5),
(11, 'Django ', '500', 'uploads\\images\\1741850380588OIP (3).jpg', 'jshadj', 1, '2025-03-13 07:19:40', '2025-03-13 07:20:01', 12, 4),
(16, 'premium Course', '800', 'uploads\\images\\1743261479424node.jpg', 'new course ', 1, '2025-03-29 15:17:59', '2025-03-29 15:18:49', 12, 5),
(18, 'new premium course', '400', 'uploads\\images\\1743662398044css.jpg', 'neww ', 1, '2025-04-03 06:39:58', '2025-04-03 06:40:43', 12, 5),
(19, 'Xampp ', '200', 'uploads\\images\\1744474412076css.jpg', 'safsdfsdf', 1, '2025-04-12 16:13:32', '2025-04-12 16:14:19', 12, 5);

-- --------------------------------------------------------

--
-- Table structure for table `enrolls`
--

CREATE TABLE `enrolls` (
  `id` int(11) NOT NULL,
  `enrollDate` varchar(255) NOT NULL,
  `paymentStatus` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolls`
--

INSERT INTO `enrolls` (`id`, `enrollDate`, `paymentStatus`, `createdAt`, `updatedAt`, `userId`, `courseId`) VALUES
(1, '1741509219458', NULL, '2025-03-09 08:33:39', '2025-03-09 08:33:39', 12, NULL),
(2, '1743261950961', NULL, '2025-03-29 15:25:50', '2025-03-29 15:25:50', 12, 16),
(3, '1743262163446', NULL, '2025-03-29 15:29:23', '2025-03-29 15:29:23', 6, 16),
(4, '1743662672217', NULL, '2025-04-03 06:44:32', '2025-04-03 06:44:32', 6, 18);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `enrollId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  `googlePhoto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `photoUrl`, `googlePhoto`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, NULL, NULL, '2025-02-22 10:58:33', '2025-02-22 10:58:33', 6),
(2, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLM1zeCw-Xx2mgRYp6YIxKbMaaWVN9pSMPdR2Xe78CzD_L4yXPQ=s96-c', '2025-02-23 05:45:45', '2025-02-23 05:45:45', 8),
(3, NULL, NULL, '2025-03-06 07:37:07', '2025-03-06 07:37:07', 10),
(4, NULL, 'https://lh3.googleusercontent.com/a/ACg8ocK0B9Qx6I4C-jVHb5W9jP0FX46tJ4juSE5m1LZk2diavGiKpA=s96-c', '2025-03-09 08:27:02', '2025-03-09 08:27:02', 14);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otpGeneratedTime` varchar(255) DEFAULT NULL,
  `role` enum('user','admin','teacher') DEFAULT 'user',
  `googleId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstName`, `lastName`, `password`, `otp`, `otpGeneratedTime`, `role`, `googleId`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@gmail.com', 'admin', 'admin', '$2b$10$0iwedW84v3dkldHCPlkoWeclscNmIZvxQbR6M6juxTYVfUGzef8Zy', NULL, NULL, 'admin', NULL, '2025-02-22 10:40:52', '2025-02-22 10:40:52'),
(6, 'student@gmail.com', 'subashish', 'khanal', '$2b$08$nKG5XfkVxxSQTIO.4PWnHOWBiUg4MbjpsI50yX7xiXV6KYoL9ubeq', NULL, NULL, 'user', NULL, '2025-02-22 10:58:33', '2025-02-22 10:58:33'),
(8, 'subashishkhanal@gmail.com', 'suvasies', 'xyz', NULL, NULL, NULL, 'user', '102281039251403974671', '2025-02-23 05:45:45', '2025-02-23 05:45:45'),
(10, 'priyansu@gmail.com', 'priyansu', 'hahahah', '$2b$08$DhskGNw8AlzwBU.TrLtkCOXO2PBaG7Jt8vC/h.2yPiBLgbynlZgxe', NULL, NULL, 'user', NULL, '2025-03-06 07:37:07', '2025-03-06 07:37:07'),
(12, 'teacher@gmail.com', 'teacher', 'teacher', '$2b$08$Li6qmLB21EYc8r7XqZG97eyFtMKvreb.ryh.wsQF1x.2.0pCYuwpO', NULL, NULL, 'teacher', NULL, '2025-03-06 07:43:12', '2025-03-06 07:43:12'),
(14, 'np05cp4a220124@iic.edu.np', 'SUBASHISH', 'KHANAL', NULL, NULL, NULL, 'user', '107466990779168235078', '2025-03-09 08:27:02', '2025-03-09 08:27:02');

-- --------------------------------------------------------

--
-- Table structure for table `videoprogresses`
--

CREATE TABLE `videoprogresses` (
  `id` int(11) NOT NULL,
  `currentTime` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseChapterId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coursecategories`
--
ALTER TABLE `coursecategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coursechapters`
--
ALTER TABLE `coursechapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `courseCategoryId` (`courseCategoryId`);

--
-- Indexes for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enrollId` (`enrollId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videoprogresses`
--
ALTER TABLE `videoprogresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseChapterId` (`courseChapterId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coursecategories`
--
ALTER TABLE `coursecategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `coursechapters`
--
ALTER TABLE `coursechapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `enrolls`
--
ALTER TABLE `enrolls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `videoprogresses`
--
ALTER TABLE `videoprogresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coursechapters`
--
ALTER TABLE `coursechapters`
  ADD CONSTRAINT `coursechapters_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`courseCategoryId`) REFERENCES `coursecategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `enrolls`
--
ALTER TABLE `enrolls`
  ADD CONSTRAINT `enrolls_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `enrolls_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`enrollId`) REFERENCES `enrolls` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `videoprogresses`
--
ALTER TABLE `videoprogresses`
  ADD CONSTRAINT `videoprogresses_ibfk_1` FOREIGN KEY (`courseChapterId`) REFERENCES `coursechapters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `videoprogresses_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
