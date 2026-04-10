# 📚 Guía Interactiva: Git, GitHub y Git Flow

Una guía completa y profesional sobre control de versiones, Github y la estrategia Git Flow.

## 📋 Contenido

### 1. **Inicio**
- Introducción a la guía
- Objetivos de aprendizaje
- Descripción general de los temas

### 2. **Git Básico**
- ¿Qué es Git?
- Conceptos clave: Repositorio, Commit, Rama, Merge
- Ciclo de trabajo básico
- Diagrama interactivo del flujo trabajoGit

### 3. **GitHub**
- ¿Qué es GitHub?
- Características principales
- Flujo de colaboración
- Diagrama del flujo Git + GitHub

### 4. **Git Flow**
- Introducción a Git Flow
- Beneficios de Git Flow
- Casos de uso ideales
- Diagrama visual del flujo Git Flow tradicional

### 5. **Tipos de Ramas**
- **main**: Rama principal (producción)
- **develop**: Rama de integración
- **feature**: Ramas temporales para características
- **release**: Ramas para preparar versiones
- **hotfix**: Ramas para correcciones urgentes
- Tabla comparativa de todas las ramas

### 6. **Simulador Interactivo**
- Simulador práctico de Git Flow
- Acciones disponibles
- Escenarios predefinidos para practicar

## 🚀 Cómo Usar la Guía

### Acceso
1. Abre `index.html` en tu navegador web preferido
2. O arrastra `index.html` a la ventana del navegador

### Navegación
- Usa los botones de pestañas en la parte superior para navegar entre temas
- Desplázate hacia abajo para ver todo el contenido de cada sección
- Usa el simulador para practicar interactivamente

### Interactividad
- Haz clic en los ejemplos de código para copiar comandos
- Prueba el simulador con diferentes escenarios
- Lee el historial de cambios en tiempo real

## 📊 Características Principales

### Gráficas Explicativas
- Diagrama del ciclo de trabajo básico de Git
- Flujo Git + GitHub visualizado
- Diagrama visual completo del Git Flow tradicional
- Visualización del estado actual en el simulador

### Contenido Educativo
- Explicaciones claras de conceptos
- Ejemplos de código con comandos Git reales
- Tablas comparativas de ramas
- Casos de uso reales

### Herramientas Interactivas
- Simulador de Git Flow en tiempo real
- Escenarios predefinidos de práctica
- Historial de cambios del simulador
- Almacenamiento local del progreso

## 🎯 Git Flow en Resumen

Git Flow es una estrategia de branching que define:

```
main       ←─── Producción (versiones estables)
          ↓
develop    ←─── Integración (nuevas características)
  ↓↓↓↓
feature/   ←─── Características individuales
release/   ←─── Preparación de versión
hotfix/    ←─── Correcciones urgentes
```

### Flujo Típico:

1. **Crear Feature**
   ```bash
   git checkout -b feature/nueva-funcionalidad develop
   ```

2. **Trabajo en Feature**
   ```bash
   # Editar archivos
   git add .
   git commit -m "Implementar nueva funcionalidad"
   ```

3. **Completar Feature**
   ```bash
   git checkout develop
   git merge --no-ff feature/nueva-funcionalidad
   git branch -d feature/nueva-funcionalidad
   ```

4. **Crear Release**
   ```bash
   git checkout -b release/v1.1.0 develop
   ```

5. **Completar Release**
   ```bash
   git checkout main
   git merge --no-ff release/v1.1.0
   git tag -a v1.1.0 -m "Versión 1.1.0"
   ```

6. **Hotfix (si es necesario)**
   ```bash
   git checkout -b hotfix/bug-critico main
   # Arreglar bug...
   git checkout main
   git merge --no-ff hotfix/bug-critico
   git tag -a v1.1.1
   ```

## 💡 Tips y Trucos

### Mejores Prácticas
- Usa nombres descriptivos para las ramas
- Realiza commits pequeños y frecuentes
- Escribe mensajes de commit claros
- Revisa los cambios antes de hacer merge
- Usa Pull Requests para revisión de código

### Resolver Conflictos
```bash
# Ver conflictos
git status

# Editar archivos conflictivos
# Luego:
git add .
git commit -m "Resolver conflictos"
```

### Ver Historial
```bash
# Historial remoto
git log --oneline --graph --all

# Diferencias entre ramas
git diff develop feature/mi-rama
```

## 🔗 Enlaces Útiles

- [Git Official Documentation](https://git-scm.com/doc)
- [Github Docs](https://docs.github.com)
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/) por Vincent Driessen
- [Pro Git Book](https://git-scm.com/book/es/v2)

## 📱 Compatibilidad

- ✅ Chrome, Edge, Firefox, Safari
- ✅ Responsive design (funciona en móvil y desktop)
- ✅ Sin dependencias externas (HTML, CSS, JavaScript puros)

## 🎓 Diseño Educativo

Esta guía ha sido diseñada con enfoque en:
- **Claridad**: Conceptos explicados de manera simple
- **Visualización**: Diagramas y gráficas interactivas
- **Práctica**: Simulador para aprender haciendo
- **Accesibilidad**: Navegación intuitiva y responsive

## 👨‍💻 Comandos Git Esenciales

### Configuración
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Creación y Clonación
```bash
git init                           # Inicializar repo
git clone <url>                    # Clonar repo
```

### Ramas
```bash
git branch                         # Ver ramas
git branch -a                      # Ver todas las ramas
git checkout -b feature/nuevo      # Crear y cambiar rama
git checkout develop               # Cambiar rama
git branch -d feature/viejo        # Eliminar rama
```

### Commits
```bash
git add .                          # Agregar cambios
git commit -m "Mensaje"            # Hacer commit
git push origin develop            # Enviar cambios
git pull origin develop            # Traer cambios
```

### Merge
```bash
git merge --no-ff feature/nuevo    # Merge con merge commit
git merge feature/nuevo            # Merge fast-forward
```

## 📝 Notas

- Esta guía está optimizada para educación y aprendizaje
- El simulador es una representación simplificada del flujo real
- Para proyectos reales, sigue las convenciones de tu equipo
- Considera usar herramientas como SourceTree o Git Kraken para gestos visuales

## 🎉 ¡Éxito en tu Aprendizaje!

Ahora que entiendes Git Flow, estás listo para:
- Colaborar efectivamente en equipos
- Mantener código ordenado y estructurado
- Manejar múltiples versiones en paralelo
- Resolver problemas de integración

**¡Recuerda!** La mejor manera de aprender es practicando. Usa el simulador y luego aplica lo aprendido en proyectos reales.

---

**Creado como guía educativa interactiva** | Basado en Git Flow de Vincent Driessen
