# Contributing to School Payments Dashboard

Thank you for your interest in contributing to the School Payments Dashboard! This document provides guidelines and steps for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the top right of the repository page
- Clone your forked repository to your local machine:
  ```bash
  git clone https://github.com/your-username/school-payments-frontend.git
  cd school-payments-frontend
  ```

### 2. Set Up Development Environment
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file with the required environment variables
- Start the development server:
  ```bash
  npm run dev
  ```

### 3. Create a New Branch
- Create a new branch for your feature or bugfix:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/your-bugfix-name
  ```

### 4. Make Your Changes
- Follow the project's coding style and conventions
- Write clear, concise commit messages
- Add tests for new features or bug fixes
- Update documentation as needed

### 5. Commit Your Changes
- Stage your changes:
  ```bash
  git add .
  ```
- Commit with a descriptive message:
  ```bash
  git commit -m "Description of your changes"
  ```

### 6. Push Your Changes
- Push your branch to your forked repository:
  ```bash
  git push origin your-branch-name
  ```

### 7. Create a Pull Request
- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Provide a clear description of your changes
- Submit the pull request

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Document complex functions

### Testing
- Write unit tests for new features
- Ensure all tests pass before submitting a PR
- Update tests when modifying existing features

### Documentation
- Update README.md for significant changes
- Add comments for complex code sections
- Document new features and API changes

## Pull Request Process

1. Ensure your PR addresses a single issue or feature
2. Update the README.md with details of changes if needed
3. The PR must pass all CI checks
4. You may merge the PR once you have the sign-off of at least one other developer

## Reporting Issues

When reporting issues, please include:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## Questions?

Feel free to open an issue if you have any questions about contributing to the project. 