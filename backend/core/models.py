from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# inheriting from the abstract user to have more control of the fields


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_deactivated = models.BooleanField(default=False)
