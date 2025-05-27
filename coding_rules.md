# Next.js Coding Rules and Conventions

This document outlines the coding rules and conventions to be followed for developing the Engineering Calculator project using Next.js. Adhering to these rules will ensure consistency, readability, and maintainability of the codebase.

## 1. File and Folder Structure

Follow the standard Next.js project structure. Key directories include:

-   **`/pages`**: Contains all application routes.
    -   Files in this directory (e.g., `index.tsx`, `calculator.tsx`) automatically become routes.
    -   Use subdirectories for nested routes (e.g., `pages/settings/profile.tsx`).
    -   API routes are placed in `/pages/api`.
-   **`/components`**: Contains reusable UI components.
    -   Organize components into subdirectories based on feature or commonality (e.g., `/components/ui`, `/components/calculator`).
-   **`/lib`**: For utility functions, helper scripts, and shared business logic not specific to any single component.
-   **`/public`**: For static assets like images, fonts, and `robots.txt`.
-   **`/styles`**: For global styles and CSS Modules if not co-located with components.
    -   `globals.css`: For global styles.
    -   Component-specific styles can be CSS Modules (`[name].module.css`) co-located with their respective components or within this directory.
-   **`/utils`**: (Optional, can be part of `/lib`) For very generic utility functions.
-   **`/hooks`**: For custom React Hooks.
-   **`/contexts`**: For React Context API providers and consumers.
-   **`/types`**: For TypeScript type definitions, if using TypeScript.

**File Naming:**
-   Component files: `PascalCase.tsx` (e.g., `CalculatorDisplay.tsx`)
-   Non-component files (hooks, utils, API routes): `camelCase.ts` or `kebab-case.ts` (e.g., `useCalculator.ts`, `math-helpers.ts`)

## 2. Component Conventions

-   **Naming**: Use `PascalCase` for component names (e.g., `CalculatorButton`).
-   **Functional Components**: Exclusively use functional components with React Hooks.
-   **Props**:
    -   Use TypeScript interfaces or types for defining prop types.
    -   Destructure props in the function signature.
    -   Provide default values for optional props where appropriate.
    ```typescript
    interface MyComponentProps {
      title: string;
      count?: number;
    }

    const MyComponent: React.FC<MyComponentProps> = ({ title, count = 0 }) => {
      // ...
    };
    ```
-   **Modularity**: Keep components small and focused on a single responsibility.
-   **Index Files**: Use `index.ts` files in component subdirectories to simplify imports (e.g., `import { Button } from '@/components/ui';`).

## 3. State Management

-   **Local State**: Use `useState` for component-level state.
-   **Shared State**:
    -   For simple state sharing between a few components, consider prop drilling or lifting state up.
    -   For more complex global state or state shared across many components, use the React Context API (`useContext` and `createContext`).
    -   For very complex applications, libraries like Zustand or Redux Toolkit can be considered, but for the calculator, Context API should suffice.
-   **Derived State**: Compute derived state directly or use `useMemo` for expensive calculations.

## 4. API Routes (`pages/api`)

-   **Naming**: Files in `pages/api` should be `camelCase.ts` or `kebab-case.ts` (e.g., `calculate.ts`, `user-settings.ts`).
-   **Request Handlers**: Clearly define request handlers for different HTTP methods (e.g., `GET`, `POST`).
    ```typescript
    import type { NextApiRequest, NextApiResponse } from 'next';

    export default function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === 'POST') {
        // Handle POST request
      } else if (req.method === 'GET') {
        // Handle GET request
      } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
    ```
-   **Error Handling**: Implement robust error handling and return appropriate status codes.
-   **Data Validation**: Validate incoming data.

## 5. Styling

-   **CSS Modules**: Preferred for component-level styling to avoid class name collisions. Name files as `[ComponentName].module.css`.
    ```typescript
    import styles from './MyComponent.module.css';

    const MyComponent = () => <div className={styles.myClass}>Hello</div>;
    ```
-   **Global Styles**: Use `/styles/globals.css` for base styles, resets, and global utility classes.
-   **Tailwind CSS**: (Alternative) If chosen, configure it according to Next.js guidelines. Ensure consistency in its usage.
-   **Styled Components / Emotion**: (Alternative) If chosen, ensure consistent usage and consider server-side rendering implications.

*(Decision: For this project, we will primarily use **CSS Modules** for component-specific styles and a `globals.css` for overall styling.)*

## 6. Next.js Specific Features

-   **Routing**: Utilize the file-system based routing in the `pages` directory.
-   **Links**: Use `next/link` for client-side navigation between pages.
    ```typescript
    import Link from 'next/link';

    <Link href="/about"><a>About Us</a></Link>
    ```
-   **Images**: Use `next/image` for optimized image delivery.
    ```typescript
    import Image from 'next/image';
    import profilePic from '../public/me.png'; // Example

    <Image src={profilePic} alt="My Picture" width={500} height={500} />
    ```
-   **Data Fetching**:
    -   `getStaticProps`: For fetching data at build time (static site generation).
    -   `getServerSideProps`: For fetching data on each request (server-side rendering).
    -   Client-side fetching (e.g., using `useEffect` and `fetch` or SWR/React Query) for data that doesn't need to be pre-rendered or changes frequently.
-   **Environment Variables**: Use built-in support for environment variables (prefix with `NEXT_PUBLIC_` for browser exposure).

## 7. Linting and Formatting

-   **ESLint**: Configure ESLint with the `eslint-config-next` plugin for Next.js specific rules.
    ```json
    // .eslintrc.json
    {
      "extends": "next/core-web-vitals"
    }
    ```
-   **Prettier**: Use Prettier for consistent code formatting. Integrate with ESLint using `eslint-plugin-prettier` and `eslint-config-prettier`.
-   **IDE Integration**: Configure your IDE to auto-format on save and show lint errors.

## 8. TypeScript Usage (if applicable)

-   **Strict Mode**: Enable strict mode in `tsconfig.json`.
-   **Type Everything**: Provide types for props, state, function arguments, and return values.
-   **Utility Types**: Use TypeScript's utility types (e.g., `Partial`, `Readonly`) where appropriate.
-   **Avoid `any`**: Minimize the use of `any`. If necessary, use `unknown` and perform type checking.

## 9. Imports

-   **Order**:
    1.  React imports (`import React from 'react';`)
    2.  Next.js imports (`import Link from 'next/link';`)
    3.  Third-party library imports
    4.  Internal component imports (`import MyComponent from '@/components/MyComponent';`)
    5.  Local imports (styles, utils from the same module) (`import styles from './styles.module.css';`)
-   **Absolute Imports**: Configure absolute imports using `baseUrl` in `tsconfig.json` or `jsconfig.json` (e.g., `@/components/Button`).

## 10. Comments and Documentation

-   **JSDoc**: Use JSDoc for functions and components, especially for props and complex logic.
-   **Inline Comments**: Use comments to explain complex or non-obvious code sections.
-   **`README.md`**: Maintain a `README.md` with project setup, development guidelines, and deployment instructions.

## 11. Testing

-   **Jest and React Testing Library**: Use Jest as the test runner and React Testing Library for testing components.
-   **Unit Tests**: Write unit tests for utility functions, hooks, and individual components.
-   **Integration Tests**: Test interactions between components.
-   **End-to-End Tests**: (Optional, for larger features) Consider tools like Cypress or Playwright.
-   **Test Coverage**: Aim for reasonable test coverage.

## 12. Git Workflow

-   Follow the established Git branching model (e.g., Gitflow-like with `develop`, `feature/*`, `release/*`, `main`).
-   Write clear and concise commit messages.
-   Rebase feature branches onto `develop` before merging to maintain a clean history.

By following these coding rules, we aim to build a high-quality, maintainable, and scalable Next.js application.
