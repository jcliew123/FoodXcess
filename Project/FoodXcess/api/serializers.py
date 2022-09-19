from django.db.models import fields
from rest_framework import serializers
from .models import Ingredient, FoodListing

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id','user', 'name', 'expiry_date', 'location', 'category', 'quantity', 'unit', 'remaining']

class FoodListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodListing
        fields = '__all__'

class CreateFoodListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodListing
        fields = ('title', 'description', 'best_before')