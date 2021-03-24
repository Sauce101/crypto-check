from django.urls import path
from . import views
# from .views import AjaxHandlerView

urlpatterns = [
    path('', views.AjaxHandlerView, name='index')
]
