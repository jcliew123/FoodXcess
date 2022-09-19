from django.urls import path
from .views import imageUploadView, IngredientView, AddIngredientView, IngredientListView, FoodListingView, CreateFoodListingView, FoodListingListView, OwnFoodListingView, SavedFoodListingView, SaveFoodListingView, getCSRFTokenView

urlpatterns = [
    path('foodlist/', FoodListingListView.as_view()),
    path('create-foodlist/', CreateFoodListingView.as_view()),
    path('foodlist/<str:code>/', FoodListingView.as_view()),
    path('inventory/', IngredientListView.as_view()),
    path('ingredient/<str:id>/', IngredientView.as_view()),
    path('add-ingredient/', AddIngredientView.as_view()),
    path('saved-foodlist/', SavedFoodListingView.as_view()),
    path('own-foodlist/', OwnFoodListingView.as_view()),
    path('save-foodlist/<str:code>/' , SaveFoodListingView.as_view()),
    path('get-token/', getCSRFTokenView.as_view()),
    path('upload/', imageUploadView.as_view()),
]