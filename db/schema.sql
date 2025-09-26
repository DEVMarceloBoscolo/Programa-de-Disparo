
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(50),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE contacts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  fields JSON,
  tags VARCHAR(512),
  status VARCHAR(50),
  consent_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_email (email)
);
CREATE TABLE campaigns (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  subject VARCHAR(255),
  body_html TEXT,
  body_text TEXT,
  sender_id BIGINT,
  status VARCHAR(50),
  scheduled_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE campaign_recipients (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  campaign_id BIGINT,
  contact_id BIGINT,
  status_sent VARCHAR(50),
  sent_at DATETIME,
  delivered_at DATETIME,
  opened_at DATETIME,
  clicked_at DATETIME,
  bounced_at DATETIME
);
CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  campaign_id BIGINT,
  contact_id BIGINT,
  event_type VARCHAR(50),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE attachments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  campaign_id BIGINT,
  filename VARCHAR(512),
  storage_path VARCHAR(1024),
  content_type VARCHAR(255)
);
CREATE TABLE unsubscribes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  contact_id BIGINT,
  campaign_id BIGINT,
  reason VARCHAR(512),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
