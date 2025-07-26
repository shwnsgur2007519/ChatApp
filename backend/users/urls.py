from django.urls import path
from .views import signup, login_view, logout_view, me_view, csrf_token_view

urlpatterns = [
    path('csrf/', csrf_token_view),
    path('signup/', signup),
    path('login/', login_view),
    path('logout/', logout_view),
    path('me/', me_view),
]
