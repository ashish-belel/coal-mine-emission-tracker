# 🗂️ The Full Project Structure

coal-mine-emission-tracker/          ← Your GitHub repo root
│
├── .firebaserc                      ← Firebase project alias config
├── .gitignore                       ← Files and folders excluded from Git
├── .github/                         ← GitHub automation and upgrade tooling
│   └── java-upgrade/
│       ├── .gitignore
│       └── hooks/
│           └── scripts/
│               ├── recordToolUse.ps1
│               └── recordToolUse.sh
├── .vscode/                         ← Editor settings for this workspace
│   └── settings.json
├── backend/                         ← Spring Boot Java application wrapper
│   └── minetracker/
│       ├── .gitattributes
│       ├── .mvn/                    ← Maven wrapper support files
│       │   └── wrapper/
│       │       └── maven-wrapper.properties
│       ├── HELP.md                  ← Project guidance and notes
│       ├── mvnw                    ← Maven wrapper script for macOS/Linux
│       ├── mvnw.cmd                ← Maven wrapper script for Windows
│       ├── pom.xml                 ← Maven project configuration and dependencies
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/
│       │   │   │       └── greenmine/
│       │   │   │           └── minetracker/
│       │   │   │               ├── MinetrackerApplication.java   ← App entry point
│       │   │   │               ├── controller/                   ← Handles HTTP requests
│       │   │   │               │   └── EmissionController.java
│       │   │   │               ├── service/                      ← Business logic lives here
│       │   │   │               │   └── EmissionService.java
│       │   │   │               ├── model/                        ← Data transfer objects
│       │   │   │               │   ├── EmissionRequest.java
│       │   │   │               │   └── EmissionResult.java
│       │   │   │               └── constants/                    ← IPCC emission factor values
│       │   │   │                   └── EmissionFactors.java
│       │   │   └── resources/
│       │   │       └── application.properties                   ← Spring Boot configuration
│       │   └── test/
│       │       └── java/
│       │           └── com/
│       │               └── greenmine/
│       │                   └── minetracker/
│       │                       └── MinetrackerApplicationTests.java ← Basic unit test
│       └── target/                ← Generated build output (compiled classes, test artifacts)
├── dataconnect/                    ← GraphQL connector definitions and examples
│   ├── dataconnect.yaml            ← Connector root configuration
│   ├── example/
│   │   ├── connector.yaml          ← Example connector setup
│   │   └── queries.gql              ← Example GraphQL queries
│   ├── schema/
│   │   └── schema.gql               ← GraphQL schema definition
│   └── seed_data.gql               ← Sample seed data
├── firebase.json                   ← Firebase hosting configuration
├── firestore.indexes.json          ← Firestore index definitions
├── firestore.rules                 ← Firestore security rules
├── frontend/                       ← Frontend static assets and pages
│   ├── assets/
│   │   ├── css/                    ← Stylesheet folder (currently empty)
│   │   ├── images/                 ← Image assets folder (currently empty)
│   │   └── js/
│   │       ├── firebase-config.js              ← Firebase config and initialization
│   │       └── firebase-config-example.js      ← Example Firebase config template
│   └── pages/                      ← Frontend HTML pages folder (currently empty)
├── public/                        ← Hosted static frontend pages
│   ├── index.html                 ← Main entry point for the hosted frontend
│   └── 404.html                   ← Custom not-found page
├── CONCEPTS.md                    ← Project concept notes and architecture guide
├── PROJECT_STRUCTURE.md            ← This project structure reference file
└── README.md                      ← Main project README