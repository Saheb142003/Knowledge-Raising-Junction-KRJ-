CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE users (
    -- PRIMARY KEY
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- BASIC ACCOUNT INFO
    email               VARCHAR(255) UNIQUE NOT NULL,
    phone               VARCHAR(20) UNIQUE,
    username            VARCHAR(50) UNIQUE,

    password_hash       TEXT NOT NULL,
    profile_image       TEXT,


    teacher_id          INT,  -- FK if role = TEACHER
    student_id          INT,  -- FK if role = STUDENT

    -- ROLE & PERMISSIONS
    role VARCHAR(20) NOT NULL CHECK 
        (role IN ('student', 'teacher')),
    permissions         JSONB DEFAULT '[]'::jsonb,

    -- ACCOUNT STATUS
    is_active           BOOLEAN DEFAULT TRUE,
    is_verified         BOOLEAN DEFAULT FALSE,
    deleted_at          TIMESTAMP,


    -- SECURITY METADATA
    last_login          TIMESTAMP,
    login_attempts      INT DEFAULT 0,
    lock_until          TIMESTAMP,

    last_password_change TIMESTAMP,

    -- PASSWORD RESET / OTP / MFA
    reset_token         TEXT,
    reset_token_expiry  TIMESTAMP,

    otp_code            VARCHAR(10),
    otp_expiry          TIMESTAMP,

    two_factor_enabled  BOOLEAN DEFAULT FALSE,
    two_factor_secret   TEXT,

    -- AUDIT FIELDS
    created_by          UUID,
    updated_by          UUID,

    -- TIMESTAMPS
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();


CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_users_phone ON users(phone);
CREATE UNIQUE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_permissions ON users USING GIN (permissions);
