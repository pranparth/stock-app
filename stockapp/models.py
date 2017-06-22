from django.db import models

# Create your models here.
class Stock(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    class Meta:
        ordering = ('created',)

class StartRequest(models.Model):
	created = models.DateTimeField(auto_now_add=True)
	stock_name = models.CharField(max_length=100, blank=True, default='')
	stock_url = models.CharField(max_length=200, blank=True, default='') 
	class Meta:
		ordering = ('created', )
