# Accounting Application with React Frontend and Python Backend

This project uses a React frontend with a Python Flask backend.

## Project Structure

- `/src` - React frontend code
- `/backend` - Python Flask backend code

## Running the Application

### Frontend (React)

```bash
# From the project root
npm run dev
```

### Backend (Flask)

```bash
# From the project root
cd backend
python3 -m venv venv  # Create virtual environment (first time only)
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # Install dependencies
python app.py  # Start the Flask server
```

The React app will run on http://localhost:5173 and the Flask API will be available at http://localhost:5000.

## Notes

- Remember that you'll need to have both the frontend and backend servers running simultaneously.
- The current CORS configuration allows all origins in development mode. This should be restricted in production.
