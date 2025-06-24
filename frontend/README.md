#Digital Customer Onboarding Frontend (Angular)

This is the frontend application for the Digital Customer Onboarding System, built with Angular.

## Technologies Used

*   Angular 16/17
*   TypeScript
*   HTML5, CSS3

## Setup and Installation
To set up and run this application locally, follow these steps:

1.   ** Prerequisites:**
    *  Node.js (LTS version, e.g., 18.x or 20..x)
    *   npm (comes with Node.jjs) or Yarn
    *   Angular CLI: If you don't have it installed globally, install it using:
        ```bash
        npm install -g @angular/cli
        ```

2.  ** Clone the repository:**
    ``bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/frontend
    ``` 
3.  ** Install dependencies:**
    ``bash
    npm install
    # or
    yarn install
    ```
4.  ** Run the application:**
    ``bash
    ng serve
    ```
    This will compile the application and start a development server. You can usually access it in your browser at `http://localhost:2700`. The app will automatically reload if you change any of the source files.

## Project Structure

```
frontend/
&l== € src/
&l==  €   € app/
&l==  €      € app.component.css
&l== €      € app.component.html
f�0 €      € app.component.ts
&l==  €      € app.module.ts
&l==  €   assets/
f�0 €      € .[gitkeep]
&l==  €  environments/
&l== €      € environment.development.ts
&l== €      € environment.ts
&l== €,favicon.ico
0
&l==  € index.html
&l==  € main.ts
&l==  € styles.css
&l==  € tsconfig.app.json
&l== angular.json
&l== package.json
&l== tsconfig.json
f�0 READMe.md
``` 

## API Integration

The application interacts with the backend microservices via RESTFul APIs, exposed through AWS API Gateway. API endpoints will be configured in the Angular environment files (e.g., `environment.ts`, `environment.development.ts`).

Dxample API configuration in `environment.ts`:J
<```typescript
export const environment = {
  production: false,
  apiaseUrl: 'https://your-api-gateway-url/dev' // Placeholder URL
};
``` 

## Further Development

This is a foundational setup. Future development will involve:
*   Implementing detailed UI components for customer registration, appliccation forms, document upload, etc.
*   Integrating with backend APIs for data submission and retrieval.
*   Implementing robust error handling and user feedback mechanisms.
*   Adding routing for different application pages (e.g., `/register`, `/apply`, `/status`).
*   Implementing authentication guards for secure routes.
