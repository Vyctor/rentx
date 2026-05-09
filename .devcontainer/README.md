# 🚀 RentX Dev Container

Ambiente de desenvolvimento containerizado com ferramentas modernas.

## 📋 Requisitos

- [VS Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Docker](https://docs.docker.com/get-docker/)

## 🎯 Iniciando

### Opção 1: VS Code Dev Containers (Recomendado)

1. Abra o projeto no VS Code
2. Pressione `F1` ou `Ctrl+Shift+P`
3. Digite: `Dev Containers: Reopen in Container`
4. Aguarde o build e configuração

### Opção 2: Docker Compose

```bash
docker-compose up -d devcontainer
docker-compose exec devcontainer zsh
```

## 🎨 Ferramentas Configuradas

### Shell

- **Zsh** - Shell moderno
- **Zinit** - Gerenciador de plugins
- **Powerlevel10k** - Tema minimalista e rápido

### Plugins Zsh

- `zsh-syntax-highlighting` - Syntax highlighting em tempo real
- `zsh-autosuggestions` - Sugestões automáticas baseadas no histórico
- `zsh-completions` - Completions adicionais
- `zsh-history-substring-search` - Busca no histórico
- `fzf-tab` - Completions com preview

### 🦀 Ferramentas Rust

| Comando | Descrição | Alias |
|---------|-----------|-------|
| `eza` | `ls` moderno com ícones | `ls`, `ll`, `la`, `lt` |
| `bat` | `cat` com syntax highlighting | `cat`, `less` |
| `fd` | `find` moderno | `find` |
| `rg` | `grep` moderno e rápido | `grep` |
| `delta` | `diff` melhorado para git | - |

### 🔧 Aliases Úteis

#### Sistema

```bash
alias ls="eza --icons --group-directories-first"
alias ll="eza --icons --group-directories-first -la"
alias cat="bat --paging=never"
alias find="fd"
alias grep="rg"
```

#### Node/NPM

```bash
alias nr="npm run"
alias ni="npm install"
alias nrs="npm run start"
alias nrd="npm run dev"
alias nrt="npm run test"
```

#### Docker

```bash
alias d="docker"
alias dc="docker-compose"
alias dps="docker ps --format ..."
```

## 🔌 Portas

| Porta | Serviço | Descrição |
|-------|---------|-----------|
| 3333 | API | Servidor Node.js |
| 5432 | PostgreSQL | Banco de dados |

## 📝 Comandos Úteis

```bash
# Recarregar configuração Zsh
source ~/.zshrc

# Ver ferramentas instaladas
eza --version
bat --version
fd --version
rg --version

# Configurar Powerlevel10k (se desejar customizar)
p10k configure
```

## 🎭 Tema Powerlevel10k

O tema está configurado no modo **lean** (minimalista). Para personalizar:

```bash
p10k configure
```

## 🐛 Troubleshooting

### Rebuild do container

```bash
# No VS Code
F1 → "Dev Containers: Rebuild Container"

# Ou manualmente
docker-compose down
docker-compose up -d --build devcontainer
```

### Problemas com Zsh

```bash
# Reinstalar configuração
rm -rf ~/.zshrc ~/.p10k.zsh ~/.zinit
.devcontainer/zsh/install-zsh-tools.sh
source ~/.zshrc
```

## 📂 Estrutura

```markdown
.devcontainer/
├── devcontainer.json      # Config VS Code
├── Dockerfile             # Imagem Dev
├── zsh/
│   └── install-zsh-tools.sh  # Setup Zsh
└── README.md              # Este arquivo
```
