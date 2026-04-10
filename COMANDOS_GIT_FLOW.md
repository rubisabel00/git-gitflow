# 🔧 Referencia Rápida: Comandos Git Flow

Guía de referencia rápida con los comandos más comunes en Git Flow.

## 📑 Tabla de Contenidos
1. [Configuración Inicial](#configuración-inicial)
2. [Git Flow Básico](#git-flow-básico)
3. [Feature Branches](#feature-branches)
4. [Release Branches](#release-branches)
5. [Hotfix Branches](#hotfix-branches)
6. [Merge y Resolución de Conflictos](#merge-y-resolución-de-conflictos)
7. [Comandos Útiles](#comandos-útiles)

---

## Configuración Inicial

### Instalar Git
```bash
# En Windows (con Chocolatey)
choco install git

# En macOS (con Homebrew)
brew install git

# En Linux (Debian/Ubuntu)
sudo apt-get install git
```

### Configurar Identidad
```bash
# Configuración global
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Configuración local (solo para este repositorio)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Ver configuración
git config --list
git config user.name
```

### Instalar Git Flow (opcional pero recomendado)
```bash
# En macOS
brew install git-flow

# En Windows
# Descargar desde: https://github.com/nvie/gitflow/wiki/Installation

# En Linux
sudo apt-get install git-flow
```

---

## Git Flow Básico

### Inicializar con Git Flow
```bash
# Inicializar repositorio
git init

# Inicializar git-flow
git flow init -d  # Con opciones por defecto

# Esto crea:
# - Rama develop (si no existe)
# - Configuración de prefijos de ramas
```

### Clonar Repositorio Existente
```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Cambiar a directorio del proyecto
cd nombre-del-proyecto

# Traer rama develop
git checkout develop

# O si usas git-flow
git flow init -d
```

---

## Feature Branches

### Crear Feature
```bash
# Con git-flow
git flow feature start nombre-de-la-caracteristica

# Sin git-flow (manual)
git checkout -b feature/nombre-de-la-caracteristica develop

# Ejemplo
git flow feature start login-usuarios
```

### Trabajar en Feature
```bash
# Editar archivos...
# Luego:

git add .
git commit -m "Mensaje descriptivo del cambio"

# Ver estado
git status

# Ver cambios
git diff

# Enviar cambios al repositorio remoto
git push origin feature/nombre-de-la-caracteristica
```

### Completar Feature (Merge en develop)
```bash
# Con git-flow
git flow feature finish nombre-de-la-caracteristica

# Sin git-flow (manual)
git checkout develop
git merge --no-ff feature/nombre-de-la-caracteristica
git branch -d feature/nombre-de-la-caracteristica
git push origin develop

# Ejemplo paso a paso
git checkout develop
git pull origin develop
git merge --no-ff feature/login-usuarios
git push origin develop
git branch -d feature/login-usuarios
git push origin --delete feature/login-usuarios
```

### Ver Features en Progreso
```bash
# Todas las características locales
git branch -a | grep feature

# O con git-flow
git flow feature
```

---

## Release Branches

### Crear Release
```bash
# Con git-flow
git flow release start v1.2.0

# Sin git-flow (manual)
git checkout -b release/v1.2.0 develop

# Ejemplo
git flow release start 1.2.0
```

### En Release Branch
```bash
# Solo cambios menores: actualizar versión, arreglos de bugs
# Editar archivos...

git add .
git commit -m "Bump version to 1.2.0"

# Enviar cambios
git push origin release/v1.2.0
```

### Completar Release (Merge en main y develop)
```bash
# Con git-flow
git flow release finish v1.2.0
# (Se abre editor para etiquetar)

# Sin git-flow (manual):
# Primero merge en main
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin main
git push origin v1.2.0

# Luego merge en develop
git checkout develop
git merge --no-ff release/v1.2.0
git push origin develop

# Eliminar rama
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

---

## Hotfix Branches

### Crear Hotfix (para bugs críticos en producción)
```bash
# Con git-flow
git flow hotfix start v1.2.1

# Sin git-flow (manual)
git checkout -b hotfix/v1.2.1 main

# Ejemplo
git flow hotfix start 1.2.1
```

### Arreglar el Bug
```bash
# Editar archivo con el bug...
# Actualizar versión...

git add .
git commit -m "Fix: corregir error crítico en pago"

# Enviar cambios
git push origin hotfix/v1.2.1
```

### Completar Hotfix (Merge en main y develop)
```bash
# Con git-flow
git flow hotfix finish v1.2.1

# Sin git-flow (manual):
# Primero merge en main
git checkout main
git merge --no-ff hotfix/v1.2.1
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git push origin main
git push origin v1.2.1

# Luego merge en develop
git checkout develop
git merge --no-ff hotfix/v1.2.1
git push origin develop

# Eliminar rama
git branch -d hotfix/v1.2.1
git push origin --delete hotfix/v1.2.1
```

---

## Merge y Resolución de Conflictos

### Merge Con Merge Commit (Recomendado para Git Flow)
```bash
# Cambiarse a rama destino
git checkout develop

# Traer cambios remotos
git pull origin develop

# Hacer merge preservando historial
git merge --no-ff feature/mi-rama

# Enviar cambios
git push origin develop
```

### Resolver Conflictos
```bash
# Ver archivos con conflictos
git status

# Ver detalles de conflictos
git diff

# Editar archivos conflictivos manualmente...
# Buscar marcas: <<<<<<<, =======, >>>>>>>

# Después de resolver:
git add .
git commit -m "Resolver conflictos del merge"
git push origin develop
```

### Abortar un Merge
```bash
# Si algo sale mal durante el merge
git merge --abort
```

### Rebase (Alternativa a Merge)
```bash
# Aplicar commits de feature sobre develop
git checkout feature/mi-rama
git rebase develop

# Si hay conflictos:
git status  # Ver conflictos
# Editar archivos...
git add .
git rebase --continue

# O cancelar
git rebase --abort
```

---

## Comandos Útiles

### Ver Ramas
```bash
# Ramas locales
git branch

# Todas las ramas (local + remoto)
git branch -a

# Ramas remoto
git branch -r

# Información de ramas
git branch -v
```

### Ver Historial
```bash
# Historial simple
git log

# Historial en una línea
git log --oneline

# Historial con gráfico de ramas
git log --oneline --graph --all

# Historial de rama específica
git log origin/develop

# Últimos N commits
git log -n 5

# Histórico de un archivo
git log archivo.txt
```

### Ver Diferencias
```bash
# Cambios no staged
git diff

# Cambios staged
git diff --cached

# Diferencias entre ramas
git diff develop feature/mi-rama

# Cambios entre commits
git diff abc123..def456
```

### Deshacer Cambios
```bash
# Descartar cambios en archivo
git checkout archivo.txt

# Descartar todos los cambios
git checkout .

# Unstage archivo
git reset archivo.txt

# Unstage todo
git reset

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1

# Deshacer último commit (perder cambios)
git reset --hard HEAD~1

# Crear commit que revierte otro
git revert abc123
```

### Stash (Guardar cambios temporalmente)
```bash
# Guardar cambios
git stash

# Guardar con mensaje
git stash save "descripción"

# Ver stashes guardados
git stash list

# Recuperar último stash
git stash pop

# Recuperar stash específico
git stash apply stash@{0}

# Eliminar stash
git stash drop
```

### Cambiar de Rama Seguro
```bash
# Ver cambios antes de cambiar
git status

# Si hay cambios, guardarlos
git stash

# Cambiar rama
git checkout develop

# Recuperar cambios
git stash pop
```

### Push y Pull Avanzados
```bash
# Push de una rama específica
git push origin feature/mi-rama

# Push de todas las ramas
git push origin --all

# Push de etiquetas
git push origin --tags

# Pull con rebase en lugar de merge
git pull --rebase origin develop

# Fetch sin merge
git fetch origin

# Fetch y prune (eliminar referencias remotas eliminadas)
git fetch origin --prune
```

### Etiquetas (Tags)
```bash
# Crear etiqueta anotada
git tag -a v1.2.0 -m "Version 1.2.0"

# Crear etiqueta ligera
git tag v1.2.0

# Ver etiquetas
git tag

# Ver etiqueta específica
git show v1.2.0

# Push etiqueta
git push origin v1.2.0

# Push todas las etiquetas
git push origin --tags

# Eliminar etiqueta local
git tag -d v1.2.0

# Eliminar etiqueta remota
git push origin --delete v1.2.0
```

### Buscar y Filtrar
```bash
# Buscar commit por mensaje
git log --grep="texto"

# Buscar commit por autor
git log --author="nombre"

# Commits desde fecha
git log --since="2 weeks ago"

# Commits hasta fecha
git log --until="2023-12-31"

# Buscar texto en cambios
git log -S "variable_name"
```

### Información Remota
```bash
# Ver repositorios remotos
git remote -v

# Agregar remoto
git remote add origin <URL>

# Cambiar URL remota
git remote set-url origin <NUEVA_URL>

# Información del remoto
git remote show origin

# Eliminar remoto
git remote remove origin
```

---

## 📋 Cheat Sheet: Flujo Típico de Desarrollo

```bash
# 1. Clonar o inicializar
git clone <URL> && cd proyecto
git flow init -d

# 2. Crear feature
git flow feature start usuario-registro

# 3. Editar y fazer commits
echo "código aquí" >> app.js
git add .
git commit -m "Agregar formulario de registro"
git push origin feature/usuario-registro

# 4. Completar feature
git flow feature finish usuario-registro

# 5. Cuando está listo para release
git flow release start 1.1.0

# 6. Editar version, hacer pruebas
# ...

# 7. Completar release
git flow release finish 1.1.0

# 8. Si hay bug crítico
git flow hotfix start 1.1.1
# Arreglar bug
git flow hotfix finish 1.1.1
```

---

## 🆘 Guía de Solución de Problemas

### Problema: "Your branch is ahead of origin/main"
```bash
# Enviar cambios al repositorio remoto
git push origin main
```

### Problema: "Rejection (non-fast-forward)"
```bash
# Traer últimos cambios primero
git pull origin develop

# Si hay conflictos, resolverlos
# Luego push
git push origin develop
```

### Problema: Cambié de rama pero tengo cambios sin guardar
```bash
# Guardar antes de cambiar
git stash

# Cambiar rama
git checkout otra-rama

# Cambiar de vuelta y recuperar
git checkout rama-original
git stash pop
```

### Problema: Perder cambios accidentalmente
```bash
# Ver todos los commits (incluso los eliminados)
git reflog

# Recuperar commit
git checkout abc123
```

---

## 📚 Recursos Adicionales

- **Git Official**: https://git-scm.com
- **Git Flow Docs**: https://github.com/nvie/gitflow
- **Pro Git Book**: https://git-scm.com/book/es/v2
- **Interactive Git Tutorial**: https://learngitbranching.js.org/

---

**¡Recuerda!** Practica regularmente y consulta `git help <comando>` para más detalles.
