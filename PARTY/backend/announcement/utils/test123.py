def create(self, validated_data):
    serializer = self.get_serializer(data=self.request.data)
    user_id =  self.request.data.pop('user')
    user_instance = get_object_user().objects.filter(id=user_id).first()
    if not serializer.is_valid():
        print (serializer.errors)
    data = serializer.validated_data
    serializer.save(user=user_instance)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)