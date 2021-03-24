from django.shortcuts import render
import requests
from django.http import JsonResponse


# Create your views here.
def AjaxHandlerView(request):
    if request.is_ajax():
        url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        data = requests.get(url).json()

        return JsonResponse({'data': data}, status=200)
    
    return render(request, 'positions/index.html')

