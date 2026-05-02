# Project Concepts Reference

This document outlines all the key concepts, technologies, and architectural patterns used in the Coal Mine Emission Tracker project. It's designed as a comprehensive reference for future development and maintenance.

## 🏗️ Overall Architecture

### Monorepo vs Separate Repos
* **Two approaches available:**

| Approach | Structure | Best For |
|----------|-----------|----------|
| **Monorepo** | One GitHub repo, two folders (`frontend/` and `backend/`) | Small teams, hackathons, easier to manage |
| **Separate Repos** | One repo per service | Large teams, microservices |

* **Chosen:** Monorepo - One GitHub repo with `frontend/` and `backend/` folders. This keeps things connected and simple.

### Full Stack Architecture
```
Frontend (Browser) ←→ Backend (Spring Boot) ←→ Calculations
     ↓                    ↓
Firebase Auth       REST API Endpoints
Firestore DB        Emission Calculations
Chart.js            IPCC Emission Factors
Vanilla JS          Stateless Processing
```

## 🔧 Backend Technologies & Concepts

### Build System: Maven
Maven is the build tool that manages dependencies and compiles the Java project. It's equivalent to `package.json` in Node.js or `requirements.txt` in Python.

**Key files:**
- `pom.xml` - Project configuration and dependencies
- `mvnw` / `mvnw.cmd` - Maven wrapper for consistent builds
- `target/` - Build output directory

### Language: Java 17
- Modern Java with records, text blocks, and enhanced switch expressions
- LTS (Long Term Support) version for stability

### Framework: Spring Boot 4.0.6
Spring Boot simplifies Spring application development with auto-configuration and opinionated defaults.

**Key annotations:**
- `@SpringBootApplication` - Main application class marker
- `@RestController` - REST API controller
- `@Service` - Business logic service
- `@RequestMapping` - URL mapping
- `@PostMapping` - HTTP POST endpoint
- `@RequestBody` - JSON request body binding

### Architecture Pattern: Layered Architecture
Professional Spring Boot applications follow layered architecture for separation of concerns:

```
HTTP Request → Controller → Service → Model/Constants → Response
```

**Layers explained:**

1. **Controller Layer** (`controller/`)
   - Handles HTTP requests and responses
   - Maps URLs to methods (`@RequestMapping`, `@PostMapping`)
   - Delegates business logic to services
   - Knows nothing about calculations

2. **Service Layer** (`service/`)
   - Contains business logic and calculations
   - Processes data from controllers
   - Returns results to controllers
   - Knows nothing about HTTP

3. **Model Layer** (`model/`)
   - Data transfer objects (DTOs)
   - Defines request/response structures
   - Uses Lombok for boilerplate reduction

4. **Constants Layer** (`constants/`)
   - Static final values (emission factors)
   - IPCC guidelines implementation
   - Self-documenting code instead of magic numbers

### Dependency Injection
Spring Boot uses constructor injection for loose coupling:

```java
@RestController
public class EmissionController {
    private final EmissionService emissionService;

    public EmissionController(EmissionService emissionService) {
        this.emissionService = emissionService;
    }
}
```

### REST API Design
- **Endpoint:** `POST /api/emissions/calculate`
- **Request Body:** JSON with emission parameters
- **Response:** JSON with calculated emissions
- **HTTP Status:** Standard REST status codes

### Configuration: Application Properties
- `application.properties` - External configuration
- Server port, CORS settings, application name
- Environment-specific overrides

### Development Tools
- **Spring Boot DevTools** - Auto-restart on code changes
- **Lombok** - Reduces boilerplate code (@Data, @AllArgsConstructor, @NoArgsConstructor)

### Dependencies Used

| Dependency | Purpose |
|------------|---------|
| `spring-boot-starter-web` | REST API endpoints, JSON handling |
| `spring-boot-devtools` | Hot reload during development |
| `lombok` | Boilerplate reduction for model classes |
| `spring-boot-starter-test` | Unit testing framework |

### Emission Calculations
Based on IPCC 2006 Guidelines for coal mining:

- **Excavation emissions:** Volume × CO₂ factor per m³
- **Transport emissions:** Distance × Weight × Fuel factor (diesel only)
- **Equipment emissions:** Hours × CO₂ factor per hour
- **Total:** Sum of all emission sources

### Stateless Backend
- No database connections
- Pure calculation service
- All data comes from request, results returned immediately
- Firestore handled entirely by frontend

## 🎨 Frontend Technologies & Concepts

### Authentication: Firebase Auth
- User login/logout functionality
- Secure authentication flow
- Integration with Firestore security rules

### Database: Firestore
- NoSQL cloud database
- Real-time data synchronization
- Document-based storage
- Direct frontend integration (no backend proxy)

### Visualization: Chart.js
- JavaScript charting library
- Dashboard visualizations
- Emission trend charts
- Interactive data display

### JavaScript Architecture
**Modular organization:**
- `auth.js` - Firebase authentication logic
- `firestore.js` - Database read/write operations
- `api.js` - Backend API communication
- `charts.js` - Chart rendering and updates

### UI Structure
- **HTML Pages:** Multi-page application
  - `index.html` - Login page
  - `dashboard.html` - Main dashboard
  - `mine-profile.html` - Mine configuration
  - `emission-input.html` - Data entry form
  - `results.html` - Analysis and simulator
  - `reports.html` - Export functionality

- **CSS:** Custom styling in `styles.css`
- **Assets:** Images and icons in `images/`

### API Communication
- Fetch API for HTTP requests
- JSON data exchange with backend
- Error handling and user feedback

### Hosting: Firebase Hosting
- Static file hosting
- CDN for fast global delivery
- Automatic SSL certificates
- Integration with Firebase services

## 🔒 Security & Configuration

### CORS (Cross-Origin Resource Sharing)
- Configured in `application.properties`
- Allows frontend to call backend APIs
- Domain-specific access control

### Environment Variables
- Firebase configuration
- API endpoints
- Environment-specific settings

## 📊 Data Flow

1. **User Input** → Frontend form
2. **Authentication** → Firebase Auth
3. **Data Storage** → Firestore
4. **Calculation Request** → REST API call to backend
5. **Emission Calculation** → Service layer processing
6. **Results Display** → Charts and reports
7. **Data Persistence** → Firestore updates

## 🚀 Development Workflow

### Backend Development
1. Code changes in `src/main/java/`
2. Maven compile: `mvnw compile`
3. Run application: `mvnw spring-boot:run`
4. Test endpoints with Postman/cURL

### Frontend Development
1. Code changes in `frontend/`
2. Open HTML files in browser
3. Use browser dev tools for debugging
4. Firebase emulator for local testing

### Build & Deploy
- Backend: `mvnw clean package` → JAR file
- Frontend: Firebase CLI deploy
- Full stack: Separate deployment pipelines

## 📚 Key Resources

### Spring Boot
- [Official Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [REST Services Guide](https://spring.io/guides/tutorials/rest/)
- [Maven Plugin](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/)

### Firebase
- [Authentication](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Hosting](https://firebase.google.com/docs/hosting)

### Chart.js
- [Documentation](https://www.chartjs.org/docs/latest/)

### IPCC Guidelines
- [2006 IPCC Guidelines](https://www.ipcc-nggip.iges.or.jp/public/2006gl/)
- Mining emissions methodology

---

*This document should be updated as new concepts and technologies are added to the project.*
