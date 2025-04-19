from django.urls import path
from .views import (add_member_view, delete_user_member_view, authenticate_member_view, add_book_view, delete_book_view,
                    process_borrow_view, process_return_view, update_charges_view, create_hold_view, delete_hold_view)

urlpatterns = [
    path('add-member/', add_member_view, name='add_member'),
    path('delete-user-member/', delete_user_member_view, name='delete_user_member'),
    path('authenticate-member/', authenticate_member_view, name='authenticate_member'),
    path('add-book/', add_book_view, name='add_book'),
    path('delete-book/', delete_book_view, name='delete_book'),
    path('process-borrow/', process_borrow_view, name='process_borrow'),
    path('process-return/', process_return_view, name='process_return'),
    path('update-charges/', update_charges_view, name='update_charges'),
    path('create-hold/', create_hold_view, name='create_hold'),
    path('delete-hold/', delete_hold_view, name='delete_hold'),
]