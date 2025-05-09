## 📐 Snaptrude E2E Test Suite

This project is an **End-to-End (E2E) automation test suite** built using [Playwright](https://playwright.dev/) + JavaScript, designed to test core user flows on the Snaptrude application.

It follows a **Page Object Model (POM)** architecture to organize locators, interactions, and validations in a clean, reusable way.

---

### ✅ What’s covered?

This suite includes:

* **Functional (Positive) tests** → e.g., login, create project, draw rectangle
* **Functional (Negative) tests** → e.g., zero-size rectangle validation
* **Basic performance tests** → e.g., drawing 100 rectangles
* **End-to-End flow** → from login to cleanup

Because the application limits users to **3 projects at a time**, the tests:

* Create a project at the start
* Run validations
* Delete the project at the end to avoid clutter

---

### 📁 Project Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/abhishek0505bit/Snaptrude-E2EFlow.git
   cd Snaptrude-E2EFlow
   ```

2. **Install the dependencies:** Run the following command to install all the necessary dependencies listed in package.json:

   ```bash
   npm install
   ```
---

### Environment Setup

This project uses a `.env` file to securely manage sensitive credentials like email and password.

1. Create a `.env` file in the root directory of the project.

2. Add the following entries to the `.env` file:

   ```
   EMAIL=your-email@example.com
   PASSWORD=your-password
   ```

3. The tests will automatically read these values using:

   ```js
   process.env.EMAIL
   process.env.PASSWORD
   ```

---

### Running the tests

We’ve added the following scripts to `package.json` for easy execution:

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:ui": "npx playwright show-report"
}
```

You can run:

* **Headless (default)**:

  ```bash
  npm test
  ```
* **Headed (visible browser)**:

  ```bash
  npm run test:headed
  ```
* **View report UI**:

  ```bash
  npm run test:ui
  ```

---

### Architecture

We follow the **Page Object Model (POM)**:

* **`/pages` folder** → Contains JS classes (`LandingPage.js`, `DashboardPage.js`, `DesignPage.js`)
  → Stores page locators + interaction methods
* **`/tests` folder** → Contains spec files (`*.spec.js`)
  → Defines test scenarios + assertions

This improves **code reusability, readability, and maintainability.**

---

### What’s next / improvements

- Use `test.describe()` blocks to organize tests logically and enable **parallelization** with Playwright’s multiple workers.

- Add **API layer testing** to set up and clean up test data faster (instead of UI project creation/deletion).

- Implement **mocking/stubbing** where needed (for flaky third-party calls or network delays).

- Add **visual regression thresholds** (already partially added in `.toHaveScreenshot()` improvements).

- Generate **HTML or Allure reports** for test runs.

- Add **CI/CD integration** (GitHub Actions, GitLab, Jenkins) for automated runs on pull requests.

---

