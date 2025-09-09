# 📅 Task Scheduler using Django and React

A simple **Task Scheduler application** built with **Django (Backend)** and **React (Frontend)**.  
This project demonstrates a full-stack setup where users can add, view, and manage tasks efficiently.

---

## 🚀 Features
- ✅ Add new tasks
- 📋 View list of tasks
- ✏️ Mark tasks as completed or not completed
- 🔄 Real-time updates with API integration
- 🎨 Simple and clean UI built with React

---

## 🏗️ Project Structure
Task-Scheduler-using-Django-and-React/
│── backend/ # Django + DRF APIs
│── frontend/ # React App (UI)


---

## ⚙️ Tech Stack
- **Backend:** Django, Django REST Framework
- **Frontend:** React, JavaScript, HTML, CSS
- **Database:** SQLite (default, can be changed)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Nohit594/Task-Scheduler-using-Django-and-React.git
cd Task-Scheduler-using-Django-and-React
```

2️⃣ Backend Setup (Django + DRF)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
👉 The backend will run at: http://127.0.0.1:8000/

3️⃣ Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start
```

👉 The frontend will run at: http://localhost:3000/

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | Get all tasks |
| POST | `/api/tasks/` | Create a new task |
| PATCH | `/api/tasks/<id>/` | Update/toggle task status |

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.
