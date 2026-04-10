# 📚 Guía de Escenarios Prácticos: Git Flow

Una colección de escenarios reales que encontrarás desarrollando con Git Flow.

---

## Escenario 1: Tu Primer Feature 🌱

### Situación
Eres nuevo en el proyecto. Tu líder te pide que agregues un formulario de contacto.

### Paso a Paso

**1. Actualiza tu develop local**
```bash
git checkout develop
git pull origin develop
```

**2. Crea un feature branch**
```bash
git checkout -b feature/contact-form develop
```

**3. Crea el archivo del componente**
```bash
touch contact-form.js
# Editar el archivo con tu código...
```

**4. Commit tus cambios**
```bash
git add contact-form.js
git commit -m "feat: agregar formulario de contacto

- Crear componente ContactForm
- Validar email y teléfono
- Conectar con API de emails"
```

**5. Sube tu rama**
```bash
git push origin feature/contact-form
```

**6. Crea un Pull Request en GitHub**
- Abre GitHub
- Haz clic en "Create Pull Request"
- Describe qué hiciste
- Espera revisión

**7. Cuando está aprobado, completa el feature**
```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/contact-form
git push origin develop
git branch -d feature/contact-form
git push origin --delete feature/contact-form
```

---

## Escenario 2: Trabajar en Equipo (Conflictos) 🔄

### Situación
Tu compañero también trabajaba en una feature y ya la mergó. Ahora tienes conflicto.

### Síntomas
```
Auto-merging utils.js
CONFLICT (content): Merge conflict in utils.js
Automatic merge failed; fix conflicts and then commit the result.
```

### Solución

**1. Ve el estado**
```bash
git status
# Ves: both modified: utils.js
```

**2. Abre utils.js y busca los conflictos**
```
<<<<<<<< HEAD
  function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }
========
  function emailValidator(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
>>>>>>> feature/email-validation
```

**3. Resuelve manualmente**
Decide cuál versión usar (o combina ambas):
```javascript
function validateEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
```

**4. Marca como resuelto**
```bash
git add utils.js
git commit -m "Resolver conflicto: función validateEmail
- Usar versión simplificada de validateEmail
- Remover validador duplicado"
```

**5. Continúa con el merge**
```bash
git push origin develop
```

---

## Escenario 3: Release a Producción 🚀

### Situación
Es viernes, necesitas lanzar la versión 2.0.0 a producción.

### Paso a Paso

**1. Verifica que develop está listo**
```bash
git checkout develop
git pull origin develop

# Ver que todo los tests pasen
npm test
# o
python manage.py test
```

**2. Crea release branch**
```bash
git checkout -b release/v2.0.0 develop
```

**3. Actualiza versión en archivos**
```bash
# Editar package.json, version.py, etc.
# Cambiar versión a 2.0.0

git add .
git commit -m "Bump version to 2.0.0"
```

**4. Actualiza CHANGELOG**
```bash
# Editar CHANGELOG.md o HISTORY.md
# Agregar:
# ## v2.0.0 - 2024-01-15
# 
# ### New Features
# - Nuevo sistema de autenticación
# - Dashboard mejorado
# 
# ### Bug Fixes
# - Corregido bug de sincronización

git add CHANGELOG.md
git commit -m "docs: update changelog for v2.0.0"
```

**5. Pruebas finales**
```bash
npm test
# Si falla, arréglalo:
# editar archivo...
git add .
git commit -m "fix: arreglado test de email validation"
```

**6. Mergea a main**
```bash
git checkout main
git pull origin main
git merge --no-ff release/v2.0.0
```

**7. Crea etiqueta**
```bash
git tag -a v2.0.0 -m "Version 2.0.0 - Autenticación renovada"
git push origin main --tags
```

**8. Mergea de vuelta a develop**
```bash
git checkout develop
git pull origin develop
git merge --no-ff release/v2.0.0
git push origin develop
```

**9. Limpia**
```bash
git branch -d release/v2.0.0
git push origin --delete release/v2.0.0
```

**10. Deploy a producción** 🎉
```bash
# Depende de tu configuración:
# - GitHub Actions
# - Jenkins
# - Manual SSH
# etc.
```

---

## Escenario 4: BUG CRÍTICO EN PRODUCCIÓN 🚨

### Situación
Un usuario reporta que el pago no procesa. ¡Es crítico!

### Acción Inmediata

**1. Crea hotfix branch DESDE main**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/payment-crash main
```

**2. Identifica y arregla el bug**
```bash
# Editar payment.js
# El problema: variable 'amount' no está definida
# Cambiar payment.js:

# ANTES:
function processPayment(order) {
  const total = amount * tax;  // ❌ 'amount' es undefined
}

# DESPUÉS:
function processPayment(order) {
  const total = order.amount * order.tax;  # ✅ Correcto
}

git add payment.js
git commit -m "fix: corregir cálculo de total en pago

- Usar order.amount en lugar de variable undefined
- Previene crash cuando se procesa pago
- Fixes #456"
```

**3. Test rápido**
```bash
npm test -- payment.test.js

# ✓ Debería pasar
```

**4. Mergea a main**
```bash
git checkout main
git merge --no-ff hotfix/payment-crash
git tag -a v2.0.1 -m "Hotfix: corregir crash en pagos"
git push origin main --tags
```

**5. IMPORTANTE: Mergea a develop también**
```bash
git checkout develop
git merge --no-ff hotfix/payment-crash
git push origin develop
```

**6. Limpia**
```bash
git branch -d hotfix/payment-crash
git push origin --delete hotfix/payment-crash
```

**7. Deploy inmediato**
```bash
# Deploy a producción (esto es rápido)
# El hotfix está en main y etiquetado como v2.0.1
```

**Resultado:**
- ✅ Bug arreglado en producción
- ✅ develop actualizada para no perder el fix
- ✅ main vuelve a ser estable
- ✅ Nueva versión v2.0.1 en lugar de v2.0.0

---

## Escenario 5: Varias Features en Paralelo 👥

### Situación
Trabajas en un equipo de 3. Todos tienen features diferentes.

```
Team:
- Tú: feature/user-dashboard
- Juan: feature/api-rest
- María: feature/notifications
```

### Manejo

**1. Todos crean sus branches**
```bash
# Tu rama
git checkout -b feature/user-dashboard develop

# Juan hace en su máquina
git checkout -b feature/api-rest develop

# María hace en su máquina
git checkout -b feature/notifications develop
```

**2. Cada uno trabaja independientemente**
```bash
# Tú trabajas en tu rama
git add .
git commit -m "feat: agregar dashboard"
git push origin feature/user-dashboard

# Juan trabaja en la suya (en su máquina)
git add .
git commit -m "feat: implementar endpoints REST"
git push origin feature/api-rest

# María trabaja en la suya (en su máquina)
git add .
git commit -m "feat: sistema de notificaciones"
git push origin feature/notifications
```

**3. Todos hacen Pull Requests y se revisan reciprocamente**
```
PR 1: feature/user-dashboard (Tu PR)
PR 2: feature/api-rest (PR de Juan)
PR 3: feature/notifications (PR de María)
```

**4. Cuando todos están aprobados, mergeán en orden**
```bash
# Primero María (sin dependencias)
git checkout develop
git pull origin develop
git merge --no-ff feature/notifications
git push origin develop
git branch -d feature/notifications

# Luego Juan (las notificaciones pueden usarlas)
git checkout develop
git pull origin develop
git merge --no-ff feature/api-rest
git push origin develop
git branch -d feature/api-rest

# Finalmente Tú (usa ambas)
git checkout develop
git pull origin develop
git merge --no-ff feature/user-dashboard
git push origin develop
git branch -d feature/user-dashboard
```

**Resultado:** Las 3 features están en develop, listas para ir a release.

---

## Escenario 6: Revertir Cambios 🔙

### Situación
Mergeaste una feature, pero tiene un bug que solo se vio en producción.

### Opción 1: Revertir commit (Recomendado para Git Flow)

```bash
# Ver commits recientes
git log --oneline

# Encontrar el merge commit
# 5f3e2a1 Merge pull request #42: feature/login

# Revertir
git revert 5f3e2a1 -m 1

# Esto crea un NUEVO commit que revierte los cambios
# -m 1 significa "revierte al primer parent" (develop)

# Push
git push origin develop
```

### Opción 2: Reset (Uso cuidadoso - solo si NO está en producción)

```bash
# ⚠️  SOLO SI EL COMMIT NO ESTÁ EN PRODUCTION ⚠️

# Ver historial
git log --oneline

# Reset al commit anterior
git reset --soft HEAD~1

# Esto descarta el merge pero mantiene los cambios

# O si quieres descartar todo:
git reset --hard HEAD~1
```

---

## Escenario 7: Branch Demasiado Antiguo ⏰

### Situación
Tu feature/new-feature se quedó 2 meses sin actualizarse. Desarrolló desviación.

### Solución: Rebase

```bash
# Actualiza develop
git checkout develop
git pull origin develop

# Vuelve a tu rama
git checkout feature/new-feature

# Rebase sobre develop
git rebase develop

# Si hay conflictos:
git status  # Ver conflictos
# Editar archivos...
git add .
git rebase --continue

# Force push (porque reescribimos historial)
git push origin feature/new-feature --force-with-lease
```

---

## Escenario 8: Cambios en Otro Branch Que Necesitas 🔗

### Situación
María en feature/api-rest hizo funciones que tú necesitas en feature/dashboard.

### Solución: Cherry-pick

```bash
# Ver commits de María
git log origin/feature/api-rest --oneline

# Ver qué commits quieres
# 3a2b1c0 Implement AuthService
# 2b1c0a9 Add API client
# 1c0a9b8 Setup axios

# En tu rama
git checkout feature/user-dashboard

# Traer solo los commits que necesitas
git cherry-pick 3a2b1c0
git cherry-pick 2b1c0a9
git cherry-pick 1c0a9b8

# Push
git push origin feature/user-dashboard
```

---

## Escenario 9: Mensaje de Commit Incorrecto 📝

### Situación
Mandaste un commit con mensaje mal escrito.

### Arreglar el Último Commit

```bash
# Cambiar mensaje del último commit (no compartido)
git commit --amend -m "feat: nuevo mensaje correcto"

# Si ya fue compartido:
git push origin feature/nombre --force-with-lease
```

---

## Escenario 10: Sincronizar Branch Local Viejo 🔄

### Situación
Tu develop local está mal, necesitas sincronizar.

```bash
# Traer última versión remota
git fetch origin

# Resetear a remoto
git checkout develop
git reset --hard origin/develop

# Ahora tu develop local = origen/develop
```

---

## Tips Finales 💡

```bash
# Ver todo el historial con gráfico
git log --oneline --graph --all

# Ver cambios antes de mergear
git diff develop feature/mi-rama

# Ver commits en misma rama
git cherry -v develop

# Buscar en qué rama está un commit
git branch --contains abc123

# Ver último cambio en archivo
git log -p archivo.txt

# Blame: quién editó cada línea
git blame archivo.txt
```

---

**¡Ahora estás listo para enfrentar cualquier scenario en Git Flow!** 🎉
