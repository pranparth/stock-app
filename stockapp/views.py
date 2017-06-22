from django.shortcuts import render
from django.http import JsonResponse
from stockapp.serializers import StockSerializer, StartRequestSerializer
from stockapp.models import Stock, StartRequest
from rest_framework import viewsets, status
from rest_framework.response import Response
from classify.main import ArticleClassifier

def index_from_stock(stock_name):
	if stock_name == "Facebook":
		return 0
	elif stock_name == "Exxon Mobile":
		return 1
	elif stock_name == "FedEx":
		return 2
	else:
		return 3

class StockViewSet(viewsets.ModelViewSet):
	queryset = Stock.objects.all()
	serializer_class = StockSerializer

class StartRequestViewSet(viewsets.ModelViewSet):
	queryset = StartRequest.objects.all()
	serializer_class = StartRequestSerializer

	def create(self, request):
		serializer = StartRequestSerializer(data=request.data, context={'request': request})
		if serializer.is_valid():
			serializer.save()
			selected_stock = serializer.data['stock_name']
			selected_url = serializer.data['stock_url']
			print("The serializer data is ", serializer.data)
			temp_url = "https://seekingalpha.com/article/4081729-facebook-overseas-opportunity-immense";
			stock_index = index_from_stock(selected_stock)
			classifier = ArticleClassifier(stock_index, selected_url)
			result = classifier.start_classification()
			return JsonResponse({'movement': result.tolist()})
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# Create your views here.
