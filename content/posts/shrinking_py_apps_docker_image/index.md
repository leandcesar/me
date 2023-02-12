---
title: Imagem Docker menores
description: Reduza a imagem do Docker do seu aplicativo Python
date: 2022-08-16
draft: false
slug: /pills/shrinking-py-apps-docker-image
tags:
  - Docker
  - Python
---

![A cat riding a blue whale](./cover.png)

## Conteúdo

Antes, priorize a segurança, capacidade de depuração e a reprodutibilidade das suas imagens. Apenas com isso feito, dedique tempo reduzindo o tamanho da imagem.

Os principais pontos a se revisar são:

- **Imagem base**: use as imagens `slim`. As `alpine` são lentas e ruins para Python, e as `distroless`, apesar de pequenas, tem suporte experimental para Python 3.

- **Camadas (layers)**: sempre que possível combine comandos, para os arquivos temporários não terminarem na imagem. Utilize `docker history` para ver o tamanho de cada camada. **CUIDADO**: ao mesmo tempo diminui o tamanho, pode deixar a construção mais lenta.

  > A combinação de camandas não funciona entre comandos `COPY` e `RUN`, tente resolver isso com o [**docker-squash**](https://github.com/goldmann/docker-squash).

- **Estágios**: use compilações em vários estágios, por exemplo, uma imagem que contrói tudo e outra que possui apenas os artefatos finais para execução.

- **Ordenação**: quando uma etapa é alterada, o cache do Docker é invalidado para a etapa atual e todas as subsequentes. Portanto, mantenha arquivos que mudam com frequência no final.

- **Pacotes**: adicione a flag `--no-cache-dir` no comando `pip install` e use algum sistema de cache como `BuildKit` ou CI (por exemplo, o [**GitHub Actions**](https://github.com/actions/setup-python#caching-packages-dependencies))

- **Cópia de arquivos**: verifique se o `COPY` está adicionando arquivos desnecessários na sua imagem. Use o arquivo `.dockerignore`.

## Exemplo

Uma imagem grande:

```dockerfile
FROM python:3.9-slim
RUN apt-get update
RUN apt-get install -y --no-install-recommends gcc
COPY myapp/ .
RUN python setup.py install
RUN apt-get remove -y gcc
RUN apt-get -y autoremove
CMD ['myapp']
```

Uma imagem menor (usando _virtualenv_):

```dockerfile
FROM python:3.9-slim AS compile-image
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential gcc
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM python:3.9-slim AS build-image
COPY --from=compile-image /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
CMD ['myapp']
```

## Bônus

Duas ferramentas úteis para explorar e otimizar suas imagens são [**docker-slim**](https://github.com/docker-slim/docker-slim) e [**dive**](https://github.com/wagoodman/dive).

## Referências

- <https://pythonspeed.com/articles/smaller-python-docker-images/>
- <https://pythonspeed.com/articles/multi-stage-docker-python/>
- <https://testdriven.io/blog/docker-best-practices/#dont-store-secrets-in-images>
