from django.core.validators import MaxValueValidator, MinValueValidator, MaxLengthValidator
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import random
import string

from .choices import LOC_CHOICE, CAT_CHOICE, UNIT_CHOICE

User = settings.AUTH_USER_MODEL

def generate_unique_code():
    '''
    Generate a 6 letters unique code for the food listing
    '''
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_letters, k=length))
        try:
            FoodListing.objects.get(code=code)
        except FoodListing.DoesNotExist:
            return code

class Ingredient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    expiry_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=30, choices=LOC_CHOICE, blank=True, null=True)
    category = models.CharField(max_length=30, choices=CAT_CHOICE, blank=True, null=True)

    quantity = models.IntegerField(default=1)
    unit = models.CharField(max_length=30, choices=UNIT_CHOICE, blank=True, null=True)
    remaining = models.IntegerField(default=100, validators=[MaxValueValidator(100), MinValueValidator(0)])

class FoodListing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, default=generate_unique_code, unique=True)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=250, blank=True, validators=[MaxLengthValidator(250)])
    best_before = models.DateField(blank=True, null=True)
    image = models.ImageField(upload_to='uploads/', null=True)
    saved = models.ManyToManyField(User, related_name='user', blank=True)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title