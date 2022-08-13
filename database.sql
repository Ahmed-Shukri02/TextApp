CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_profile(
  user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(20) NOT NULL,
  user_pfp VARCHAR(200),
  stock_pfp INT NOT NULL DEFAULT floor(random() * (30 + 1)),
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  followers BIGINT NOT NULL DEFAULT 0,
  bg_theme VARCHAR(200),
  bg_image VARCHAR(200),
  is_set_up BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_posts (
  post_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_author_id uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  post_text VARCHAR(500),
  post_media VARCHAR(200),
  post_likes INT NOT NULL DEFAULT 0,
  post_replies INT NOT NULL DEFAULT 0,
  post_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_replies(
  reply_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  foreign_post_id uuid NOT NULL REFERENCES user_posts(post_id)
  ON DELETE CASCADE,
  reply_author_id uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  reply_text VARCHAR(500) NOT NULL,
  reply_likes INT NOT NULL DEFAULT 0,
  reply_replies INT NOT NULL DEFAULT 0,
  reply_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_subreplies(
  subreply_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  foreign_reply_id uuid NOT NULL REFERENCES post_replies(reply_id)
  ON DELETE CASCADE,
  subreply_author_id uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  reference_type VARCHAR(20) NOT NULL,
  subreply_reference_id uuid REFERENCES post_subreplies(subreply_id) ON DELETE CASCADE,
  subreply_text VARCHAR(500) NOT NULL,
  subreply_likes INT NOT NULL DEFAULT 0,
  subreply_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_images(
  image_post_id uuid NOT NULL PRIMARY KEY REFERENCES user_posts(post_id)
  ON DELETE CASCADE,
  images_url VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS all_post_likes(
  liker uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  liked_post_id uuid REFERENCES user_posts(post_id) 
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS all_reply_likes(
  liker uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  liked_reply_id uuid REFERENCES post_replies(reply_id)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS all_subreply_likes(
  liker uuid NOT NULL REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  liked_subreply_id uuid REFERENCES post_subreplies(subreply_id)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins(
  admin_id uuid NOT NULL PRIMARY KEY REFERENCES user_profile(user_id)
  ON DELETE CASCADE,
  can_delete_posts BOOLEAN NOT NULL
);

CREATE TABLE oauth_google(
  google_id VARCHAR(500) NOT NULL PRIMARY KEY,
  google_user_id uuid NOT NULL REFERENCES user_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE oauth_facebook(
  facebook_id VARCHAR(500) NOT NULL PRIMARY KEY,
  facebook_user_id uuid NOT NULL REFERENCES user_profile(user_id) ON DELETE CASCADE
);

CREATE TABLE oauth_linkedin(
  linkedin_id VARCHAR(500) NOT NULL PRIMARY KEY,
  linkedin_user_id uuid NOT NULL REFERENCES user_profile(user_id) ON DELETE CASCADE
);