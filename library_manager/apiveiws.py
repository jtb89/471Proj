from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from . import database_functions

# @csrf_exempt
# def get_books_api(request):
#     books_result = database_functions.get_all_books()
#     if books_result["success"]:
#         return JsonResponse({"books": books_result["books"]})
#     else:
#         return JsonResponse({"error": books_result["error"]}, status=500)

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


# @csrf_exempt
# def add_book_api(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             title = data.get('title')
#             genre = data.get('genre')
#             year_written = data.get('year_written')
#             isbn = data.get('isbn')
#             author_id = data.get('author_id')
            
#             result = database_functions.add_book(title, genre, year_written, isbn, author_id)
#             return JsonResponse({"message": result})
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
#     else:
#         return JsonResponse({"error": "Only POST method is allowed"}, status=405)

# 
@csrf_exempt
def add_book_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Get the data from the request body
            title = data.get('title')
            genre = data.get('genre')
            year_written = data.get('year_written')
            isbn = data.get('isbn')
            author_id = data.get('author_id')  # Optional
            branch_id = data.get('branch_id', 1)
            num_copies = data.get('num_copies', 1)
            num_available = data.get('num_available', num_copies)  # ✅ Corrected spelling

            result = database_functions.add_book(
                title, genre, year_written, isbn,
                author_id, branch_id, num_copies, num_available  # ✅ Passed correctly
            )

            return JsonResponse({'message': result})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'POST request required'}, status=405)


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
