# shadcn/ui Components

This directory is a placeholder for the components you will add from `shadcn/ui`.

The files in here (`button.jsx`, `card.jsx`, etc.) are **stubs** just to make the application's `import` statements work without errors.

## How to use

You must initialize `shadcn/ui` and add the components yourself.

1.  **Initialize shadcn/ui:**
    Run this command and follow the prompts. Choose `Default` style, your primary color (e.g., `Orange`), and confirm path aliases (`@/*`).

    ```bash
    npx shadcn-ui@latest init
    ```

2.  **Add Components:**
    For every component we use, you need to add it via the CLI. This will overwrite the placeholder stubs with the real component code.

    **Run this command:**

    ```bash
    npx shadcn-ui@latest add button card dialog input label navigation-menu select table textarea toast
    ```

    You also need to add `sonner` for rich toasts:
    
    ```bash
    npm install sonner
    ```
    
    Then add the `toaster` component:

    ```bash
    npx shadcn-ui@latest add toaster
    ```
    
    (Note: The generated `toaster.jsx` will be from `sonner`. You'll need to update `main.jsx` to import `<Toaster />` from `sonner` and `use-toast.js` to use `sonner`'s `toast` function, or just use the default `shadcn` toasts. This starter uses the default `shadcn` `<Toaster />` and `useToast`.)