# Form Builder

A powerful, schema-driven dynamic form builder built with **React**, **TypeScript**, and **Vite**. This project demonstrates advanced form handling techniques including conditional logic, field repeaters, asynchronous validation, and autosave.

## 🚀 Features

- **Schema-Driven Rendering**: Forms are generated dynamically from a JSON schema.
- **Conditional Logic**: Show or hide fields based on the values of other fields.
- **Async Validation**: Perform server-side or timed validation (e.g., checking if a username is taken).
- **Field Repeaters**: Support for dynamic lists where users can add or remove multiple instances of a field group.
- **Autosave**: Automatically saves form progress to local storage or a mock API.
- **Responsive Design**: Styled with **Tailwind CSS** for a modern, mobile-first experience.
- **Storybook Integration**: Explore and test individual components in isolation.
- **Unit & Integration Testing**: Built-in testing suite using **Vitest** and **Playwright**.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Documentation**: [Storybook](https://storybook.js.org/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Alaminislam-stack/Assignment.git
    cd Assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 💻 Usage

### Development Server

Run the app in development mode:

```bash
npm run dev
```

### Storybook

Launch the Storybook environment to view components:

```bash
npm run storybook
```

### Build

Create a production-ready build:

```bash
npm run build
```

### Testing

Run unit tests with Vitest:

```bash
npm test
```

## 📂 Project Structure

- `src/components`: Reusable UI and form components.
- `src/pages`: Application views (Home, Form Builder, etc.).
- `src/stories`: Storybook configurations and component stories.
- `src/utils`: Helper functions and validation logic.

## 📄 License

This project is for assignment purposes. Use it as a reference for dynamic form implementations.
