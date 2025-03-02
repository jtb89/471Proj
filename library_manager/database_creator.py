import mysql.connector

# Connect to database
dataBase = mysql.connector.connect(
    host = "localhost",
    user = "root",
    passwd = "471ProjServer",
    database = "library_db"
)

# Get cursor object
cursor = dataBase.cursor()

# Create database
cursor.execute("CREATE DATABASE IF NOT EXISTS library_db")

# Get new cursor object
cursor = dataBase.cursor()
dataBase.cursor()
# Setup Tables
branch = """ CREATE TABLE IF NOT EXISTS BRANCH(
    BRANCH_NAME VARCHAR(255) NOT NULL,
    BRANCH_ID INT NOT NULL,
    ADDRESS VARCHAR(255) NOT NULL
    )"""
cursor.execute(branch)

author = """ CREATE TABLE IF NOT EXISTS AUTHOR(
    AUTHOR_F_NAME VARCHAR(255) NOT NULL,
    AUTHOR_L_NAME VARCHAR(255) NOT NULL,
    BIOGRAPHY VARCHAR(255),
    CATALOG VARCHAR(255) NOT NULL,
    AUTHOR_ID INT NOT NULL
    )"""
cursor.execute(author)

publisher = """ CREATE TABLE IF NOT EXISTS PUBLISHER(
    PUBLISHER_NAME VARCHAR(255) NOT NULL,
    ADDRESS VARCHAR(255) NOT NULL,
    PHONE_NUMBER INT
)"""
cursor.execute(publisher)

book = """ CREATE TABLE IF NOT EXISTS BOOK(
    TITLE VARCHAR(255) NOT NULL,
    GENRE VARCHAR(255) NOT NULL,
    YEAR_WWRITTEN YEAR,
    ISBN INT NOT NULL
)"""
cursor.execute(book)

wrote = """ CREATE TABLE IF NOT EXISTS WROTE(
    ISBN INT NOT NULL,
    AUTHOR_ID INT NOT NULL
)"""
cursor.execute(wrote)


user = """ CREATE TABLE IF NOT EXISTS USER(
    F_NAME VARCHAR(20) NOT NULL,
    L_NAME VARCHAR(20) NOT NULL,
    ADDRESS VARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    EMAIL VARCHAR(20) NOT NULL,
    PHONENUM INT NOT NULL
)"""
cursor.execute(user)

employee = """ CREATE TABLE IF NOT EXISTS EMPLOYEE(
    AUTHORIZATION_LEVEL INT NOT NULL,
    PASSWORD VARCHAR(20) NOT NULL,
    SALARY INT NOT NULL,
    SSN VARCHAR(9) NOT NULL,
    EMPLOYEE_NUMBER INT NOT NULL,
    EMAIL VARCHAR(255) NOT NULL
)"""
cursor.execute(employee)

member = """CREATE TABLE IF NOT EXISTS MEMBER(
    CHECKED_OUT_BOOKS VARCHAR(255),
    LATE_CHARGES INT NOT NULL,
    CARD_NUMBER INT NOT NULL,
    PIN INT NOT NULL,
    EMAIL VARCHAR(255) NOT NULL
)"""
cursor.execute(member)

borrows = """ CREATE TABLE IF NOT EXISTS BORROW(
    DATE_OUT INT NOT NULL,
    CARD_NUMBER INT NOT NULL,
    DATE_DUE DATE NOT NULL,
    DATE_IN DATE NOT NULL,
    ISBN INT NOT NULL
)"""
cursor.execute(borrows)

holds = """ CREATE TABLE IF NOT EXISTS HOLDS(
    QUEUE_POSITION INT NOT NULL,
    ISBN INT NOT NULL,
    CARD_NUMBER INT NOT NULL,
    HOLD_NUMBER INT NOT NULL
)"""
cursor.execute(holds)

orders = """ CREATE TABLE IF NOT EXISTS ORDERS(
    ISBN INT NOT NULL,
    NUMBER_COPIES INT NOT NULL,
    PUBLISHER VARCHAR(255) NOT NULL,
    ORDER_NUMBER INT NOT NULL,
    COST INT NOT NULL
)"""
cursor.execute(orders)

owns = """ CREATE TABLE IF NOT EXISTS OWNS(
    ISBN INT NOT NULL,
    NUMBER_AVAILABLE INT NOT NULL,
    NUMBER_COPIES INT NOT NULL,
    BRANCH_ID INT NOT NULL
)"""
cursor.execute(owns)

# Close connection to database
dataBase.close()