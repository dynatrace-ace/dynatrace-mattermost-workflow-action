# Dynatrace Mattermost Workflow Action

## What is this?

It is a Dynatrace Workflow Action integration between Dynatrace and Mattermost.

## What is a Dynatrace Workflow Action?

[Dynatrace](https://www.dynatrace.com/) is a software company that provides a comprehensive observability platform designed to monitor, analyze, and optimize application performance, IT infrastructure, and user experience.

Dynatrace Workflows are powerful tools within the Dynatrace platform that allows you to automate and orchestrate various IT processes. Check [this](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/quickstart) example.

[Dynatrace Workflow Action](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/default-workflow-actions) are reusable functions that can be configured and triggered within a workflow to perform specific tasks. Actions are the building blocks of workflows and can be used to automate various processes. 

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