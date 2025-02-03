# Task Tracker

Task Tracker is a simple web application that functions as a to-do list. Users can add tasks, delete tasks, and mark tasks as completed or uncompleted. Completed tasks are visually distinguished with a strikethrough and moved to the end of the list, while unchecking a completed task returns it to the pending list.

## Features

- Add new tasks
- Delete tasks
- Mark tasks as completed (checked)
- Un-mark tasks as uncompleted (unchecked)
- Completed tasks move to the bottom of the list
- Tasks are stored in an array of objects for easy management

## Data Structure

Tasks are stored in an array of objects with the following structure:

```javascript
const tasks = [
  {
    id: Date.now(), // Unique identifier
    description: "Sample Task", // Task description
    status: "uncompleted", // Status: "completed" or "uncompleted"
  },
];
```

## Project Completion

This project was built as part of the "Build a Task Tracker with JavaScript" challenge from [roadmap.sh](https://roadmap.sh/projects/task-tracker-js).

## Installation & Usage

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Open the project in VS Code.
3. Install and enable the Live Server extension in VS Code.
4. Right-click `index.html` and select "Open with Live Server" to run the app.
5. Start adding and managing your tasks!
