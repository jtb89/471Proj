from django.shortcuts import render
from . import database_functions
from django.views.decorators.csrf import csrf_exempt



def add_member_view(request):
    if request.method == 'POST':
        f_name = request.POST.get('f_name')
        l_name = request.POST.get('l_name')
        address = request.POST.get('address')
        dob = request.POST.get('dob')
        email = request.POST.get('email')
        phonenum = request.POST.get('phonenum')
        checked_out_books = request.POST.get('checked_out_books')
        late_charges = request.POST.get('late_charges')
        card_number = request.POST.get('card_number')
        pin = request.POST.get('pin')

        # Call the function to add a member to the database
        result = database_functions.add_member(f_name, l_name, address, dob, email, phonenum, checked_out_books, late_charges, card_number, pin)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'member_form.html')


def delete_user_member_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        result = database_functions.delete_user_member(card_number)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'delete_user_member_form.html')


def authenticate_member_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        input_pin = request.POST.get('pin')
        result = database_functions.authenticate_member(card_number, input_pin)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'authenticate_member_form.html')


def update_member_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        f_name = request.POST.get('f_name')
        l_name = request.POST.get('l_name')
        address = request.POST.get('address')
        dob = request.POST.get('dob')
        email = request.POST.get('email')
        phonenum = request.POST.get('phonenum')
        checked_out_books = request.POST.get('checked_out_books')
        late_charges = request.POST.get('late_charges')

        result = database_functions.update_member(card_number, f_name, l_name, address, dob, email, phonenum, checked_out_books, late_charges)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'update_member_form.html')
def add_book_view(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        genre = request.POST.get('genre')
        year_written = request.POST.get('year_written')
        author_id = request.POST.get('author_id')
        isbn = request.POST.get('isbn')

        result = database_functions.add_book(title, genre, year_written, isbn, author_id)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'add_book_form.html')


def delete_book_view(request):
    if request.method == 'POST':
        isbn = request.POST.get('isbn')
        result = database_functions.delete_book(isbn)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'delete_book_form.html')


def update_book_view(request):
    if request.method == 'POST':
        isbn = request.POST.get('isbn')
        branch_id = request.POST.get('branch_id')
        num_copies = request.POST.get('num_copies')
        num_availible = request.POST.get('num_availible')
        result = database_functions.update_book(isbn, branch_id, num_copies, num_availible)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'update_book_form.html')


def process_borrow_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        isbn = request.POST.get('isbn')
        date_out = request.POST.get('date_out')
        date_due = request.POST.get('date_due')
        branch_id = request.POST.get('branch_id')
        result = database_functions.process_borrow(card_number, isbn, date_out, date_due, branch_id)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'process_borrow_form.html')


def process_return_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        isbn = request.POST.get('isbn')
        date_in = request.POST.get('date_in')
        branch_id = request.POST.get('branch_id')
        result = database_functions.process_return(card_number, isbn, date_in, branch_id)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'process_return_form.html')


def update_charges_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        additional_fine = request.POST.get('additional_fine')
        result = database_functions.update_charges(card_number, additional_fine)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'update_charges_form.html')


def create_hold_view(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        isbn = request.POST.get('isbn')
        branch_id = request.POST.get('branch_id')
        result = database_functions.create_hold(card_number, isbn, branch_id)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'create_hold_form.html')


def delete_hold_view(request):
    if request.method == 'POST':
        hold_number = request.POST.get('hold_number')
        card_number = request.POST.get('card_number')
        isbn = request.POST.get('isbn')
        result = database_functions.delete_hold(hold_number, card_number, isbn)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'delete_hold_form.html')


def place_order_view(request):
    if request.method == 'POST':
        isbn = request.POST.get('isbn')
        num_copies = request.POST.get('num_copies')
        publisher = request.POST.get('publisher')
        order_num = request.POST.get('order_num')
        cost = request.POST.get('cost')
        branch_num = request.POST.get('branch_num')
        employee_num = request.POST.get('employee_num')

        result = database_functions.place_order(isbn, num_copies, publisher, order_num, cost, branch_num, employee_num)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'place_order_form.html')


def cancel_order_view(request):
    if request.method == 'POST':
        order_num = request.POST.get('order_num')
        result = database_functions.cancel_order(order_num)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'cancel_order_form.html')


def track_order_view(request):
    if request.method == 'POST':
        order_num = request.POST.get('order_num')
        result = database_functions.track_order(order_num)
        return render(request, 'success.html', {'result': result})
    else:
        return render(request, 'track_order_form.html')


### stuff josh added for testing

def get_books_view(request):
    books_result = database_functions.get_all_books()
    if books_result["success"]:
        return render(request, 'books_list.html', {'books': books_result["books"]})
    else:
        return render(request, 'error.html', {'error': books_result["error"]})

def get_all_members(request):
    members_result = database_functions.get_all_members()
    if members_result["success"]:
        return render(request, 'members_list.html', {'members': members_result["members"]})
    else:
        return render(request, 'error.html', {'error': members_result["error"]})

