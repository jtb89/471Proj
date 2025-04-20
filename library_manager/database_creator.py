import mysql.connector

# Database parameters
dataBase = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="471ProjServer",
)

# Get cursor object
cursor = dataBase.cursor()

# Create database
cursor.execute("CREATE DATABASE IF NOT EXISTS library_db")
dataBase.close()

# Connect to the database
dataBase = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="471ProjServer",
    database="library_db"
)
# Get new cursor object
cursor = dataBase.cursor()

# Setup Tables

branch = """ 
CREATE TABLE IF NOT EXISTS BRANCH(
    branch_name VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY(branch_id)
) ENGINE=InnoDB; """
cursor.execute(branch)

author = """ 
CREATE TABLE IF NOT EXISTS AUTHOR(
    author_f_name VARCHAR(255) NOT NULL,
    author_l_name VARCHAR(255) NOT NULL,
    biography VARCHAR(255),
    catalog VARCHAR(255) NOT NULL,
    author_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(author_id)
) ENGINE=InnoDB; """
cursor.execute(author)

publisher = """ 
CREATE TABLE IF NOT EXISTS PUBLISHER(
    publisher_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number INT,
    PRIMARY KEY(publisher_name)
) ENGINE=InnoDB; """
cursor.execute(publisher)

# Updated BOOK table without author_id
book = """ 
CREATE TABLE IF NOT EXISTS BOOK(
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    year_written YEAR,
    isbn INT NOT NULL,
    PRIMARY KEY(isbn)
) ENGINE=InnoDB; """
cursor.execute(book)

# WROTE table links books to authors
wrote = """ 
CREATE TABLE IF NOT EXISTS WROTE(
    isbn INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY(isbn, author_id),
    CONSTRAINT fk_WROTE_BOOK
        FOREIGN KEY (isbn) REFERENCES BOOK(isbn)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_WROTE_AUTHOR
        FOREIGN KEY (author_id) REFERENCES AUTHOR(author_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(wrote)

user = """ 
CREATE TABLE IF NOT EXISTS USER(
    f_name VARCHAR(20) NOT NULL,
    l_name VARCHAR(20) NOT NULL,
    address VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(20) NOT NULL,
    phonenum INT NOT NULL,
    PRIMARY KEY(email)
) ENGINE=InnoDB; """
cursor.execute(user)

employee = """ 
CREATE TABLE IF NOT EXISTS EMPLOYEE(
    authorization_level INT NOT NULL,
    password VARCHAR(20) NOT NULL,
    salary INT NOT NULL,
    ssn VARCHAR(9) NOT NULL,
    employee_num INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(employee_num),
    CONSTRAINT fk_EMPLOYEE_USER
        FOREIGN KEY (email) REFERENCES USER(email)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(employee)

member = """ 
CREATE TABLE IF NOT EXISTS MEMBER(
    checked_out_books VARCHAR(255),
    late_charges INT NOT NULL,
    card_number INT NOT NULL,
    pin INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(card_number),
    CONSTRAINT fk_MEMBER_USER
        FOREIGN KEY (email) REFERENCES USER(email)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(member)

borrows = """ 
CREATE TABLE IF NOT EXISTS BORROW(
    date_out INT NOT NULL,
    card_number INT NOT NULL,
    date_due DATE NOT NULL,
    date_in DATE,
    isbn INT NOT NULL,
    PRIMARY KEY(card_number),
    CONSTRAINT fk_BORROW_MEMBER
        FOREIGN KEY (card_number) REFERENCES MEMBER(card_number)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_BORROW_BOOK
        FOREIGN KEY (isbn) REFERENCES BOOK(isbn)
        ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB; """
cursor.execute(borrows)

holds = """ 
CREATE TABLE IF NOT EXISTS HOLDS(
    queue_possition INT NOT NULL,
    isbn INT NOT NULL,
    card_number INT NOT NULL,
    hold_number INT NOT NULL,
    PRIMARY KEY(card_number),
    CONSTRAINT fk_HOLDS_MEMBER
        FOREIGN KEY (card_number) REFERENCES MEMBER(card_number)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_HOLDS_BOOK
        FOREIGN KEY (isbn) REFERENCES BOOK(isbn)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(holds)

orders = """ 
CREATE TABLE IF NOT EXISTS ORDERS(
    isbn INT NOT NULL,
    num_copies INT NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    order_num INT NOT NULL,
    cost INT NOT NULL,
    branch_num INT NOT NULL,
    employee_num INT NOT NULL,
    PRIMARY KEY(order_num),
    CONSTRAINT fk_ORDERS_BOOK
        FOREIGN KEY (isbn) REFERENCES BOOK(isbn)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_ORDERS_PUBLISHER
        FOREIGN KEY (publisher) REFERENCES PUBLISHER(publisher_name)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_ORDERS_EMPLOYEE
        FOREIGN KEY (employee_num) REFERENCES EMPLOYEE(employee_num)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_ORDERS_BRANCH
        FOREIGN KEY (branch_num) REFERENCES BRANCH(branch_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(orders)

owns = """ 
CREATE TABLE IF NOT EXISTS OWNS(
    isbn INT NOT NULL,
    num_availible INT NOT NULL,
    num_copies INT NOT NULL,
    branch_id INT NOT NULL,
    PRIMARY KEY(isbn),
    CONSTRAINT fk_OWNS_BOOK
        FOREIGN KEY (isbn) REFERENCES BOOK(isbn)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_OWNS_BRANCH
        FOREIGN KEY (branch_id) REFERENCES BRANCH(branch_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB; """
cursor.execute(owns)

# Close connection to database
dataBase.close()
