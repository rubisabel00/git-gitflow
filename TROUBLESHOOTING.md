# 🆘 Guía de Troubleshooting: Problemas Comunes en Git Flow

Soluciones rápidas para los problemas más comunes que encontrarás.

---

## 🚨 PROBLEMAS DE MERGE Y CONFLICTOS

### Problema: "Merge conflict in uno o varios archivos"

**Síntoma:**
```
Auto-merging archivo.js
CONFLICT (content): Merge conflict in archivo.js
Automatic merge failed; fix conflicts and then commit the result.
```

**Solución:**
```bash
# 1. Ver qué está en conflicto
git status

# 2. Abrir archivo conflictivo
# Buscar marcas:
# <<<<<<<< HEAD
# tu código
# ========
# código de otra rama
# >>>>>>> nombre-rama

# 3. Editar manualmente y elegir:
# Opción A: Mantener tu código
# Opción B: Mantener código de otra rama
# Opción C: Combinar ambos

# 4. Guardar archivo

# 5. Marcar como resuelto
git add archivo.js

# 6. Completar merge
git commit -m "Resolver conflictos de merge"

# 7. Push
git push origin nombre-rama
```

**Prevención:** 
```bash
# Antes de mergear, actualiza siempre
git pull origin develop
```

---

### Problema: "Merge abort fallido"

**Síntoma:**
Necesitas cancelar un merge en progreso pero no sabes cómo.

**Solución:**
```bash
# Abortar merge completamente
git merge --abort

# Si --abort no funciona
git reset --hard HEAD
```

---

### Problema: "Quiero deshacer un merge que ya hice"

**Síntoma:**
Ya mergeaste pero no era lo que querías.

**Solución Opción 1: Revert (Recomendado)**
```bash
# Ver commits recientes
git log --oneline

# Encontrar el merge commit (busca "Merge pull request")
# Ejemplo: abc123 Merge pull request #5: feature/button

# Revertir
git revert abc123 -m 1

# Esto crea un nuevo commit que deshace los cambios
git push origin rama
```

**Solución Opción 2: Reset (Si aún no está en producción)**
```bash
# Ver commits
git log --oneline

# Por ejemplo, quiero ir 1 commit atrás:
git reset --hard HEAD~1

# Force push (¡Cuidado en equipo!)
git push origin rama --force-with-lease
```

---

## 🔄 PROBLEMAS DE SINCRONIZACIÓN

### Problema: "Your branch is ahead of origin by N commits"

**Síntoma:**
```
On branch feature/login
Your branch is ahead of origin/feature/login by 3 commits.
```

**Solución:**
```bash
# Simplemente push
git push origin feature/login
```

---

### Problema: "Your branch has diverged"

**Síntoma:**
```
On branch develop
Your branch and 'origin/develop' have diverged.
```

**Solución:**
```bash
# Opción 1: Rebase (Historial lineal)
git pull origin develop --rebase

# Opción 2: Merge (Si ya compartiste cambios)
git pull origin develop

# Opción 3: Reset si no quieres tus cambios locales
git fetch origin
git reset --hard origin/develop
```

---

### Problema: "Rejected (non-fast-forward)"

**Síntoma:**
```
error: failed to push some refs to 'origin'
hint: Updates were rejected because the tip of your branch is behind
```

**Solución:**
```bash
# Traer cambios remotos
git pull origin rama

# Si hay conflictos, resolverlos:
git add .
git commit -m "Resolver conflictos"

# Luego push
git push origin rama
```

---

## ⚙️ PROBLEMAS DE RAMAS

### Problema: "Traté de cambiar de rama pero tengo cambios sin guardar"

**Síntoma:**
```
error: Your local changes to 'archivo.js' would be overwritten by checkout.
```

**Solución:**
```bash
# Opción 1: Guardar cambios
git stash

# Cambiar rama
git checkout otra-rama

# Volver y recuperar
git checkout rama-anterior
git stash pop

# Opción 2: Descartar cambios
git checkout .

# Cambiar rama
git checkout otra-rama
```

---

### Problema: "Eliminé una rama por accidente"

**Síntoma:**
```bash
git branch -D feature/importante  # ¡Oops!
```

**Solución:**
```bash
# Ver historial de referencias
git reflog

# Encontrar tu rama (busca en los commits)
# Ejemplo: abc123 checkout: moving from feature/importante to develop

# Recuperar rama
git checkout -b feature/importante abc123
```

---

### Problema: "Crear rama desde un commit antiguo"

**Síntoma:**
Necesitas crear una rama desde un commit del pasado.

**Solución:**
```bash
# Ver log
git log --oneline

# Crear rama desde commit específico
git checkout -b feature/nueva abc123def

# O si el commit está en una rama específica
git checkout -b feature/nueva origin/develop~5
# (~5 significa 5 commits atrás)
```

---

### Problema: "Merge conflict porque ambos editamos el mismo archivo"

**Síntoma:**
```
CONFLICT (content): Merge conflict in estilos.css
```

**Solución Usando Herramienta Visual:**
```bash
# Ver conflictos en modo visual
git mergetool

# Esto abre una herramienta visual (SourceTree, VSCode, etc.)
# Permite ver ambas versiones lado a lado
```

---

## 📝 PROBLEMAS DE COMMITS

### Problema: "Necesito editar el mensaje del último commit"

**Síntoma:**
Escribiste mal el mensaje.

**Solución:**
```bash
# Si no hiciste push aún
git commit --amend -m "Nuevo mensaje correcto"

# Si ya hiciste push
git commit --amend -m "Nuevo mensaje correcto"
git push origin rama --force-with-lease
```

---

### Problema: "Agregué archivo por accidente al commit"

**Síntoma:**
```
git add .
git commit -m "mensaje"
# ¡Mierda! Incluí package-lock.json
```

**Solución:**
```bash
# Deshacer commit pero mantener cambios
git reset --soft HEAD~1

# Remover archivo que no querías
git reset HEAD archivo-no-querido.txt

# Agregar de nuevo solo lo que querías
git add archivo-correcto.js

# Commit again
git commit -m "mensaje"
```

---

### Problema: "Quiero separar un commit en dos"

**Síntoma:**
Un commit tiene cambios de dos features diferentes.

**Solución:**
```bash
# Ver commits
git log --oneline

# Usando rebase interactivo
git rebase -i HEAD~5  # (Editar últimos 5 commits)

# En el editor que se abre, cambiar "pick" por "edit" donde quieras separar
# Guardar y cerrar

# Ahora estás en ese commit
# Resetear soft para deshacer pero mantener cambios
git reset --soft HEAD~1

# Agregar cambios por separado
git add parte1/

# Commit 1
git commit -m "feat: parte 1"

# Agregar parte 2
git add parte2/

# Commit 2
git commit -m "feat: parte 2"

# Continuar rebase
git rebase --continue
```

---

### Problema: "No puedo hacer commit, dice que hay cambios sin staging"

**Síntoma:**
```
On branch develop
Changes not staged for commit:
```

**Solución:**
```bash
# Ver cambios
git status

# Opción 1: Agregar todos los cambios
git add .

# Opción 2: Agregar archivo específico
git add archivo.js

# Ahora commit
git commit -m "mensaje"

# Opción 3: Si quieres descartar los cambios
git checkout .
```

---

## 🏷️ PROBLEMAS DE TAGS

### Problema: "Necesito crear una etiqueta cuya fecha atrás"

**Síntoma:**
Necesitas tagguear un commit pasado.

**Solución:**
```bash
# Ver commits
git log --oneline

# Crear tag en commit específico
git tag -a v1.0.0 abc123 -m "Release v1.0.0"

# Push
git push origin v1.0.0
```

---

### Problema: "Eliminé un tag por accidente"

**Síntoma:**
```
git tag -d v1.0.0  # ¡Oops!
```

**Solución:**
```bash
# Si aún no lo borraste del servidor:
git push origin v1.0.0

# Si ya lo borraste localmente:
git log --oneline  # Encontrar el commit

# Recrear el tag
git tag -a v1.0.0 abc123 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## 🔍 PROBLEMAS DE BÚSQUEDA/HISTORIAL

### Problema: "No sé en cuál rama está mi commit"

**Síntoma:**
Necesitas encontrar dónde terminó el commit que hiciste.

**Solución:**
```bash
# Ver todas las ramas que contienen un commit
git branch --contains abc123

# O si conoces parte del mensaje
git log --all --grep="palabra clave"

# Ver en qué rama estoy
git branch
```

---

### Problema: "Quiero ver qué cambió en el último merge"

**Síntoma:**
Necesitas revisar qué se incluía en el merge.

**Solución:**
```bash
# Ver commits que se mergearon
git log develop..feature/mi-rama

# Ver diferencias
git diff develop feature/mi-rama

# Ver diferencias en archivo específico
git diff develop feature/mi-rama -- archivo.js
```

---

## 🚀 PROBLEMAS DE PUSH/PULL

### Problema: "Permission denied (publickey)"

**Síntoma:**
```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Solución:**
```bash
# Verificar que tienes SSH configurado
ssh -T git@github.com

# Si no funciona, generar nuevo SSH key
ssh-keygen -t ed25519 -C "tu@email.com"

# Agregar a ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar public key a GitHub
cat ~/.ssh/id_ed25519.pub
# Copiar y pegar en GitHub Settings > SSH Keys
```

---

### Problema: "No puedo hacer pull, hay cambios locales"

**Síntoma:**
```
error: Your local changes to 'archivo.js' would be overwritten by merge.
```

**Solución:**
```bash
# Opción 1: Guardar cambios
git stash
git pull origin rama
git stash pop

# Opción 2: Crear commit con cambios
git add .
git commit -m "WIP: trabajo en progreso"
git pull origin rama

# Opción 3: Descartar cambios locales
git checkout .
git pull origin rama
```

---

### Problema: "Necesito un pull rebase en lugar de merge"

**Síntoma:**
Quieres historial lineal, no merges.

**Solución:**
```bash
# Una sola vez
git pull origin rama --rebase

# Hacerlo por defecto en la rama
git config branch.rama.rebase true

# Hacerlo global (todas las ramas)
git config --global pull.rebase true
```

---

## 🎯 PROBLEMAS DE FLUJO GIT FLOW

### Problema: "No sé si usar hotfix o feature"

**Decisión:**

| Tipo | Hotfix | Feature |
|------|--------|---------|
| ¿Es urgente? | **SÍ** → Hotfix | NO → Feature |
| ¿En producción? | **SÍ** → Hotfix | NO → Feature |
| ¿Puede esperar release? | **NO** → Hotfix | **SÍ** → Feature |
| ¿Requiere testing completo? | Prueba rápida | Test completo |

---

### Problema: "Accidentalmente hice hotfix desde develop en lugar de main"

**Síntoma:**
```bash
# Hiciste esto (INCORRECTO):
git checkout -b hotfix/bug develop  # ❌

# En lugar de esto (CORRECTO):
git checkout -b hotfix/bug main     # ✓
```

**Solución:**
```bash
# Eliminar rama incorrecta
git branch -D hotfix/bug

# Crear correctamente
git checkout -b hotfix/bug main

# Hacer los cambios
# ...

# Completar correctamente
```

---

### Problema: "Release stuck - no puedo mergear"

**Síntoma:**
Hay demasiados conflictos al tratar de mergear release a main.

**Solución:**
```bash
# Ver qué cambió en ambas ramas
git diff develop main

# Estrategia: resolver conflictos en release antes de mergear
git checkout release/vX.Y.Z
git merge --no-ff develop

# Resolver conflictos
# ...

# Completar merge
git add .
git commit -m "Sync con develop"

# Ahora mergear a main debería ser clean
git checkout main
git merge --no-ff release/vX.Y.Z
```

---

## 💾 PROBLEMAS DE RECUPERACIÓN

### Problema: "¡Perdi mis cambios con reset --hard!"

**Síntoma:**
```
git reset --hard HEAD~5  # ¡NOOOOO!
```

**Solución (Casi siempre funciona):**
```bash
# Ver TODAS las acciones recientes
git reflog

# Encontrar el commit que querías mantener:
# abc123 HEAD@{0}: commit: mi cambio
# def456 HEAD@{1}: commit: otro cambio
# ghi789 HEAD@{2}: reset: moving to HEAD~5

# Volver a ese punto
git reset --hard abc123

# ¡Voilá! Recuperado!
```

---

### Problema: "Necesito rescatar un archivo de un commit anterior"

**Síntoma:**
Eliminaste un archivo hace 3 commits y lo necesitas de vuelta.

**Solución:**
```bash
# Ver historial del archivo
git log --oneline archivo.js

# Ver el archivo en commit específico
git show abc123:ruta/archivo.js

# Restaurar archivo completo
git checkout abc123 ruta/archivo.js

# Commit restauración
git add ruta/archivo.js
git commit -m "Restaurar archivo eliminado"
```

---

## 📊 PROBLEMAS COMPLEJOS

### Problema: "Necesito aplicar solo algunos commits de otra rama"

**Síntoma:**
Quieres cherry-pick pero hay dependencias.

**Solución:**
```bash
# Ver commits a considerar
git log origin/rama-origen --oneline

# Cherry-pick en orden correcto
git cherry-pick abc123  # Commit 1
git cherry-pick def456  # Commit 2

# Si hay conflictos
# Resolver...
git add .
git cherry-pick --continue

# Si falla todo
git cherry-pick --abort
```

---

### Problema: "Historia de rama muy compleja"

**Síntoma:**
Tu rama tiene muchos commits frágeis y quieres limpiar.

**Solución: Squash interactivo**
```bash
# Combinar últimos 5 commits en 1
git rebase -i HEAD~5

# En el editor:
# pick abc123 Commit 1
# squash def456 Commit 2
# squash ghi789 Commit 3
# ...

# Guardar y cerrar
# Se crea 1 commit con todos los cambios

git push origin rama --force-with-lease
```

---

## 🎓 CHECKLIST DE RECUPERACIÓN

Cuando todo falla:

```
¿Perdí cambios?
└─ ¿Estaban commiteados?
   ├─ SÍ → git reflog (buscar commit)
   └─ NO → Usualmente no recuperable

¿Qué necesito?
├─ Recuperar rama: git reflog + git checkout
├─ Recuperar archivo: git show + git restore
├─ Recuperar commits: git cherry-pick
└─ Resetear todo: git reset --hard

¿Cuál es el commit que necesito?
└─ git log --all --graph
└─ git reflog
└─ git show <hash>
```

---

## 🆘 ÚLTIMA INSTANCIA

Si nada funciona:

```bash
# 1. Clonar repo nuevo
git clone <REPO>

# 2. Tu trabajo está en algún lado
git reflog HEAD  # En repo viejo

# 3. Encontrar tu commit
# 4. Cherry-pick a nueva copia

# 5. Si todo falla, usar GitHub backup
#    (GitHub mantiene backup 3 meses)
```

---

**Recuerda:** 
- Git casi siempre te deja recuperar lo que hiciste
- `git reflog` es tu mejor amigo
- Antes de operaciones destructivas, haz backup
- Cuando dudes, pregunta a un compañero

¡Éxito! 🎉
