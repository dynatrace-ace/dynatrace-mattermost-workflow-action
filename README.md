# Mattermost Workflow Action

## Get Started

### Check Node.js version

Ensure to have at least Node.js v20 installed. To check your current version, run

```bash
node -v
```

### Install dependencies

Run

```bash
npm install
```

to install the required dependencies.

### Start the development server

The DT APP CLI provides a development server to host the app locally. Run

```bash
npm run start
```

to start the development server. This will open the app hosted in the Platform UI in your browser.

### Install the workflow action

```bash
npm run deploy
```

Once the app installs successfully, open your tenant and configure the connection under `Settings > Dynatrace Apps > Mattermost`. The settings page contains clear instructions on how to do so.