# Nextjs Portal | 2023

Welcome to my personal website project! This portal is built with Next.js and integrates a ChatGPT bot for interactive conversations.

## Description

This project is a personal website that features a ChatGPT bot chat. Built with Next.js, it leverages various modern web technologies to provide a seamless and interactive user experience.

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Styled-Components, TailwindCSS
- **SEO**: next-seo
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, SQLite
- **Email**: Nodemailer
- **API**: OpenAI API for ChatGPT integration

## Features

- Personal portfolio and blog
- ChatGPT bot for interactive chat
- SEO optimized
- Responsive design using TailwindCSS and Styled-Components
- Email contact form with Nodemailer
- Deployable as a static site or a dynamic server

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Setup

#### Clone the repository

```bash
git clone https://github.com/yourusername/next-portal.git
cd next-portal
```

#### Install dependencies

```bash
npm install
```

#### Set up environment variables

Create a `.env` file in the root of your project and add your environment variables:

### Running the Application

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
npm run start
```

#### Running the Server

For development:

```bash
npm run server
```

For production with PM2:

```bash
npm run server:prod
```

### Deploying

To deploy the static site:

```bash
npm run build:static
npm run start:static
```

To deploy to GitHub Pages:

```bash
npm run deploy
```

## Scripts

- `dev`: Start the development server
- `build`: Build the application
- `start`: Start the production server
- `lint`: Run ESLint
- `server`: Start the custom server for development
- `server:prod`: Start the custom server with PM2 for production
- `restart:prod`: Restart the PM2 process for the production server
- `stop:prod`: Stop the PM2 process for the production server
- `build:prod`: Build the application for production
- `build:static`: Build the static version of the application
- `start:static`: Start the static version of the application
- `deploy`: Deploy the static site to GitHub Pages

## Dependencies

- **@types/node**: TypeScript definitions for Node.js
- **@types/react**: TypeScript definitions for React
- **@types/styled-components**: TypeScript definitions for styled-components
- **dotenv**: Loads environment variables from a `.env` file
- **eslint**: JavaScript and TypeScript linter
- **eslint-config-next**: ESLint configuration for Next.js
- **mime**: Utility library for handling MIME types
- **next**: Next.js framework
- **next-seo**: SEO tools for Next.js
- **nodemailer**: Email sending library
- **openai**: OpenAI API client
- **pg**: PostgreSQL client for Node.js
- **react**: React library
- **react-dom**: React DOM library
- **react-markdown**: Markdown rendering for React
- **sqlite3**: SQLite3 bindings for Node.js
- **styled-components**: CSS-in-JS library for styling React components
- **typescript**: TypeScript language

## Dev Dependencies

- **@types/nodemailer**: TypeScript definitions for Nodemailer
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes
- **gh-pages**: Publish files to a GitHub Pages branch
- **postcss**: A tool for transforming CSS with JavaScript
- **tailwindcss**: A utility-first CSS framework
