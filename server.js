require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_DOCUMENT_ID;
console.log('Spreadsheet ID:', SPREADSHEET_ID);
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

// Initialize Google Sheets
async function initializeGoogleSheets() {
    try {
        console.log('Initializing Google Sheets...');
        
        // Log credentials (without private key for security)
        console.log('Client Email:', process.env.GOOGLE_SHEETS_CLIENT_EMAIL);
        console.log('Private Key exists:', !!process.env.GOOGLE_SHEETS_PRIVATE_KEY);
        
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
        });
        
        console.log('Authentication successful');
        await doc.loadInfo();
        console.log('Document loaded:', doc.title);
        
        // Get the first sheet or create it if it doesn't exist
        let sheet = doc.sheetsByIndex[0];
        if (!sheet) {
            console.log('Creating new sheet...');
            sheet = await doc.addSheet({ headerValues: ['timestamp', 'name', 'email', 'subject', 'message'] });
            console.log('New sheet created');
        } else {
            console.log('Using existing sheet:', sheet.title);
        }
        
        console.log('Google Sheets initialized successfully');
        return sheet;
    } catch (error) {
        console.error('Error initializing Google Sheets:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        throw error;
    }
}

// Initialize on startup
let activeSheet;
initializeGoogleSheets().then(sheet => {
    activeSheet = sheet;
}).catch(error => {
    console.error('Failed to initialize Google Sheets:', error);
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Ensure we have an active sheet
        if (!activeSheet) {
            console.log('Sheet not initialized, attempting to initialize...');
            activeSheet = await initializeGoogleSheets();
        }

        if (!activeSheet) {
            throw new Error('Could not initialize Google Sheets');
        }
        
        console.log('Adding row to sheet...');
        // Add row to sheet
        await activeSheet.addRow({
            timestamp: new Date().toISOString(),
            name,
            email,
            subject,
            message
        });
        
        console.log('Row added successfully');
        res.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact form:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ error: 'Failed to send message: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
