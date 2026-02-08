# Stage 1: Builder
FROM python:3.9-slim as builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Runner
FROM python:3.9-slim

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /root/.local /root/.local

# Copy application code
COPY . .

# Add local bin to PATH
ENV PATH=/root/.local/bin:$PATH

EXPOSE 5000

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
