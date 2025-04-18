import mysql.connector

def add_member(f_name, l_name, address, dob, email, phonenum, checked_out_books, late_charges, card_number, pin):
    try:
        # Connect to the database
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        # Insert the USER record
        insert_user = """
            INSERT INTO USER (f_name, l_name, address, dob, email, phonenum)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_user, (f_name, l_name, address, dob, email, phonenum))

        # Insert the MEMBER record
        insert_member = """
            INSERT INTO MEMBER (checked_out_books, late_charges, card_number, pin, email)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_member, (checked_out_books, late_charges, card_number, pin, email))

        # Commit the changes
        dataBase.commit()

        return "Member added successfully."

    except mysql.connector.Error as err:
        # Roll back if there is an error
        dataBase.rollback()
        return f"Error: {err}"

    finally:
        # Make sure to close the connection
        cursor.close()
        dataBase.close()

def delete_user_member(card_number):
    try:
        dataBase = mysql.connector.connect()
        cursor = dataBase.cursor()

        get_email_sql = """
            SELECT email
            FROM MEMBER
            WHERE card_number = %s
        """
        cursor.execute(get_email_sql, (card_number,))
        row = cursor.fetchone()
        if not row:
            return " No member found with that card number."

        member_email = row[0]

        delete_user_sql = "DELETE FROM USER WHERE email = %s"
        cursor.execute(delete_user_sql, (member_email,))

        dataBase.commit()
        return "User and member deleted successfully."

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()

def authenticate_member(card_number, input_pin):
    try:
        dataBase = mysql.connector.connect()
        cursor = dataBase.cursor()

        get_pin = """
        SELECT pin FROM MEMBER
        WHERE card_number = %s
        """
        cursor.execute(get_pin, (card_number,))
        result = cursor.fetchone()

        if result and str(result[0] == str(input_pin)):
            return True
        else:
            return False

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        dataBase.close()

def add_book(title, genre, year_written, isbn, author_id=None):
    try:
        dataBase = mysql.connector.connect()
        cursor = dataBase.cursor()

        insert_book_sql = """
        INSERT INTO BOOK (title, genre, year_written, isbn, author_id)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_book_sql, (title, genre, year_written, isbn, author_id))

        if author_id is not None:
            insert_wrote_sql = """
            INSERT INTO WROTE (isbn, author_id)
            VALUES (%s, %s)
            """
            cursor.execute(insert_wrote_sql, (isbn, author_id))

        dataBase.commit()
        return "Book added successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()

def delete_book(isbn):
    try:
        dataBase = mysql.connector.connect()
        cursor = dataBase.cursor()

        check_borrow_sql = """
        SELECT COUNT(*) FROM BOOK
        WHERE isbn = %s AND date_in IS NULL
        """
        cursor.execute(check_borrow_sql, (isbn,))
        borrowed_count = cursor.fetchone()

        if borrowed_count and borrowed_count[0] > 0:
            return "Cannot delete book: It is currently borrowed"

        delete_book_sql = "DELETE FROM BOOK WHERE isbn = %s"
        cursor.execute(delete_book_sql, (isbn,))

        dataBase.commit()
        return "Book deleted successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()

def process_borrow(card_number, isbn, date_out, date_due, branch_id):
    try:
        dataBase = mysql.connector.connect()
        cursor = dataBase.cursor()

        check_owns_sql = """
        SELECT num_availible
        FROM OWNS
        WHERE isbn = %s and branch_id = %s
        """
        cursor.execute(check_owns_sql, (isbn, branch_id))
        row = cursor.fetchone()

        if not row:
            return "Book not owned by this branch"
        elif row[0] < 1:
            return "No copies available"

        # Decrement availability
        update_avail_sql = """
        UPDATE OWNS
        SET num_availible = num_availible - 1
        WHERE isbn = %s AND branch_id = %s
        """
        cursor.execute(update_avail_sql, (isbn, branch_id))

        #Insert record into BORROW
        insert_borrow_sql = """
        INSERT INTO BORROW (date_out, card_number, date_due, date_in)
        VALUES (%s, %s, NULL, %s)
        """
        cursor.execute(insert_borrow_sql, (date_out, card_number, date_out, date_due, isbn))

        dataBase.commit()
        return "Book borrowed successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()




