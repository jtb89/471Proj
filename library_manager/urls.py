from django.urls import path
from .views import (add_member_view, delete_user_member_view, authenticate_member_view, update_member_view, add_book_view,
                    delete_book_view, update_book_view, process_borrow_view, process_return_view, update_charges_view,
                    create_hold_view, delete_hold_view, place_order_view, cancel_order_view, track_order_view, get_books_view, get_all_members)
from . import apiveiws

urlpatterns = [
    path('add-member/', add_member_view, name='add_member'),
    path('delete-user-member/', delete_user_member_view, name='delete_user_member'),
    path('authenticate-member/', authenticate_member_view, name='authenticate_member'),
    path('update-member/', update_member_view, name='update_member'),
    path('add-book/', add_book_view, name='add_book'),
    path('delete-book/', delete_book_view, name='delete_book'),
    path('update-book/', update_book_view, name='update_book'),
    path('process-borrow/', process_borrow_view, name='process_borrow'),
    path('process-return/', process_return_view, name='process_return'),
    path('update-charges/', update_charges_view, name='update_charges'),
    path('create-hold/', create_hold_view, name='create_hold'),
    path('delete-hold/', delete_hold_view, name='delete_hold'),
    path('place-order/', place_order_view, name='place_order'),
    path('cancel-order/', cancel_order_view, name='cancel_order'),
    path('track-order/', track_order_view, name='track_order'),
    path('books/', get_books_view, name='get_books'),
    path('get-members/', get_all_members, name='get_members'),
    path('api/books/', apiveiws.get_books_api, name='get_books_api'),
    path('api/add_book/', apiveiws.add_book_api, name='add_book_api'),
    path('api/add-member/', apiveiws.add_member_api, name='add_member_api'),
    path('api/get_members', apiveiws.get_members_api, name='get_members_api' ),
    path('api/authenticate', apiveiws.authenticate_api, name='authenticate_users_api')

]