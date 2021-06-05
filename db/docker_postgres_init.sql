-- Create Tables
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  slug VARCHAR(50),
  description VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  category_id INT,
  title VARCHAR(50),
  description VARCHAR(500),
  calories NUMERIC(10, 0),
  price NUMERIC(10, 0),
  stock NUMERIC(10, 0),
  disabling BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories
);

CREATE TABLE waiters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  age INT NOT NULL,
  email VARCHAR(250),
  address VARCHAR(500)
);

CREATE TABLE order_status (
  id SERIAL PRIMARY KEY,
  status VARCHAR(10) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  table_number INT NOT NULL,
  price INT NOT NULL,
  discount INT,
  final_price INT NOT NULL,
  comment VARCHAR(250),
  waiter_id INT,
  order_status_id INT DEFAULT 1,
  ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  food_ready_at TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_status_id) REFERENCES order_status,
  FOREIGN KEY (waiter_id) REFERENCES waiters
);

CREATE TABLE ordered_items (
  id SERIAL PRIMARY KEY,
  order_id INT,
  menu_item_id INT,
  item_count INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items
);

CREATE TABLE order_payments (
  id SERIAL PRIMARY KEY,
  order_id INT,
  payment_intent_id VARCHAR(50),
  payment_intent_status VARCHAR(10),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders
);

CREATE TABLE allergies (
  id SERIAL PRIMARY KEY,
  menu_item_id INT,
  name VARCHAR(200),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items
);

-- Insert Data
INSERT INTO categories (name, slug, description)
  VALUES ('Starter', 'starter', 'A starter is...'),
    ('Main', 'main', 'A main is...'),
    ('Desert', 'desert', 'A desert is...');

-- Recipies from: https://www.tasteofhome.com/collection/mexican-foods-take/
INSERT INTO menu_items (category_id, title, description, calories, price, stock)
  VALUES (2, 'Grilled Onion & Skirt Steak Tacos', 'I grew up watching my grandmother and mother in the kitchen. My grandparents came from Mexico, and this steak marinated in beer and lime juice honors their passion for cooking. It’s a must in my house when we’re craving traditional Mexican food. —Adan Franco, Milwaukee, Wisconsin', 288, 1299, 100),
    (3, 'Horchata', 'In this Horchata recipe, the mixture of ground rice and almonds is accented with a hint of lime. Depending on your preference, you can use more or less water for a thinner or creamier beverage. —James Schend, Pleasant Prairie, Wisconsin', 134, 499, 100),
    (2, 'Carnitas Huevos Rancheros', 'When I was in college, I was a church counselor in Colorado and had my first taste of Mexican food. Recently, I''ve learned to make more authentic dishes, like these pork huevos rancheros. It''s one of my favorite recipes to serve for dinner with eggs. —Lonnie Hartstack, Clarinda, Iowa', 509, 1399, 100),
    (3, 'Homemade Churros', 'A Mexican cuisine favorite has to be churros. These cinnamon-sugar dusted fried fritters are best served warm. Serve them the traditional way with chocolate dipping sauce or dunk them into coffee. —Taste of Home Test Kitchen', 112, 799, 100),
    (1, 'Instant Pot Black Beans', 'Instant Pot black beans are the key to a lot of my family''s meals, whether it''s for a weekend breakfast or taco salads and burritos throughout the week. I''ve been trying for years to find a homemade recipe as creamy and tasty as Mexican restaurant beans. This is that recipe. —Helen Nelander, Boulder Creek, California', 203, 999, 100),
    (1, 'Chicken Tamales', 'I love making these homemade tamales. They take a little time to make but are so worth the effort. I usually make them for Christmas, which is traditional in many Mexican families. —Cindy Pruitt, Grove, Oklahoma', 564, 699, 100),
    (2, 'Mole Poblano', 'You''ll love this rich, thick mole sauce with it''s authentic flavor. The result is well worth the prep. mdash; Taste of Home Test Kitchen, Milwaukee, Wisconsin', 184, 999, 100),
    (2, 'Slow-Cooker Barbacoa', 'My husband adores authentic Mexican food and this beef roast simmered in lime juice, chipotle and cumin fits the bill. He would eat it one a week if I would make it that often! We have it over rice with cilantro and a spritz of lime. —Aundrea McCormick, Denver, Colorado', 513, 1599, 100),
    (3, 'Classic Tres Leches Cake', 'Tres leches means "three milks." This cake gets its name because it uses three kinds of milk—evaporated, condensed and cream. This cake''s light and airy texture has made it a classic in Mexican kitchens for generations. —Taste of Home Test Kitchen', 392, 599, 100);

INSERT INTO waiters (name, age, email, address)
  VALUES ('John', 22, 'john@live.rhul.ac.uk', 'RHUL, Egham Hill, Egham TW20 0EX'),
    ('Kate', 27, 'kate@live.rhul.ac.uk', 'RHUL, Egham Hill, Egham TW20 0EX'),
    ('Mark', 19, 'mark@live.rhul.ac.uk', 'RHUL, Egham Hill, Egham TW20 0EX');

INSERT INTO order_status (status)
  VALUES ('Ordered'),
    ('Prepared'),
    ('Delivered'),
    ('Cancelled');

INSERT INTO orders (table_number, price, discount, final_price, comment, waiter_id, order_status_id)
  VALUES (18, 4196, 0, 4196, 'This is a test order', 1, 1),
    (22, 2897, 0, 2897, 'This is a test order', 1, 2),
    (12, 2897, 0, 2897, 'This is a test order', 2, 2);

INSERT INTO ordered_items(order_id, menu_item_id, item_count)
  VALUES (1, 1, 1),
    (1, 2, 3),
    (1, 4, 1),
    (1, 8, 1),
    (2, 2, 2),
    (2, 3, 4),
    (2, 5, 7);

INSERT INTO order_payments(order_id, payment_intent_id, payment_intent_status)
  VALUES (1, 'pi_1IQfkPGFZKvUnuw293LNfUnd', 'succeeded');

INSERT INTO allergies (menu_item_id, name)
VALUES 
  (1, 'Wheat'),
  (1, 'Soy'),
  (1, 'Coriander'),
  (2, 'Milk'),
  (2, 'Nuts'),
  (3, 'Eggs'),
  (4, 'Milk'),
  (4, 'Nut'),
  (4, 'Soy'),
  (5, 'Soy'),
  (6, 'Coriander'),
  (8, 'Coriander'),
  (9, 'Eggs'),
  (9, 'Milk');
