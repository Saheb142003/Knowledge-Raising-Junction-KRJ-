# Admin Controller Documentation

This document explains the design and functionality of the Admin module in the Knowledge Raising Junction (KRJ) backend. It is designed for developers of all levels to understand how we handle Admin operations.

## 1. Design Overview

The Admin module is organized by **Entity** (Student, Employee, Teacher, Profile) rather than by action. This makes the codebase scalable and easy to navigate.

### Folder Structure

All files are located in `server/src/Controllers/Admin/`:

- **`Profile/`**: Manages the Admin's own account (e.g., create another admin, update self).
- **`Student/`**: Handles everything related to Students (Admission, Viewing, Updating).
- **`Employee/`**: Handles general Employee operations.
- **`Teacher/`**: Handles Teacher-specific operations (Teachers are also Employees).
- **`Admin.Controllers.js`**: The main entry point. It imports functions from the subfolders and exports them together.
- **`Admin.Utils.js`**: Contains shared helper functions like permission checks.

---

## 2. Security & Permissions

**File:** [`Admin.Utils.js`](../src/Controllers/Admin/Admin.Utils.js)

Every function first checks if the user is an Admin and has the required permission.

- **`checkAdminPermission(userId, requiredPermission)`**:
  - Verifies the user exists and is an Admin.
  - Checks if the Admin has the specific right (e.g., `manage_students`).
  - **Throws 403 Forbidden** if unauthorized.

---

## 3. Modules & Functions

### A. Admin Profile Management

**File:** [`Profile/AdminProfile.Controllers.js`](../src/Controllers/Admin/Profile/AdminProfile.Controllers.js)

| Function              | Type       | Description                                                                         |
| :-------------------- | :--------- | :---------------------------------------------------------------------------------- |
| **`createAdmin`**     | **CREATE** | Creates a new Admin account. Creates a `User` record first, then an `Admin` record. |
| **`getAdminProfile`** | **READ**   | Fetches details of an Admin, including their branch and role.                       |
| **`getAllAdmins`**    | **READ**   | Lists all admins with filters (role, branch) and pagination.                        |
| **`updateAdmin`**     | **UPDATE** | Modifies admin settings, permissions, or role.                                      |
| **`deleteAdmin`**     | **DELETE** | Soft deletes an admin (sets `isActive: false`).                                     |

### B. Student Management

**Files:**

- [`Student/StudentRegistration.Controllers.js`](../src/Controllers/Admin/Student/StudentRegistration.Controllers.js)
- [`Student/StudentManagement.Controllers.js`](../src/Controllers/Admin/Student/StudentManagement.Controllers.js)

| Function                | Type       | Description                                                                                                                                                                                                                                 |
| :---------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`registerStudent`**   | **CREATE** | **(Complex)** Handles full admission.<br>1. Creates `User` (Login info).<br>2. Creates `Student` (Personal info).<br>3. Creates `AcademicProfile` (Class/Board).<br>4. Generates `IDCard` (KRJ/YYYY/XXXX).<br>5. Links Student to `Branch`. |
| **`getAllStudents`**    | **READ**   | Lists students. Supports search (by name) and filtering (by branch/status).                                                                                                                                                                 |
| **`getStudentProfile`** | **READ**   | Gets full student details including ID card and Academic profile.                                                                                                                                                                           |
| **`updateStudent`**     | **UPDATE** | Updates `User` (email/phone), `Student` (address/parents), and `AcademicProfile` (class) fields.                                                                                                                                            |

### C. Employee Management

**Files:**

- [`Employee/EmployeeRegistration.Controllers.js`](../src/Controllers/Admin/Employee/EmployeeRegistration.Controllers.js)
- [`Employee/EmployeeManagement.Controllers.js`](../src/Controllers/Admin/Employee/EmployeeManagement.Controllers.js)

| Function                 | Type       | Description                                                                                                                                                                |
| :----------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`registerEmployee`**   | **CREATE** | Registers a non-teaching staff.<br>1. Creates `User`.<br>2. Generates `EmployeeCode` (KRJ-EMP-YYYY-XXX).<br>3. Creates `Employee` record.<br>4. Adds employee to `Branch`. |
| **`getAllEmployees`**    | **READ**   | Lists employees. Filter by department or designation.                                                                                                                      |
| **`getEmployeeProfile`** | **READ**   | Gets employee details and branch assignments.                                                                                                                              |
| **`updateEmployee`**     | **UPDATE** | Updates salary, designation, or contact info.                                                                                                                              |

### D. Teacher Management

**Files:**

- [`Teacher/TeacherRegistration.Controllers.js`](../src/Controllers/Admin/Teacher/TeacherRegistration.Controllers.js)
- [`Teacher/TeacherManagement.Controllers.js`](../src/Controllers/Admin/Teacher/TeacherManagement.Controllers.js)

| Function                | Type       | Description                                                                                                                                                     |
| :---------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`registerTeacher`**   | **CREATE** | Registers a teacher.<br>1. Creates `User`.<br>2. Creates `Employee` (as they are staff).<br>3. Creates `Teacher` (links to Employee, adds subjects/experience). |
| **`getAllTeachers`**    | **READ**   | Lists teachers. Shows both employee details (code) and teacher details (subjects).                                                                              |
| **`getTeacherProfile`** | **READ**   | Gets full teacher profile.                                                                                                                                      |
| **`updateTeacher`**     | **UPDATE** | Updates subjects, experience, or contact info.                                                                                                                  |

---

## 4. Key Technical Concepts

1.  **Transactions (`mongoose.startSession`)**:
    - All **Create** operations use transactions. This means if _any_ part fails (e.g., ID Card generation fails after User is created), **everything** is rolled back. No partial data is left in the database.

2.  **User vs. Entity**:
    - We separate Login Info (`User` Schema) from Profile Info (`Student`/`Employee` Schema).
    - **Why?** Allows a single user to potentially have multiple roles (e.g., a Teacher who is also a Parent) in the future without duplicating login credentials.

3.  **Strict Validation (`Joi`)**:
    - Every request body is validated against a strict schema before processing to prevent bad data.
