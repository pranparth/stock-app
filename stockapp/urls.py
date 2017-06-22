from django.conf.urls import url, include
from stockapp import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'stocks', views.StockViewSet)
router.register(r'startrequest', views.StartRequestViewSet)
urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
