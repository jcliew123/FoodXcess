from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password, PBKDF2PasswordHasher
from django.conf import settings

password_validators = settings.AUTH_PASSWORD_VALIDATORS

from .serializers import UserSerializer

class LogInView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = None

        try:
            user = authenticate(request, username=username, password=password)
        except Exception as e:
            return Response({e}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            login(request, user)
            self.request.session['username'] = user.get_username()
            data = {
                'Message': 'Login Sucessfullly',
                'username': username,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

class LogOutView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        self.request.session.pop('username')
        logout(request)

        return Response({'Message': "Logged Out Successfully"}, status=status.HTTP_200_OK)

class SignUpView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data = request.data)

        if serializer.is_valid(raise_exception=True):
            pwd = serializer.validated_data.get('password')
            validation = 'placeholder'
            try:
                validation = validate_password(pwd, None)
            except Exception as e:
                return Response({e}, status=status.HTTP_400_BAD_REQUEST)
            
            if validation is None:
                pwd = make_password(pwd)
                serializer.save(password=pwd)
                return Response({}, status=status.HTTP_201_CREATED)