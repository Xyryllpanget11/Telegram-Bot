# Uzuki Mikata Telegram Bot SRC
A simple Telegram Chatbot using the OpenAI API, hosted and pay by yourself, 
 
## Screenshots
![](./demo.png)

## Available Services
| Name    | Description                                         | Chat Command |
|---------|-----------------------------------------------------|--------------|
| DALL·E  | Prompt to generate an image                         | /imgsearch          |
| GPT-3.5 | gpt-3.5-turbo                                       | /ai         |
| GPT-4   | gpt-4                                               | /ai2          |
| GPT-JB  | GPT-3.5-turbo, with [DAN] Jailbreak prompt included | /mist          |

## Run with Docker

docker-compose.yml
```
version: "3"
services:

  chatgpt:
    image: johnnyip/telegram-openai-bot:latest
    environment:
      - TELEGRAM_BOT_TOKEN=YOUR_OWN_TOKEN_FROM_TELEGRAM
      - OPENAI_API_KEY=YOUR_OWN_KEY_FROM_OPENAI
```
