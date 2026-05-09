FROM node:24-bookworm-slim

# Evitar prompts interativos durante a instalação
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Sao_Paulo

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    zsh \
    fonts-powerline \
    fonts-noto-color-emoji \
    locales \
    procps \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    build-essential \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Configurar locale
RUN locale-gen en_US.UTF-8 pt_BR.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Criar usuário node se não existir e garantir permissões
RUN usermod -s /bin/zsh node || true

# Instalar Rust para compilar ferramentas nativas
USER root
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable
ENV PATH="/root/.cargo/bin:${PATH}"

# Instalar bat (cat com syntax highlighting)
RUN cargo install bat

# Instalar eza (sucessor do exa - ls moderno)
RUN cargo install eza

# Instalar fd-find (find moderno)
RUN cargo install fd-find

# Instalar ripgrep (grep moderno)
RUN cargo install ripgrep

# Instalar delta (diff melhorado)
RUN cargo install git-delta

# Criar diretórios de configuração para o usuário node
RUN mkdir -p /home/node/.config /home/node/.local/share/fonts /home/node/.zsh \
    && chown -R node:node /home/node

# Configurar workspace
WORKDIR /workspace

# Copiar scripts de instalação
COPY --chown=node:node .devcontainer/zsh/ /home/node/.zsh-setup/

# Ajustar permissões
RUN chown -R node:node /home/node

# Voltar ao usuário node
USER node

# Variáveis de ambiente para ferramentas Rust
ENV PATH="/home/node/.cargo/bin:${PATH}"

# Configurar bat
ENV BAT_THEME="Dracula"
ENV BAT_STYLE="numbers,changes,header"

# Aliases padrão para ferramentas modernas
ENV LS_COLORS="di=34;40:ln=36;40:so=35;40:pi=33;40:ex=32;40:bd=34;46:cd=34;43:su=0;41:sg=0;46:tw=0;42:ow=0;43:"

EXPOSE 3333

CMD ["zsh"]
