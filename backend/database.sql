-- Create database
CREATE DATABASE IF NOT EXISTS wasteconnect_db;
USE wasteconnect_db;

-- Create waste_requests table
CREATE TABLE IF NOT EXISTS waste_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    waste_type VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    location VARCHAR(500) NOT NULL,
    image VARCHAR(500),
    status VARCHAR(100) DEFAULT 'Pending Pickup',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO waste_requests (waste_type, quantity, location, status) VALUES
('Plastic Bottles', 25, 'Downtown Area', 'Pending Pickup'),
('Cardboard', 40, 'Industrial Zone', 'Pickup Accepted'),
('Electronic Waste', 15, 'Tech District', 'Processed'),
('Glass Containers', 30, 'Residential Area', 'Pending Pickup'),
('Metal Scrap', 20, 'Manufacturing Hub', 'Pickup Accepted');
