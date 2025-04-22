import mysql.connector
from datetime import date

from django.db.models.sql.constants import CURSOR

dataBase = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="471ProjServer",
    database="library_db"
)
cursor = dataBase.cursor()
'''patch_keys = """
SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE BORROW 
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (card_number, isbn);

ALTER TABLE HOLDS 
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (card_number, isbn);

ALTER TABLE OWNS 
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (isbn, branch_id);

SET FOREIGN_KEY_CHECKS = 1
"""

for stmt in filter(None, map(str.strip, patch_keys.split(";"))):
    cursor.execute(stmt)
print("primary keys patched")

# Allow NULL in BORROW.date_in changed in database_creator
cursor.execute("ALTER TABLE BORROW MODIFY COLUMN date_in DATE NULL")
# Set date_out to be a date not an int changed in database_creator
cursor.execute("ALTER TABLE BORROW MODIFY COLUMN date_out DATE NOT NULL")'''
# Add branches
branches = [
    (3, "Central Library", "123 Library St"),
    (2, "North Branch", "456 North St"),
    (1, "yes", "123street")  # Ensure branch_id=1 exists
]
cursor.executemany("INSERT INTO BRANCH (branch_id, branch_name, address) VALUES (%s, %s, %s)", branches)

# Add publishers
publisher = [
    ("Penguin Random House", "1745 Broadway, New York, NY 10019", 4567890),
    ("O'Reilly Media", "1005 Market St, San Francisco, CA 94103", 6543210)
]
cursor.executemany("INSERT INTO PUBLISHER (publisher_name, address, phone_number) VALUES (%s, %s, %s)", publisher)

# Add authors
default_author = ("0", "0", "0", "0", 0)
cursor.execute("INSERT INTO AUTHOR (author_f_name, author_l_name, biography, catalog, author_id) VALUES (%s, %s, %s, %s, %s)", default_author)
authors = [
    ("George", "Orwell", "English novelist", "Fiction"),
    ("Harper", "Lee", "American novelist", "Fiction")
]
author_id = []
for a in authors:
    cursor.execute("INSERT INTO AUTHOR (author_f_name, author_l_name, biography, catalog) VALUES (%s, %s, %s, %s)", a)
    author_id.append(cursor.lastrowid)


# Add books
    books = [
    (1001, "1984", "Dystopian", 1949),
    (1002, "To Kill a Mockingbird", "Southern Gothic", 1960)
]
cursor.executemany("INSERT INTO BOOK (isbn, title, genre, year_written) VALUES (%s, %s, %s, %s)", books)

# Add WROTE entries
cursor.executemany("INSERT INTO WROTE (isbn, author_id) VALUES (%s, %s)", [(1001, author_id[0]), (1002, author_id[1])])

# Add users
users = [
    ("Alice", "Smith", "1 Elm St", date(1990, 5, 14), "alice@example.com", 5551111),
    ("Bob", "Johnson", "99 Maple Ave", date(1985, 9, 2), "bob@example.com", 5552222),
    ("Carol", "Brown", "77 Oak Blvd", date(2005, 3, 23), "carol@example.com", 5553333)
]
cursor.executemany("INSERT INTO USER (f_name, l_name, address, dob, email, phonenum) VALUES (%s, %s, %s, %s, %s, %s)", users)

# Add members
members = [
    (0, 0, 1234, 5678, "alice@example.com"),
    (0, 0, 2345, 6789, "bob@example.com")
]
cursor.executemany("INSERT INTO MEMBER (checked_out_books, late_charges, card_number, pin, email) VALUES (%s, %s, %s, %s, %s)", members)

# Add employee
cursor.execute("INSERT INTO EMPLOYEE (authorization_level, password, salary, ssn, employee_num, email) VALUES (%s, %s, %s, %s, %s, %s)",
               (1, "secret", 50000, "11122333", 500, "carol@example.com"))


# Add ownership entries
own = [
    (1001, 2, 3, 2),
    (1002, 1, 2, 1)
]
cursor.executemany("INSERT INTO OWNS (isbn, num_availible, num_copies, branch_id) VALUES (%s, %s, %s, %s)", own)

# Add borrow record
cursor.execute("INSERT INTO BORROW (date_out, card_number, date_due, date_in, isbn) VALUES (%s, %s, %s, %s, %s)",
               (date(2024, 2, 1), 1234, date(2024, 2, 15), None, 1001))

# Add hold
cursor.execute("INSERT INTO HOLDS (queue_possition, isbn, card_number, hold_number, branch_id) VALUES (%s, %s, %s, %s, %s)",
               (1, 1002, 1234, 9001,1))

# Add order
cursor.execute("INSERT INTO ORDERS (isbn, num_copies, publisher, order_num, cost, branch_num, employee_num) VALUES (%s, %s, %s, %s, %s, %s, %s)",
               (1002, 5, "O'Reilly Media", 7001, 150, 1, 500))

# Finalize
cursor.close()
dataBase.commit()
dataBase.close()
print("Database seeded successfully.")
