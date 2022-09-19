from django.http import JsonResponse
from django.http.response import Http404
from django.middleware import csrf
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

import numpy as np
from PIL import Image
import pathlib
import tensorflow as tf
import os
from six import viewkeys
import sys
from object_detection.utils import config_util
from object_detection.builders import model_builder
from object_detection.utils import label_map_util

from .models import FoodListing, Ingredient
from .serializers import CreateFoodListingSerializer, FoodListingSerializer, IngredientSerializer 

class FoodListingListView(APIView):

    def get(self, request, format=None):
        user =  request.user
        qs = FoodListing.objects.exclude(user=user.pk)
        serializer = FoodListingSerializer(qs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateFoodListingView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateFoodListingSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            best_before = serializer.data.get('best_before')

            listing = FoodListing(user=request.user, title=title, description=description, best_before=best_before)
            listing.save()

            return Response(FoodListingSerializer(listing).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class FoodListingView(APIView):
    serializer_class = CreateFoodListingSerializer
    
    def get_object(self, code):
        try:
            return FoodListing.objects.get(code = code)
        except FoodListing.DoesNotExist:
            raise Http404("Food Listing Does Not Exist")

    def get(self, request, code, format=None):
        if code != None:
            listing = self.get_object(code)
            serializer = FoodListingSerializer(listing)
            data = serializer.data
            if listing.user == request.user:
                data['owner'] = True
            else:
                data['owner'] = False
        
            return Response(data, status= status.HTTP_200_OK)
        
        return Response({'Bad Request': "Code parameter not found in request"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, code, format=None):
        listing = self.get_object(code)
        serializer = self.serializer_class(listing, data=request.data)
        if serializer.is_valid(raise_exception=True):
            if listing.user == request.user:
                serializer.save()
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)

            return Response(FoodListingSerializer(listing).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, code, format=None):
        listing = self.get_object(code)
        if listing.user == request.user:
            listing.delete()
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)


        return Response(status= status.HTTP_204_NO_CONTENT)    

class OwnFoodListingView(APIView):
    def get(self, request, format=None):
        user = request.user
        if(user.is_authenticated):
            qs = FoodListing.objects.filter(user=user)
            serializer = FoodListingSerializer(qs, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_403_FORBIDDEN)

class IngredientListView(APIView):
    def get(self, request, format=None):
        qs = Ingredient.objects.filter(user=request.user)

        return Response(IngredientSerializer(qs, many=True).data, status=status.HTTP_200_OK)

class IngredientView(APIView):
    def get_object(self, id):
        try:
            return Ingredient.objects.get(id = id)
        except Ingredient.DoesNotExist:
            raise Http404("Ingredient Does Not Exist")

    def get(self, request, id, format=None):
        if id != None:
            ing = self.get_object(id)

            return Response(IngredientSerializer(ing).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid parameter"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, id, format=None):
        user =request.user
        ing = self.get_object(id)
        request.data['user'] = user.pk
        serializer = IngredientSerializer(ing, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)    

    def delete(self, request, id, format=None):
        ing = self.get_object(id) 
        ing.delete()

        return Response(status= status.HTTP_204_NO_CONTENT)

class AddIngredientView(APIView):
    serializer_class = IngredientSerializer

    def post(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            request.data['user'] = user.pk
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_403_FORBIDDEN)

class SaveFoodListingView(APIView):
    def get_object(self, code):
        try:
            return FoodListing.objects.get(code = code)
        except FoodListing.DoesNotExist:
            raise Http404("Food Listing Does Not Exist")

    def post(self, request, code, format=None):
        user = request.user
        if user.is_authenticated:
            obj = self.get_object(code)
            if request.user in obj.saved.all():
                obj.saved.remove(user)
                return Response({'Message': 'Removed successfully'}, status=status.HTTP_200_OK)
            else:
                obj.saved.add(user)
                return Response({'Message': 'Saved successfully'}, status=status.HTTP_200_OK)


        return Response(status=status.HTTP_403_FORBIDDEN)

class SavedFoodListingView(APIView):
    def get(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            qs = FoodListing.objects.filter(saved__username__exact=user)

            return Response(FoodListingSerializer(qs, many=True).data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class getCSRFTokenView(APIView):
    def get(self, request, format=None):
        token = csrf.get_token(request)

        return JsonResponse({'token': token}, status=status.HTTP_200_OK)


# --------------- MODEL INFERENCING ---------------
def load_image_into_numpy_array(iobyte):
    """Load an image from IOByte into a numpy array.

    Puts image into numpy array to feed into tensorflow graph.
    Note that by convention we put it into a numpy array with shape
    (height, width, channels), where channels=3 for RGB.

    Args:
        iobyte: IOByte version of the image

    Returns:
        uint8 numpy array with shape (img_height, img_width, 3)
    """
    image = Image.open(iobyte)
    (im_width, im_height) = image.size
    return np.array(image.getdata()).reshape(
        (im_height, im_width, 3)).astype(np.uint8)

def get_model_detection_function(model):
    """Get a tf.function for detection."""

    @tf.function
    def detect_fn(image):
        """Detect objects in image."""

        image, shapes = model.preprocess(image)
        prediction_dict = model.predict(image, shapes)
        detections = model.postprocess(prediction_dict, shapes)

        return detections

    return detect_fn

def output_class(classes, scores, category_index, min_score_thresh=.5,):
    out_set = set({})
    for i in range(classes.shape[0]):
        if scores[i] > min_score_thresh:
            if classes[i] in viewkeys(category_index):
                class_name = category_index[classes[i]]['name']
                out_set.add(str(class_name))

    return " ".join(out_set)

# # config
# filenames = list(pathlib.Path(os.path.join(sys.path[0], 'api\\fine_tuned_model\checkpoint\\')).glob('*.index'))
# model_dir = str(filenames[-1]).replace('.index','')
# pipeline_config = os.path.join(sys.path[0], 'api\\fine_tuned_model\pipeline.config')
# configs = config_util.get_configs_from_pipeline_file(pipeline_config)
# model_config = configs['model']
# detection_model = model_builder.build(model_config=model_config, is_training=False)

# # restore checkpoint
# ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
# ckpt.restore(os.path.join(model_dir))
# detect_fn = get_model_detection_function(detection_model)

category_index = {1: {'id': 1, 'name': 'Apple'}, 2: {'id': 2, 'name': 'Apricot'}, 3: {'id': 3, 'name': 'Avocado'}, 4: {'id': 4, 'name': 'Banana'}, 
5: {'id': 5, 'name': 'Beetroot'}, 6: {'id': 6, 'name': 'Blueberry'}, 7: {'id': 7, 'name': 'Cactus'}, 8: {'id': 8, 'name': 'Cantaloupe'}, 
9: {'id': 9, 'name': 'Carambula'}, 10: {'id': 10, 'name': 'Cauliflower'}, 11: {'id': 11, 'name': 'Cherry'}, 12: {'id': 12, 'name': 'Chestnut'}, 
13: {'id': 13, 'name': 'Clementine'}, 14: {'id': 14, 'name': 'Cocos'}, 15: {'id': 15, 'name': 'Dates'}, 16: {'id': 16, 'name': 'Eggplant'}, 17: {'id': 17, 'name': 'Ginger'}, 
18: {'id': 18, 'name': 'Granadilla'}, 19: {'id': 19, 'name': 'Grape'}, 20: {'id': 20, 'name': 'Grapefruit'}, 21: {'id': 21, 'name': 'Guava'}, 22: {'id': 22, 'name': 'Hazelnut'}, 
23: {'id': 23, 'name': 'Huckleberry'}, 24: {'id': 24, 'name': 'Kaki'}, 25: {'id': 25, 'name': 'Kiwi'}, 26: {'id': 26, 'name': 'Kohlrabi'}, 27: {'id': 27, 'name': 'Kumquats'}, 
28: {'id': 28, 'name': 'Lemon'}, 29: {'id': 29, 'name': 'Limes'}, 30: {'id': 30, 'name': 'Lychee'}, 31: {'id': 31, 'name': 'Mandarine'}, 32: {'id': 32, 'name': 'Mango'}, 
33: {'id': 33, 'name': 'Mangostan'}, 34: {'id': 34, 'name': 'Maracuja'}, 35: {'id': 35, 'name': 'Melon'}, 36: {'id': 36, 'name': 'Mulberry'}, 37: {'id': 37, 'name': 'Nectarine'}, 
38: {'id': 38, 'name': 'Nut'}, 39: {'id': 39, 'name': 'Onion'}, 40: {'id': 40, 'name': 'Orange'}, 41: {'id': 41, 'name': 'Papaya'}, 42: {'id': 42, 'name': 'Passion'}, 
43: {'id': 43, 'name': 'Peach'}, 44: {'id': 44, 'name': 'Pear'}, 45: {'id': 45, 'name': 'Pepino'}, 46: {'id': 46, 'name': 'Pepper'}, 47: {'id': 47, 'name': 'Physalis'}, 
48: {'id': 48, 'name': 'Pineapple'}, 49: {'id': 49, 'name': 'Pitahaya'}, 50: {'id': 50, 'name': 'Plum'}, 51: {'id': 51, 'name': 'Pomegranate'}, 52: {'id': 52, 'name': 'Pomelo'}, 
53: {'id': 53, 'name': 'Potato'}, 54: {'id': 54, 'name': 'Quince'}, 55: {'id': 55, 'name': 'Rambutan'}, 56: {'id': 56, 'name': 'Raspberry'}, 57: {'id': 57, 'name': 'Redcurrant'}, 
58: {'id': 58, 'name': 'Salak'}, 59: {'id': 59, 'name': 'Strawberry'}, 60: {'id': 60, 'name': 'Tamarillo'}, 61: {'id': 61, 'name': 'Tangelo'}, 62: {'id': 62, 'name': 'Tomato'}, 63: {'id': 63, 'name': 'Walnut'}}

label_id_offset = 1

class imageUploadView(APIView):
    def post(self, request, format=None):
        # image_np = load_image_into_numpy_array(request.FILES['image'].file)
        # input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
        # detections = detect_fn(input_tensor)
        # out = output_class((detections['detection_classes'][0].numpy() + label_id_offset).astype(int),
        #     detections['detection_scores'][0].numpy(),
        #     category_index,
        #     min_score_thresh=.5)
        
        # return JsonResponse({results: out}, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_200_OK)