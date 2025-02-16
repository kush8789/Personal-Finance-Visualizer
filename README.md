# **Personal Finance Visualizer - Stage 1**

A simple web application for tracking personal finances. This is **Stage 1** of the project, which includes basic transaction tracking features.

---

## **Features**

- **Add/Edit/Delete Transactions**:
  - Add new transactions with an amount, date, and description.
  - Edit or delete existing transactions.
- **Transaction List View**:
  - View a list of all transactions in a clean and organized table.
- **Monthly Expenses Bar Chart**:
  - Visualize monthly expenses using a bar chart powered by Recharts.
- **Basic Form Validation**:
  - Ensure all required fields are filled out before submitting a transaction.

---

## **Technologies Used**

### **Frontend**
- Next.js
- React
- shadcn/ui (for UI components)
- Recharts (for data visualization)

### **Backend**
- Next.js API Routes

### **Database**
- MongoDB (for storing transactions)

---

## **Getting Started**

### **Prerequisites**
- Node.js (v18 or later)
- MongoDB Atlas account (or a local MongoDB instance)
- Git (optional)

---

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```


2. **Install Dependencies**:
    Run the following command to install all required dependencies:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
- Create a `.env.local` file in the root directory.
- Add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the Application**:
    Start the development server:
   ```bash
   npm run dev
   ```


5. **Access the Application**:
    - Open your browser and navigate to [http://localhost:3000](http://localhost:3000).


## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch and open a pull request.
