from rest_framework import serializers
from stockapp.models import Stock, StartRequest

class StockSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Stock
		fields = '__all__'

class StartRequestSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = StartRequest
		fields = '__all__'
