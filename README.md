# Personal Portfolio Website

A modern personal portfolio website built with Node.js and Google Sheets integration, designed to be hosted on Google Cloud Platform (GCP).

## Features

- Responsive design
- About Me section
- Interactive Resume
- Projects showcase
- Contact form with Google Sheets integration
- Docker support for easy deployment

## Prerequisites

- Node.js 18 or higher
- Google Cloud Platform account
- Google Sheets API credentials

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my_website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Google Sheets credentials:
```
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email
GOOGLE_SHEETS_DOCUMENT_ID=your_sheet_id
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t personal-website .
```

2. Run the container:
```bash
docker run -p 3000:3000 personal-website
```

## GCP Deployment

1. Enable the required APIs in your GCP project:
   - Compute Engine API
   - Google Sheets API

2. Create a Compute Engine instance

3. Deploy using Cloud Build:
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/personal-website
```

4. Deploy to Compute Engine:
```bash
gcloud compute instances create-with-container personal-website \
  --container-image gcr.io/PROJECT_ID/personal-website
```

## Google Sheets Setup

1. Create a new Google Sheet
2. Share it with the client email from your service account
3. Set up the following sheets:
   - Projects
   - Messages
   - Resume

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT
