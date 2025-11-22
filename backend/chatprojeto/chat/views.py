from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .serializers import MessageSerializer

class MessageListCreate(APIView):
    def get(self, request):
        sender = request.query_params.get("sender")
        if sender:
            msgs = Message.objects.filter(sender=sender).order_by("created_at")
        else:
            msgs = Message.objects.all().order_by("created_at")
        return Response(MessageSerializer(msgs, many=True).data)

    def post(self, request):
        sender = request.data.get("sender")
        content = (request.data.get("content") or "").strip()

        # validação
        if sender not in ["A", "B"] or not content:
            return Response(
                {"error": "sender must be A or B and content non-empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # cria a mensagem do usuário
        user_msg = Message.objects.create(
            sender=sender,
            content=content
        )

        # cria a resposta automática do sistema
        sys_msg = Message.objects.create(
            sender="SYS",
            content=f"Obrigado por seu contato Usuário {sender}! Em breve responderemos.",
            reply_to_user=sender,
        )

        return Response(
            {
                "sent": MessageSerializer(user_msg).data,
                "reply": MessageSerializer(sys_msg).data,
            },
            status=status.HTTP_201_CREATED
        )
