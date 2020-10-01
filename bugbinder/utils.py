import hashlib
from django.utils.crypto import get_random_string
from django.conf import settings
import threading
from django.core.mail import send_mail


def threading_send_mail(subject, message, EMAIL_HOST_USER, user_email):
    send_mail(subject, message, EMAIL_HOST_USER,
              [user_email], fail_silently=True)


def async_send_mail(subject, message, EMAIL_HOST_USER, user_email):
    """ use thread to send mail """
    thread = threading.Thread(target=threading_send_mail, args=[
                              subject, message, EMAIL_HOST_USER, user_email])
    thread.start()


def get_code():
    """ Return random 8 character code"""
    code = get_random_string(
        length=6, allowed_chars='ABCDEFGHIGKLMNOPQRSTWXYZ0123456789')
    return code


def get_hash(value):
    salt = "27a0091dee99016f8fb6599da096feff"
    slated_value = value+salt
    final_value = hashlib.md5(slated_value.encode())
    return final_value.hexdigest()
