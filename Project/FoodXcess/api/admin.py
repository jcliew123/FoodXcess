from django.contrib import admin

# Register your models here.
from .models import Ingredient, FoodListing

class FoodListingAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user']
    search_fields = ['title', 'user__username']

    class Meta:
        model = FoodListing

admin.site.register(FoodListing, FoodListingAdmin)