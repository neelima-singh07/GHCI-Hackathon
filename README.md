# Fiba - AI-First Financial Tracking Dashboard

A React-based web dashboard for Fiba, an AI-powered multi-modal financial tracking application integrated with WhatsApp.

## Features

- 📊 **Real-time Dashboard** - View spending trends, financial health score, and achievements
- 💰 **Transaction Management** - Browse, filter, and analyze all transactions
- 📈 **Advanced Analytics** - Category breakdowns, spending patterns, and anomaly alerts
- 💬 **WhatsApp Integration** - Multi-modal input support (text, audio, images)
- 🏆 **Gamification** - Streaks, badges, and progress tracking
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🌐 **Multi-language Support** - Optimized for Indian languages including Hinglish

## Technology Stack

The FIBA system uses a modern, AI-first architecture, leveraging several key technologies for data processing and storage.

### Frontend
- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Chart.js 4** - Data visualization
- **Axios** - HTTP client for API calls
- **Framer Motion** - Smooth animations

### Communication API
**WhatsApp Business API** is the primary interface for user interaction.

### Backend
A custom **FIBA Backend Router** is used to control the entire workflow, eliminating the need for Dialogflow.

### AI/ML Frameworks & Models

- **Speech-to-Text (ASR)**: Whisper or IndicTrans for audio transcription
- **OCR**: PaddleOCR or Tesseract for processing screenshot images
- **Layout Model**: Donut, LayoutLMv3, or TrOCR for image understanding and merchant logo/name detection
- **NLP**: BERT (part of the Unified NLP Engine) for text understanding and extraction
- **Category Classifier**: BERT + XGBoost hybrid
- **Financial Health Scoring**: XGBoost/LightGBM
- **Anomaly Detection**: Isolation Forest

### Database
**MongoDB** or **PostgreSQL** are supported for storing cleaned transaction data.

### Configuration
Editable YAML for category classifier configuration.

## System Architecture

The system utilizes a multi-modal workflow that processes text, audio, and screenshot inputs from the user on WhatsApp.

### High-Level Workflow

The final, clean workflow is:

```
WhatsApp Business API → Backend → AI Pipelines → DB → Dashboard → WhatsApp Response
```

### FIBA Backend Router (Multi-Modal Routing)

The core backend acts as a **Message Router** to detect the message type (text, audio, or image/screenshot) and directs it to the appropriate processing pipeline.

#### 1. Text Route (A)
- Performs **Natural Language Normalization** for Hindi, English, and Hinglish
- Runs **NLP Extraction** to find amount, merchant candidate, time reference, and intent

#### 2. Audio Route (B)
- Downloads the **Audio File**
- Uses a **Speech-to-Text (ASR)** model (Whisper/IndicTrans) to generate Transcribed Text (Hinglish OK)
- The transcribed text is then passed to the **NLP Parser**

#### 3. Image Route (C) - Screenshot Processing
- Downloads the **Image File**
- Runs **OCR** (PaddleOCR/Tesseract)
- Uses a **Layout Model** (Donut/LayoutLMv3/TrOCR) for:
  - Merchant logo and name detection
  - Order ID and items list extraction
  - Reliable amount extraction

### Downstream Processing

All three routes merge into a single **Unified Transaction Object**. Further operations are independent of the original input type.

1. **Unified Text Understanding Pipeline**: Extracts amount, merchant, time, and category from the input
2. **Confidence Scoring**: If the confidence score is below a threshold, the system asks the user for confirmation using WhatsApp Quick Buttons
3. **Category Classifier**: Classifies the transaction using the BERT + XGBoost hybrid
4. **Financial Health Scoring**: Calculates a score using XGBoost/LightGBM
5. **Anomaly Detection**: Uses Isolation Forest to detect unusual behavior like spending spikes, unusual merchants, or odd timing. An anomaly triggers a WhatsApp Alert

## Data Model & Storage

### Storage

The system stores the cleaned transaction data in a relational (PostgreSQL) or NoSQL (MongoDB) database.

### Unified Transaction Object (Data Model)

The input from any route (text, audio, or image) is standardized into a **UNIFIED TRANSACTION OBJECT**, which includes:

| Field | Example Value | Description |
|-------|---------------|-------------|
| userId | "1234" | Unique identifier for the user |
| source | "text/audio/image" | Input type |
| merchant | "Zomato" | Name of the merchant |
| amount | 550 | Transaction amount |
| timestamp | 1731752200 | Time of the transaction |
| category | "Food Delivery" | Predicted transaction category |
| confidence | 0.86 | Model confidence score for the extraction/classification |

## AI / ML / Automation Components

The system is designed with an AI-first architecture.

| Component | AI/ML Model Used | Purpose |
|-----------|------------------|---------|
| Audio Transcription | Whisper / IndicTrans | Converts user audio messages to text |
| Screenshot OCR | PaddleOCR / Tesseract | Extracts text from image screenshots |
| Layout Analysis | Donut / LayoutLMv3 / TrOCR | Understands the structure of a screenshot for key data extraction |
| NLP Engine | BERT | Unified model for extracting core transaction data from text/transcripts |
| Category Classification | BERT + XGBoost hybrid | Assigns a financial category to the transaction |
| Financial Scoring | XGBoost / LightGBM | Calculates the user's financial health score |
| Anomaly Detection | Isolation Forest | Identifies unusual transactions (spending spikes, odd timing, new merchants) |
| Automation | Full Workflow | Automates the end-to-end processing from WhatsApp message receipt to database update and response |

## Security & Compliance

The system is built on the WhatsApp Business API, which implies adherence to Meta's security standards for message handling. Key security and compliance considerations include:

- **Data Handling**: Store Cleaned Transaction in DB (MongoDB or PostgreSQL)
- **Privacy**: Since financial data is being processed, strong measures must be taken to ensure data is encrypted at rest and in transit
- **Data Minimization**: The system focuses on extracting key transaction fields (amount, merchant, category) to create the Unified Transaction Object
- **User Control**: The system allows for user intervention via WhatsApp Quick Buttons to confirm a confidence-scored transaction. This acts as a manual verification layer
- **Alerting**: Anomaly Detection provides alerts (WhatsApp Alert) for suspicious activity, which is a security feature

## Scalability & Performance

The architecture is designed to be production-ready and scalable by leveraging a decoupled, modular approach where the backend controls 100% of the workflow.

- **Decoupled Components**: The processing pipelines for text, audio, and image are separate, allowing for independent scaling of compute-intensive tasks like OCR or ASR
- **Leveraging API for Scale**: Utilizing the WhatsApp Business API is built to handle high-volume messaging
- **Efficient AI Models**: Models like XGBoost/LightGBM and Isolation Forest are known for being efficient and fast, making the Downstream AI Processing Pipeline quick
- **DB Choice**: Supporting both MongoDB (NoSQL) and PostgreSQL (SQL) offers flexibility to optimize for different scaling needs (e.g., read-heavy vs. transaction-heavy workloads)
- **Dashboard Sync**: Syncing with the React Dashboard enables quick updates for charts, streaks, and badges

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── dashboard/      # Dashboard-specific components
│   └── common/         # Common UI components
├── pages/              # Page components
├── services/           # API services
├── contexts/           # React contexts for state management
├── utils/              # Utility functions
└── assets/             # Static assets
```

## API Integration

Update the API base URL in `src/services/api.js` to connect to your backend:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

## Features Overview

### Dashboard
- Monthly spending overview
- Financial health score with AI-powered insights
- Active streaks and achievements
- Quick transaction summary
- Spending trends charts

### Transactions
- Complete transaction history
- Multi-modal input indicators (text, audio, image)
- Category-based filtering
- Search and sort functionality
- Transaction details with AI-extracted metadata

### Analytics
- Category-wise spending breakdown
- Time-series spending patterns
- Anomaly detection alerts
- Merchant analysis
- Budget tracking and predictions

### WhatsApp Integration
- Real-time message history
- Multi-modal input tracking
- AI response visualization
- Quick action buttons (Correct, Edit, Delete)
- Connection status monitoring

### Profile
- User preferences
- Language settings
- WhatsApp integration status
- Notification preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

