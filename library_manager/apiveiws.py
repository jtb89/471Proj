from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from . import database_functions
from django.db import connection
import mysql.connector


@csrf_exempt
def get_books_api(request):
    try:
        books_result = database_functions.get_all_books()
        print("Books result:", books_result)  # Debug print
        if books_result["success"]:
            return JsonResponse({"books": books_result["books"]})
        else:
            return JsonResponse({"error": books_result["error"]}, status=500)
    except Exception as e:
        print("Error in get_books_api:", str(e))  # This will show the real issue
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_members_api(request):
    try:
        books_result = database_functions.get_all_books()
        print("Books result:", books_result)  # Debug print
        if books_result["success"]:
            return JsonResponse({"books": books_result["books"]})
        else:
            return JsonResponse({"error": books_result["error"]}, status=500)
    except Exception as e:
        print("Error in get_books_api:", str(e))  # This will show the real issue
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def cancel_order_api(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode("utf-8"))
            order_num = int(body.get("order_num"))

            if not order_num:
                return JsonResponse({"error": "Missing 'order_num'."}, status=400)

            result = database_functions.cancel_order(order_num)

            if result["success"]:
                return JsonResponse({"message": result["message"]})
            else:
                return JsonResponse({"error": result["error"]}, status=500)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


# @csrf_exempt
# def get_orders_api(request):
#     try:
#         orders_result = database_functions.get_all_orders()
#         print("Orders result:", orders_result)  # Debug print

#         # If the result is a list, it's a success. If it's a string, it's an error message.
#         if isinstance(orders_result, list):
#             return JsonResponse({"orders": orders_result})
#         else:
#             return JsonResponse({"error": orders_result}, status=500)

#     except Exception as e:
#         print("Error in get_orders_api:", str(e))
#         return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_orders_api(request):
    try:
        # Call the function to get all orders
        orders_result = database_functions.get_all_orders()
        print("Orders result:", orders_result)  # Debug print

        # If the result is a list, it's a success. If it's a string, it's an error message.
        if isinstance(orders_result, list):
            # Format the result into a structured response
            return JsonResponse({"orders": orders_result})
        else:
            return JsonResponse({"error": orders_result}, status=500)

    except Exception as e:
        print("Error in get_orders_api:", str(e))
        return JsonResponse({"error": str(e)}, status=500)

# @csrf_exempt
# def add_book_api(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)

#             # Get the data from the request body
#             title = data.get('title')
#             genre = data.get('genre')
#             year_written = data.get('year_written')
#             isbn = data.get('isbn')
#             author_id = data.get('author_id')  # Optional
#             branch_id = data.get('branch_id', 1)
#             num_copies = data.get('num_copies', 1)
#             num_available = data.get('num_available', num_copies)  # ✅ Corrected spelling

#             result = database_functions.add_book(
#                 title, genre, year_written, isbn,
#                 author_id, branch_id, num_copies, num_available  # ✅ Passed correctly
#             )

#             return JsonResponse({'message': result})

#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)
#     else:
#         return JsonResponse({'error': 'POST request required'}, status=405)


@csrf_exempt
def add_book_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        isbn = data.get('isbn')
        title = data.get('title')
        genre = data.get('genre')
        year_written = data.get('year_written')
        
        author_id = data.get('author_id')
        branch_id = data.get('branch_id', 1)
        num_copies = data.get('num_copies', 1)
        num_available = data.get('num_available', num_copies)  # Default to num_copies if not provided

        try:
            with connection.cursor() as cursor:
                # Insert into BOOK
                cursor.execute("""
                    INSERT INTO BOOK (isbn, title, genre, year_written)
                    VALUES (%s, %s, %s, %s)
                """, [isbn, title, genre, year_written])

                # Insert into WROTE if author_id is provided
                if author_id:
                    cursor.execute("""
                        INSERT INTO WROTE (author_id, isbn)
                        VALUES (%s, %s)
                    """, [author_id, isbn])

                # Insert into OWNS with num_availible field
                cursor.execute("""
                    INSERT INTO OWNS (branch_id, isbn, num_copies, num_availible)
                    VALUES (%s, %s, %s, %s)
                """, [branch_id, isbn, num_copies, num_available])

                connection.commit()  # Explicitly commit the transaction

            return JsonResponse({'message': 'Book added successfully!'})
        except mysql.connector.errors.IntegrityError as e:
            return JsonResponse({'error': 'Integrity error. Book may already exist or referenced entities missing.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def add_member_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Extract data from the request
            f_name = data.get('f_name')
            l_name = data.get('l_name')
            address = data.get('address')
            dob = data.get('dob')
            email = data.get('email')
            phonenum = data.get('phonenum')
            checked_out_books = data.get('checked_out_books', 0)
            late_charges = data.get('late_charges', 0)
            card_number = data.get('card_number')
            pin = data.get('pin')

            # Call the function to add the member to the database
            result = database_functions.add_member(
                f_name, l_name, address, dob, email, phonenum,
                checked_out_books, late_charges, card_number, pin
            )

            return JsonResponse({"message": result})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "POST request required"}, status=405)

## log in
@csrf_exempt
def authenticate_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            identifier = data.get("identifier")
            password = data.get("password")
            is_employee = data.get("is_employee", False)

            if is_employee:
                success = database_functions.authenticate_employee(identifier, password)
            else:
                success = database_functions.authenticate_member(identifier, password)

            if success:
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"success": False, "error": "Invalid credentials"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "POST required"}, status=405)

@csrf_exempt
def delete_book_api(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            isbn = body.get('isbn')

            if not isbn:
                return JsonResponse({"error": "ISBN is required"}, status=400)

            result = database_functions.delete_book(isbn)

            if result["success"]:
                return JsonResponse({"message": result["message"]})
            else:
                return JsonResponse({"error": result["error"]}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            print("Error in delete_book_api:", str(e))
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


@csrf_exempt
def track_order_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            order_num = data.get('order_num')

            if not order_num:
                return JsonResponse({"error": "Order number is required"}, status=400)

            result = database_functions.track_order(order_num)

            return JsonResponse({"result": result}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            print("Error in track_order_api:", str(e))
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)

@csrf_exempt
def update_book_inventory_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            isbn = data.get('isbn')
            branch_id = data.get('branch_id')
            num_copies = data.get('num_copies')
            num_availible = data.get('num_availible')

            if not all([isbn, branch_id, num_copies, num_availible]):
                return JsonResponse({"error": "All fields are required: isbn, branch_id, num_copies, num_availible"}, status=400)

            result = database_functions.update_book_inventory(isbn, branch_id, num_copies, num_availible)

            return JsonResponse({"result": result}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            print("Error in update_book_inventory_api:", str(e))
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


# @csrf_exempt
# def get_books_with_branch_and_author_api(request):
#     try:
#         books_result = database_functions.get_books_with_branch_and_author()
#         print("Books result:", books_result)  # Debug print
#         if books_result["success"]:
#             return JsonResponse({"books": books_result["books"]})
#         else:
#             return JsonResponse({"error": books_result["error"]}, status=500)
#     except Exception as e:
#         print("Error in get_books_api:", str(e))  # This will show the real issue
#         return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def get_books_full_api(request):
    if request.method == 'GET':
        try:
            # Call the helper function from database_functions
            books_result = database_functions.get_books_full()
            print("Books result:", books_result)  # Debug print for development

            # Check for successful result
            if books_result.get("success"):
                return JsonResponse({
                    "status": "success",
                    "books": books_result["books"]
                }, status=200)
            else:
                return JsonResponse({
                    "status": "error",
                    "message": books_result.get("error", "Unknown error occurred")
                }, status=500)
        
        except Exception as e:
            print("Error in get_books_full_api:", str(e))  # Log the error
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)
    
    else:
        return JsonResponse({
            "status": "error",
            "message": "Only GET requests are allowed."
        }, status=405)


@csrf_exempt
def place_order_api(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data from the POST request
            data = json.loads(request.body)
            
            # Extract the necessary fields from the incoming data
            isbn = data.get("isbn")
            num_copies = data.get("num_copies")
            publisher = data.get("publisher")
            order_num = data.get("order_num")
            cost = data.get("cost")
            branch_num = data.get("branch_num")
            employee_num = data.get("employee_num")
            
            # Ensure that all required fields are provided
            if not all([isbn, num_copies, publisher, order_num, cost, branch_num, employee_num]):
                return JsonResponse({"error": "Missing required fields"}, status=400)
            
            # Call the place_order function from the database_functions module
            result = database_functions.place_order(
                isbn, num_copies, publisher, order_num, cost, branch_num, employee_num
            )

            # If the result is an error message, return it
            if "Error" in result:
                return JsonResponse({"error": result}, status=500)
            
            # If the order is successfully placed, return the success message
            return JsonResponse({"message": "Order placed successfully!"}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def borrow_book_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            card_number = data.get('card_number')
            isbn = data.get('isbn')
            date_out = data.get('date_out')
            date_due = data.get('date_due')
            branch_id = data.get('branch_id')

            result = database_functions.process_borrow(card_number, isbn, date_out, date_due, branch_id)
            return JsonResponse({'status': 'success', 'message': result}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)

@csrf_exempt
def return_book_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            card_number = data.get('card_number')
            isbn = data.get('isbn')
            date_in = data.get('date_in')
            branch_id = data.get('branch_id')

            result = database_functions.process_return(card_number, isbn, date_in, branch_id)
            return JsonResponse({'status': 'success', 'message': result}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed.'}, status=405)