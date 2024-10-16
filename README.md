# ⚽ FPL_Analysis

**FPL_Analysis** is a web application designed for Fantasy Premier League (FPL) enthusiasts. Whether you're crafting your dream team, analyzing your current squad, or tracking league performances, FPL_Analysis gives you access to comprehensive player stats and AI-powered data that help you make better decisions.

Explore **real-life player data**, **FPL-specific stats**, and **AI-driven projections** to gain a competitive edge. Dive into your team's performance, your league's rankings, and even simulate new transfers.

## 🌐 Live Site
Check out the live version of the application here: [FPL Analysis Live Site](https://fpl-anal.netlify.app/?team_Id=6398611&league_Id=987770)  
🔍 **Use query parameters** to visualize data for your team and league!

## 🚀 Key Features

1. **All Players** 🌟  
   Browse a comprehensive table featuring all players from the English Premier League. The player data includes:
   - **Real-life stats**: Goals, assists, clean sheets, and more.
   - **FPL-specific stats**: Total points, ownership percentage, elite ownership, bonus points, etc.
   - **AI-powered predictions**: Future gameweek projections, expected goals (xG), expected assists (xA), and expected points.  
   **Filters** and **sorting options** allow you to explore players by position, team, and price ranges. The detailed player breakdown provides everything you need to know before making transfers or building your squad.

2. **Connect FPL Team** 🔗  
   Plug in your **teamID** to filter the data specifically for your FPL team. Get live, actionable insights into the players you own, including their real-life performance stats and AI-driven projections, so you can make smarter choices for future transfers and team setups.

3. **Connect FPL League** 🏆  
   Connect any league using its **leagueID** to view detailed stats on the top 50 managers. This includes:
   - **Attack Score**: A metric summarizing the attacking strength of their team.
   - **Defence Score**: A metric for defensive capability.
   - **Overall Score**: A cumulative score calculated from AI data.
   - View details such as **team value**, **rank**, and **team performance breakdown** to compare your team against the league's top performers.

4. **Live FPL League** ⚡  
   While the official FPL website is slow to update during gameweeks, the **Live FPL League** feature provides **real-time stats**. Track live points, see real-time rank changes, and monitor league standings in the middle of gameweek action.

5. **Create Team** 🛠️  
   Build your FPL team from scratch or simulate transfers for your current squad. While creating or editing your team, you can:
   - Compare players based on **attack score**, **defence score**, and **overall team score**.
   - See AI projections to predict how well your team might perform in upcoming gameweeks.
   This tool helps you make optimal decisions before confirming transfers or submitting your team.

## 🛠️ Installation

### 📂 Cloning the Project

FPL_Analysis is divided into two branches:  
- **master** (Frontend): Contains the React-based frontend.
- **backend** (Backend): Contains the Flask-based backend.

You'll need to clone both branches separately.

### Frontend (React) Setup

1. Clone the frontend code from the `master` branch:
   ```bash
   git clone -b master https://github.com/yourusername/FPL_Analysis.git
   cd FPL_Analysis
2. Install dependencies:
   ```bash
   npm install
3. Set local variable to true:
   In the Api.tsx file, set the dev variable to true to avoid making unnecessary requests to the live server.
   ```bash
   const dev = true
### Backend (Flask) Setup

1.Clone the backend code from the backend branch:
  ```bash
    git clone -b backend https://github.com/yourusername/FPL_Analysis.git
    cd FPL_Analysis 
  ```
2. Set up a virtual environment:
```bash
  python3 -m venv venv
  source venv/bin/activate  # On Windows use `venv\Scripts\activate`
  ```
3. Install the Python dependencies:
```bash
  pip install -r requirements.txt
```
4. Run the Flask app:
  ```bash
    flask run
  ```
## 🛠️ Technologies Used
- **Frontend**: React (for building the interactive UI)
- **Backend**: Flask (for handling API requests and backend logic)
- **Server**: Linux (for hosting the application)
- **Web Server**: Nginx (for serving the frontend and routing requests)
## 🎯 Future Improvements
- Enhanced filtering and sorting for player stats.
- Improved scoring of teams and players based on the available stats.
- Better overall performance and rendering.
- Improved logging and modularization for the backend.

