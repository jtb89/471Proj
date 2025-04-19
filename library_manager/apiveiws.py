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
def add_book_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            genre = data.get('genre')
            year_written = data.get('year_written')
            isbn = data.get('isbn')
            author_id = data.get('author_id')
            
            result = database_functions.add_book(title, genre, year_written, isbn, author_id)
            return JsonResponse({"message": result})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)