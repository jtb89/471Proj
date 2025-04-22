import mysql.connector
import library_manager
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
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        borrowed = """
            SELECT COUNT(*)
            FROM BORROW
            WHERE card_number = %s AND date_in IS NULL
        """
        cursor.execute(borrowed, (card_number,))
        row = cursor.fetchone()
        if row[0] > 0:
            return "Cannot delete member: They have borrowed books that are not returned."

        lateCharges = """
            SELECT late_charges
            FROM MEMBER
            WHERE card_number = %s
        """
        cursor.execute(lateCharges, (card_number,))
        row = cursor.fetchone()
        if row[0] > 0:
            return "Cannot delete member: They have outstanding late charges."

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

def get_all_members():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="471ProjServer",
            database="library_db"
        )
        
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM MEMBER"
        cursor.execute(query)
        
        members = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return {"success": True, "members": members}
    except mysql.connector.Error as err:
        print("Database error in get_all_members():", err)  # <-- ADD THIS
        return {"success": False, "error": str(err)}


def authenticate_member(card_number, input_pin):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
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




def authenticate_employee(employee_num, password):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        cursor.execute("SELECT password FROM EMPLOYEE WHERE employee_num = %s", (employee_num,))
        result = cursor.fetchone()

        if result:
            db_password = str(result[0]).strip()
            return db_password == str(password).strip()
        return False

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return False
    finally:
        cursor.close()
        dataBase.close()

def update_member(card_number, f_name=None, l_name=None, address=None, dob=None, email=None, phonenum=None):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        update_sql = """
        UPDATE USER
        SET f_name = COALESCE(%s, f_name),
            l_name = COALESCE(%s, l_name),
            address = COALESCE(%s, address),
            dob = COALESCE(%s, dob),
            email = COALESCE(%s, email),
            phonenum = COALESCE(%s, phonenum)
        WHERE card_number = %s
        """
        cursor.execute(update_sql, (f_name, l_name, address, dob, email, phonenum, card_number))
        dataBase.commit()
        return "Member updated successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()




def add_book(title, genre, year_written, isbn, author_id=None, branch_id=1, num_copies=1, num_available=1):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()
        
        # Insert into BOOK - no author_id column in BOOK table
        insert_book_sql = """
        INSERT INTO BOOK (title, genre, year_written, isbn)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_book_sql, (title, genre, year_written, isbn))
        
        # If author_id is provided, create the relationship in WROTE table
        if author_id is not None:
            insert_wrote_sql = """
            INSERT INTO WROTE (isbn, author_id)
            VALUES (%s, %s)
            """
            cursor.execute(insert_wrote_sql, (isbn, author_id))
        
        # Insert into OWNS - using the correct column name 'num_availible'
        insert_owns_sql = """
        INSERT INTO OWNS (isbn, branch_id, num_copies, num_availible)
        VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_owns_sql, (isbn, branch_id, num_copies, num_available))
        
        dataBase.commit()
        return "Book successfully added"
    except mysql.connector.Error as err:
        # Rollback changes if something goes wrong
        dataBase.rollback()
        return f"MySQL Error: {err}"
    finally:
        if 'cursor' in locals() and cursor is not None:
            cursor.close()
        if 'dataBase' in locals() and dataBase is not None:
            dataBase.close()


# def delete_book(isbn):
#     try:
#         dataBase = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             passwd="471ProjServer",
#             database="library_db"
#         )
#         cursor = dataBase.cursor()

#         check_borrow_sql = """
#         SELECT COUNT(*) FROM BOOK
#         WHERE isbn = %s AND date_in IS NULL
#         """
#         cursor.execute(check_borrow_sql, (isbn,))
#         borrowed_count = cursor.fetchone()

#         if borrowed_count and borrowed_count[0] > 0:
#             return "Cannot delete book: It is currently borrowed"

#         delete_book_sql = "DELETE FROM BOOK WHERE isbn = %s"
#         cursor.execute(delete_book_sql, (isbn,))

#         dataBase.commit()
#         return "Book deleted successfully"

#     except mysql.connector.Error as err:
#         dataBase.rollback()
#         return f"Error: {err}"
#     finally:
#         cursor.close()
#         dataBase.close()

def delete_book(isbn):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        check_borrow_sql = """
        SELECT COUNT(*) FROM BORROW
        WHERE isbn = %s AND date_in IS NULL
        """
        cursor.execute(check_borrow_sql, (isbn,))
        borrowed_count = cursor.fetchone()

        if borrowed_count and borrowed_count[0] > 0:
            return {"success": False, "error": "Cannot delete book: It is currently borrowed"}

        delete_book_sql = "DELETE FROM BOOK WHERE isbn = %s"
        cursor.execute(delete_book_sql, (isbn,))

        dataBase.commit()
        return {"success": True, "message": "Book deleted successfully"}

    except mysql.connector.Error as err:
        dataBase.rollback()
        return {"success": False, "error": f"Error: {err}"}

    finally:
        cursor.close()
        dataBase.close()



def update_book_inventory(isbn, branch_id, num_copies, num_availible):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()
        update_owns_sql = """
        UPDATE OWNS
        SET num_copies = %s, num_availible = %s
        WHERE isbn = %s AND branch_id = %s
        """
        cursor.execute(update_owns_sql, (num_copies, num_availible, isbn, branch_id))
        dataBase.commit()
        return "Book inventory updated successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()


def process_borrow(card_number, isbn, date_out, date_due, branch_id):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
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
        INSERT INTO BORROW (date_out, card_number, date_due, date_in, isbn)
        VALUES (%s, %s, %s, NULL, %s)
        """
        cursor.execute(insert_borrow_sql, (date_out, card_number, date_due, isbn))

        dataBase.commit()
        return "Book borrowed successfully"

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()


def process_return(card_number, isbn, date_in, branch_id):
    try:
        database = mysql.connector.connect(
            host="localhost",
            user ="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = database.cursor()

        #Update the BORROW table to set the date_in
        update_borrow_sql = """
            UPDATE BORROW
                SET date_in = %s
            WHERE card_number = %s AND isbn = %s AND date_in IS NULL
        """
        cursor.execute(update_borrow_sql, (date_in, card_number, isbn))

        # check if any rows were updated (if 0, might be invalid or already returned)
        if cursor.rowcount == 0:
            return "No matching borrow record found or book already returned"

        # Re-increment availability in OWNS
        update_owns_sql = """
            UPDATE OWNS
                SET num_availible = num_availible + 1
            WHERE isbn = %s AND branch_id = %s
        """
        cursor.execute(update_owns_sql, (isbn, branch_id))

        database.commit()
        return "Book returned successfully"

    except mysql.connector.Error as err:
        database.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        database.close()


def update_charges(card_number, additional_fine):
    try:
        database = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = database.cursor()

        # retreve the current late charges
        get_fine_sql = """
            SELECT late_charges
                FROM MEMBER
            WHERE card_number = %s
        """
        cursor.execute(get_fine_sql, (card_number,))
        row = cursor.fetchone()

        if not row:
            return "No member found."

        current_fine = row[0]
        new_fine = current_fine + additional_fine

        # update MEMBER table with new fine
        set_fine_sql = """
            UPDATE MEMBER
                SET late_charges = %s
            WHERE card_number = %s
        """
        cursor.execute(set_fine_sql, (new_fine, card_number))
        database.commit()
        return f"Late charges updated successfully. New fine: {new_fine}"

    except mysql.connector.Error as err:
        database.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        database.close()


def update_queue(isbn):
    try:
        database = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = database.cursor()

        select_holds_sql = """
            SELECT hold_number
                FROM HOLDS
            WHERE isbn = %s
            ORDER BY hold_number ASC
        """
        cursor.execute(select_holds_sql, (isbn,))
        holds = cursor.fetchall()

        new_pos = 1
        update_pos_sql = """
            UPDATE HOLDS
                SET queue_position = %s
            WHERE hold_number = %s
        """
        for row in holds:
            hold_number = row[0]
            cursor.execute(update_pos_sql, (new_pos, hold_number))
            new_pos += 1

        database.comit()

    except mysql.connector.Error as err:
        database.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        database.close()


def create_hold(card_number, isbn, branch_id):
    try:
        database = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = database.cursor()

        # Check how many copies are owned and avaiable
        check_owns_sql = """
            SELECT num_copies, num_availible
            FROM OWNS
            WHERE isbn = %s AND branch_id = %s     
        """
        cursor.execute(check_owns_sql, (isbn, branch_id))
        row = cursor.fetchone()
        if not row:
            return "Book not owned by this branch"

        num_copies, num_availible = row

        # count existing holds
        holds_sql = """
            SELECT COUNT(*)
                FROM HOLDS
            WHERE isbn = %s AND branch_id = %s
        """
        cursor.execute(holds_sql, (isbn, branch_id))
        hold_count = cursor.fetchone()[0]

        next_queue_position = hold_count + 1
        insert_hold_sql = """
        INSERT INTO HOLDS (queue_position, isbn, card_number, branch_id)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_hold_sql, (next_queue_position, isbn, card_number, branch_id))
        database.commit()
        return f"Hold created successfully. You are position #{next_queue_position} in the queue."

    except mysql.connector.Error as err:
        database.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        database.close()

def delete_hold(hold_number=None, card_number=None, isbn=None):
    try:
        database = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = database.cursor()

        if hold_number:
            hold_isbn_sql = """
                SELECT isbn
                FROM HOLDS
                WHERE hold_number = %s
            """
            cursor.execute(hold_isbn_sql, (hold_number,))
            row = cursor.fetchone()
            if row:
                found_isbn = row[0]
                delete_sql = """
                    DELETE FROM HOLDS
                    WHERE hold_number = %s
                """
                cursor.execute(delete_sql, (hold_number,))
                update_queue(found_isbn)
        elif isbn and card_number:
            delete_sql = """
                DELETE FROM HOLDS
                WHERE isbn = %s AND card_number = %s
            """
            cursor.execute(delete_sql, (isbn, card_number))
            update_queue(isbn)
        else:
            return "Please provide either a hold number or both an ISBN and card number."
        database.commit()
        return "Hold deleted successfully."
    except mysql.connector.Error as err:
        database.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        database.close()

## stuff josh added for testing



# def get_all_books():
#     import mysql.connector
    
#     try:
#         # Establish connection to MySQL
#         connection = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             password="471ProjServer",
#             database="library_db"
#         )
        
#         cursor = connection.cursor(dictionary=True)
#         query = "SELECT * FROM Book"
#         cursor.execute(query)
        
#         books = cursor.fetchall()
        
#         cursor.close()
#         connection.close()
        
#         return {"success": True, "books": books}
#     except mysql.connector.Error as err:
#         return {"success": False, "error": str(err)}

def get_all_books():

    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="471ProjServer",
            database="library_db"
        )
        
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM BOOK"
        cursor.execute(query)
        
        books = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return {"success": True, "books": books}
    except mysql.connector.Error as err:
        print("Database error in get_all_books():", err)  
        return {"success": False, "error": str(err)}

# def place_order(isbn, num_copies, publisher, order_num, cost, branch_num, employee_num):
#     try:
#         dataBase = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             passwd="471ProjServer",
#             database="library_db"
#         )
#         cursor = dataBase.cursor()

#         order_sql = """
#         INSERT INTO ORDERS (isbn, num_copies, publisher, order_num, cost, branch_num, employee_num)
#         VALUES (%s, %s, %s, %s, %s, %s, %s)
#         """
#         cursor.execute(order_sql, (isbn, num_copies, publisher, order_num, cost, branch_num, employee_num))
#         dataBase.commit()
#         return "Order placed successfully."

#     except mysql.connector.Error as err:
#         dataBase.rollback()
#         return f"Error: {err}"
#     finally:
#         cursor.close()
#         dataBase.close()

def place_order(isbn, num_copies, publisher, order_num, cost, branch_num, employee_num):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        # Check if publisher exists
        cursor.execute("SELECT 1 FROM PUBLISHER WHERE publisher_name = %s", (publisher,))
        if cursor.fetchone() is None:
            return f"Error: Publisher '{publisher}' does not exist in the database."

        order_sql = """
        INSERT INTO ORDERS (isbn, num_copies, publisher, order_num, cost, branch_num, employee_num)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(order_sql, (isbn, num_copies, publisher, order_num, cost, branch_num, employee_num))
        dataBase.commit()
        return "Order placed successfully."

    except mysql.connector.Error as err:
        dataBase.rollback()
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()



# def cancel_order(order_num):
#     try:
#         dataBase = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             passwd="471ProjServer",
#             database="library_db"
#         )
#         cursor = dataBase.cursor()

#         cancel_sql = """
#         DELETE FROM ORDERS
#         WHERE order_num = %s
#         """
#         cursor.execute(cancel_sql, (order_num,))
#         dataBase.commit()
#         return "Order canceled successfully."

#     except mysql.connector.Error as err:
#         dataBase.rollback()
#         return f"Error: {err}"
#     finally:
#         cursor.close()
#         dataBase.close()

def cancel_order(order_num):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        cancel_sql = """
        DELETE FROM ORDERS
        WHERE order_num = %s
        """
        cursor.execute(cancel_sql, (order_num,))
        dataBase.commit()

        if cursor.rowcount == 0:
            return {"success": False, "error": f"Order #{order_num} not found."}

        return {"success": True, "message": "Order canceled successfully."}

    except mysql.connector.Error as err:
        dataBase.rollback()
        return {"success": False, "error": f"Error: {err}"}

    finally:
        cursor.close()
        dataBase.close()





def track_order(order_num):
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor()

        track_sql = """
        SELECT status
        FROM ORDERS
        WHERE order_num = %s
        """
        cursor.execute(track_sql, (order_num,))
        status = cursor.fetchone()
        if status:
            return f"Order status: {status[0]}"
        else:
            return "Order not found."

    except mysql.connector.Error as err:
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()


# def get_all_orders():
#     try:
#         dataBase = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             passwd="471ProjServer",
#             database="library_db"
#         )
#         cursor = dataBase.cursor(dictionary=True)

#         query = "SELECT * FROM ORDERS"
#         cursor.execute(query)
#         orders = cursor.fetchall()

#         return orders  # Returns a list of dictionaries

#     except mysql.connector.Error as err:
#         return f"Error: {err}"
#     finally:
#         cursor.close()
#         dataBase.close()

def get_all_orders():
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor(dictionary=True)

        # Query to retrieve all relevant columns
        query = """
        SELECT
            o.order_num,
            o.isbn,
            o.num_copies,
            o.publisher,
            o.cost,
            o.employee_num,
            b.branch_id,
            p.publisher_name,
            e.employee_num
        FROM ORDERS o
        LEFT JOIN BRANCH b ON o.branch_num = b.branch_id
        LEFT JOIN PUBLISHER p ON o.publisher = p.publisher_name
        LEFT JOIN EMPLOYEE e ON o.employee_num = e.employee_num
        """
        cursor.execute(query)
        orders = cursor.fetchall()

        return orders  # Returns a list of dictionaries

    except mysql.connector.Error as err:
        return f"Error: {err}"
    finally:
        cursor.close()
        dataBase.close()




def get_books_full():
    try:
        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor(dictionary=True)

        query = """
            SELECT 
                B.isbn,
                B.title,
                B.genre,
                B.year_written,
                CONCAT(A.author_f_name, ' ', A.author_l_name) AS author_name,
                BR.branch_id,
                BR.branch_name,
                O.num_availible AS total_available
            FROM BOOK B
            LEFT JOIN WROTE W ON B.isbn = W.isbn
            LEFT JOIN AUTHOR A ON W.author_id = A.author_id
            LEFT JOIN OWNS O ON B.isbn = O.isbn
            LEFT JOIN BRANCH BR ON O.branch_id = BR.branch_id;
        """
        
        cursor.execute(query)
        rows = cursor.fetchall()
        
        return {"success": True, "books": rows}

    except mysql.connector.Error as err:
        return {"success": False, "error": str(err)}
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'dataBase' in locals() and dataBase:
            dataBase.close()

def get_member_borrowed_books(card_number):
    try:
        import mysql.connector

        dataBase = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="471ProjServer",
            database="library_db"
        )
        cursor = dataBase.cursor(dictionary=True)

        query = """
            SELECT 
                B.isbn,
                B.title,
                BO.date_out,
                BO.date_due,
                BO.date_in
            FROM BORROW BO
            JOIN BOOK B ON BO.isbn = B.isbn
            WHERE BO.card_number = %s;
        """
        cursor.execute(query, (card_number,))
        borrowed_books = cursor.fetchall()

        return {"success": True, "borrowed_books": borrowed_books}

    except mysql.connector.Error as err:
        return {"success": False, "error": str(err)}
    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'dataBase' in locals() and dataBase:
            dataBase.close()
