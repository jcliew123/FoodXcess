from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("about/", index),
    path("allfoodlist/", index),
    path("create-foodlist/", index),
    path("foodlist/<str:code>/", index),
    path("edit-foodlist/<str:code>/", index),
    path("search/", index),
    path("search/<str:query>/", index),
    path("inventory/", index),
    path("sign-in/", index),
    path("sign-up/", index),
    path("own-foodlist/", index),
    path("saved-foodlist/", index),
    path("aisearch/", index),
    path('search-confirmation/', index)
]