# README

## Requirements

- Node.js [Node js](https://nodejs.org/en)

## Setup

- Run `git clone -b RD-Cypress-dev https://gitlab.digimind.tech/digi/libs/frontend/sandbox/riskd-automate-with-cypress.git` to clone the repository

1. Open your terminal or command prompt.
2. Navigate to the root directory of this project.

- Run `npm install` to install the dependencies
- Run `npm run format` to format the code
- To get started with this project, you'll need to create a `.env` file with your environment variables.
  We've provided an example `.env.example` file that you can use as a template, please add the values to the variables.
  To copy the `.env.example` file to `.env`:
- Run the following command to create a copy of the `.env.example` file with the name `.env`:
  `cp .env.example .env`

## Run tests

Please make sure that you are in the root directory of the project before running the tests.

- Run `npx cypress open` to open the Cypress Test Runner and choose the main file to run all the tests
- Run ` npx cypress run --spec cypress\e2e\main.cy.js` to generate the HTML report
- Run `npm run withScreenshots` to execute the tests in scenario1 and take screenshots

## Folder structure

```bash
.
├── .gitignore #contains ignored files
├── .prettierrc.js #for formating the code
├── README.md #explaining how to use the code
├── cypress.config.js #configuration file
├── cypress
│   ├── Elements #for selectors
│   │   ├── Pages
│   │   │   ├── CrisesPage.js #contains the selectors of crises page
│   │   │   ├── EarlyWarningsPage.js #contains the selectors of Early Warinings page
│   │   │   └── LoginPage.js #contains the selectors of Login page in DS
│   ├── e2e #for tests
│   │   ├── CrisesPage
│   │   │   ├── Archive_Crise.cy.js #the test to archive a crisis
│   │   │   ├── Verify_Crise_2.cy.js #the test to verify a crisis in crises page
│   │   │   └── Verify_Crises_Matrix.cy.js #the test to verify the risk matrix
│   │   ├── EarlyWarningsPage
│   │   │   ├── Assets
│   │   │   │   ├── Add_Asset.cy.js #the test to add an asset
│   │   │   │   └── Check_Asset.cy.js #the test to verify if an asset is created
│   │   │   ├── Crises
│   │   │   │   ├── Add_Crise.cy.js #the test to mark a warning as a crisis
│   │   │   │   └── Verify_Crise.cy.js #the test to verify a crisis in early warnings page
│   │   │   └── Warnings
│   │   │       └── Verify_Warning.cy.js #the test to verify a warning
│   │   ├── Login
│   │   │   └── Login.cy.js #the test to login to DS
│   │   └── main.cy.js #the main test running
│   ├── fixtures
│   │   └── Testdata.json #contains testing data
│   └── support
│       ├── commands.js #contains personnalized and overrided commands
│       └── e2e.js #the pre-execution running commands
└── package.json #dependencies

```

## Troubleshooting

If something goes wrong during the test, please check your network connection. If the runner can't find the selector, try adding a wait command.
