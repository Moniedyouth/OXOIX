## Overview
This project is an automated testing suite developed using **TypeScript** and **Playwright**. It verifies the functionality of user registration and profile management on the RocketPlay website. The tests include scenarios such as user registration (with email and password), profile configuration (including state selection, gender, and date of birth), and logout verification. The project employs a Page Object Model design and integrates detailed logging using winston.

## Project Features
- **Automated Registration:** Fill required fields (Email, Password) and validate that the website auto-populates country and currency.
- **Profile Management:** Navigate to the user profile to update settings (e.g., selecting "Ontario" as state, setting gender, and entering a date of birth) and verify that the data is saved.
- **Logout Verification:** Ensure that the logout process works as expected.
- **Logging:** Comprehensive logging is implemented via winston, ensuring detailed tracking of test execution.
- **Modular Architecture:** Utilizes a clear structure with page objects and components for easier maintenance and scalability.
- **Dynamic Test Data:** Uses both static test data and dynamic data generation for robust testing scenarios.

## Getting Started

### Prerequisites
- **Node.js** (version 14 or higher is recommended)
- **npm** (or yarn)

### Installation
Clone the repository and install dependencies using the standard procedure:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### Running the Tests headless mod
Execute the test suite using Playwright's test runner:

```bash
npx playwright test
```

### Running the Tests ui mod
Execute the test suite using Playwright's test runner:

```bash
npx playwright test --ui
```

## Project Structure
Below is the high-level project tree along with explanations of each part:

```
.
├── package.json                     # Project configuration and dependency management
├── rocketPlayTest.spec.ts           # Main test scenario covering registration, profile setup, and logout
├── base-page.ts                     # Base page object containing shared methods and properties
├── home-page.ts                     # Home page object for operations on the RocketPlay homepage
├── profile-page.ts                  # Profile page object for handling user profile actions
├── components
│   ├── header.component.ts              # Component managing the header and navigation elements
│   ├── login-form.component.ts          # Component responsible for user login functionality
│   ├── registration-form.component.ts   # Component handling the user registration process
│   └── personal-profile-form.component.ts # Component managing the personal profile form actions
├── utils
│   ├── test-data.ts                     # Contains static test data for the tests
│   ├── random-data-generator.ts         # Utility for generating dynamic test data
│   ├── assertions.ts                    # Custom assertions for validating test outcomes
│   └── logger.ts                        # Logger implementation using winston
└── README.md                        # This file
```

## Detailed File Explanations

### Test Scenario: `rocketPlayTest.spec.ts`
This file outlines the complete test flow:
- **Registration Process:**  
  - Fills out required fields (Email and Password).  
  - Validates that the website auto-populates country and currency information.  
  - Checks that the newsletter checkbox is disabled and the "18+" checkbox is enabled.  
  - Confirms successful registration.
- **Profile Setup:**  
  - Navigates to the user's profile page.  
  - Selects "Ontario" from the state dropdown.  
  - Specifies the user's gender and date of birth.  
  - Saves and verifies that the changes are persisted.
- **Logout Process:**  
  - Logs out from the profile page and verifies the successful logout.

### Page Objects
- **`base-page.ts`**: Contains common functionalities and shared methods used across different pages.
- **`home-page.ts`**: Represents the homepage and contains methods for interacting with home page elements.
- **`profile-page.ts`**: Encapsulates actions related to the user profile, such as editing profile details and saving changes.

### Components
- **`header.component.ts`**: Manages the header section of the website, including navigation elements.
- **`login-form.component.ts`**: Handles interactions with the login form.
- **`registration-form.component.ts`**: Contains the logic for user registration, including form validation and submission.
- **`personal-profile-form.component.ts`**: Manages the personal profile form, enabling the editing and saving of user details.

### Utilities
- **`test-data.ts`**: Provides static data used in the test scenarios.
- **`random-data-generator.ts`**: Generates dynamic test data to simulate various user inputs.
- **`assertions.ts`**: Defines custom assertions to verify expected outcomes during tests.
- **`logger.ts`**: Implements logging using the **winston** library.

## Logging Implementation with Winston
The logging functionality is encapsulated in the `logger.ts` file:
- **Configuration:**  
  Winston is configured to output logs at various levels (e.g., info, error) to both the console and file. This aids in debugging and tracking the test execution flow.
- **Usage:**  
  The logger is integrated throughout the project to log significant actions, such as when test steps are executed or when errors occur. This helps in quickly pinpointing issues during test runs.
- **Extensibility:**  
  Additional transports (e.g., remote logging, file rotation) can be easily added to the winston configuration if more advanced logging is needed.
