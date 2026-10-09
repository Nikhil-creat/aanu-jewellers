FROM python:3.11-slim
WORKDIR /app
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu
COPY ml/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "import torchvision; torchvision.models.resnet18(weights='IMAGENET1K_V1')"
COPY ml/app.py .
ENV IMG_DIR=/data/t
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
