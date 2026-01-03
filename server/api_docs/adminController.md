## What Admin Can Do

- **Authenticate & View Dashboard**
  - Log in securely and access a dashboard with high-level stats: total students, teachers, batches, branches, and revenue/fees data.[](https://samridhsathi.in/admin-control-panel/)
- **Manage Users & Roles**
  - Create, update, activate/deactivate users (students, teachers, employees, admins).
  - Control access by roles and lock accounts when needed.[](https://proctur.com/blog/top-key-features-of-education-erp-system/)
- **Manage Branches & Batches**
  - Create and edit branches, manage their status.
  - Create batches, attach them to branches, and see which students are in which batch.[](https://www.csquare.in/admin-module/)
- **Manage Teachers & Employees**
  - Create and maintain teacher and employee records.
  - See their assigned subjects/batches and salary/payment history.[](https://igradeplus.com/schoolmanagementsystem)
- **Manage Students & Academics**
  - Create student records with academic data and enrollment mapping.
  - View student profiles, attendance, payments, and batch allocation.[](https://arkajainuniversity.ac.in/naac/Criteria%201/1.3.4/1_3_4_DOCUMENTS/MCA/AJU210993.pdf)
- **Control Subjects, Routines & Attendance**
  - Create subjects, map them to teachers and batches.
  - Create institute-wide routines (timetables).
  - View and fix attendance records across branches, batches, teachers, and students.[](https://www.myleadingcampus.com/blogview/top-10-musthave-features-in-a-school-erp-software-for-indian-schools-in-2025)
- **Handle Leaves, Assignments, Tests**
  - View leave applications of students, teachers, and employees and approve/reject them.
  - Monitor assignments and tests across the system for governance and reporting.[](https://www.radicallogix.com/5-top-and-unique-features-of-school-erp-software.php)
- **Manage Payments & Financials**
  - Record and review all payments (fees and salaries).
  - See fee status, dues, and salary disbursements across branches.[](https://decentro.tech/blog/best-school-erp-software/)
- **Generate ID Cards & Reports**
  - Generate ID cards for all roles.
  - Run system-wide reports (admissions, fees, attendance, performance).

## Auth & Dashboard

## A

## 1. AdminAuthController

- **POST `/api/admin/login`**
  - Schemas: Admin, User
  - Role check: user.role = "admin".
- **GET `/api/admin/dashboard`**
  - Schemas: Branch, Batch, Student, Teacher, Employee, Payment, Attendance, Test
  - Uses relationships to compute:
    - Counts per branch (students, teachers, employees).
    - Fee collection and due amounts per branch/batch.
    - Attendance and performance summaries.[](https://www.myleadingcampus.com/blogview/top-10-musthave-features-in-a-school-erp-software-for-indian-schools-in-2025)

---

## 2. AdminUserController

- **GET `/api/admin/users`**
  - Schema: User
  - Filters: role (student/teacher/employee/admin), status, branch via linked entity.
- **POST `/api/admin/users`**
  - Schema: User
  - Tied later to Student/Teacher/Employee via `userId`.
- **PUT `/api/admin/users/:id`** , **PATCH `/api/admin/users/:id/disable`** , **PUT `/api/admin/users/:id/status`**
- Soft status changes; Admin uses this to indirectly control all role entities.[](https://proctur.com/blog/top-key-features-of-education-erp-system/)

---

## 3. AdminBranchController

- **POST `/api/admin/branches`**
  - Schema: Branch
- **GET `/api/admin/branches`**
  - Schema: Branch
  - Optionally include counts of batches/students/teachers via relations.
- **PUT `/api/admin/branches/:id`** , **DELETE/soft `/api/admin/branches/:id`**
- Before disabling, Admin must check dependent: Batches, Teachers, Students, Employees, Routines, Attendance, Payments.[](https://www.csquare.in/admin-module/)

---

## 4. AdminBatchController

- **POST `/api/admin/batches`**
  - Schemas: Batch, Branch, Subject, Teacher
  - Batch holds: `branchId`, subject list, primary teacher(s).
- **GET `/api/admin/batches`**
  - Schemas: Batch, Branch
  - Filters: branchId, active session, course type.
- **GET `/api/admin/batches/:id/students`**
  - Schemas: Batch, Student
  - Enrollment is owned by Batch (M:N via batch ref in Student or link collection).[](https://arkajainuniversity.ac.in/naac/Criteria%201/1.3.4/1_3_4_DOCUMENTS/MCA/AJU210993.pdf)

---

## 5. AdminTeacherController

- **POST `/api/admin/teachers`**
  - Schemas: Teacher, User, Employee (if sharing employee base)
  - Links: `userId`, `branchId`, optional `employeeId`.
- **GET `/api/admin/teachers`**
  - Schemas: Teacher, Branch
  - Filters: branchId, subjectId (through Subject relation), batchId (through Batch relation).
- **GET `/api/admin/teachers/:id`**
  - Schemas: Teacher, Branch, Subject, Batch
  - Uses relations to show which branches, subjects, batches teacher is attached to.
- **GET `/api/admin/teachers/:id/subjects`**
  - Schema: Subject
  - Uses Subject as owner: `Subject.find({ teacherIds: id })`.[](https://www.macedms.com/role-of-school-management-system/)
- **GET `/api/admin/teachers/:id/batches`**
  - Schema: Batch
  - Batches where this teacher is assigned (e.g., `batch.teacherIds` contains id).
- **GET `/api/admin/teachers/:id/attendance`**
  - Schemas: Attendance, Routine, Batch, Subject
  - Attendance where `entityId = teacherId`, role = "teacher"; ties to schedules and branches.[](https://blackboard.github.io/rest-apis/learn/working-with-apis/attendance)

---

## 6. AdminStudentController

- **POST `/api/admin/students`**
  - Schemas: Student, User, AcademicProfile, Branch, Batch
  - Links: `userId`, `branchId`, default `batchIds`, initial academic profile.
- **GET `/api/admin/students`**
  - Schemas: Student, Branch, Batch
  - Filters: branchId, batchId, status, academic year.
- **GET `/api/admin/students/:id`**
  - Schemas: Student, AcademicProfile, Branch, Batch
  - Returns full identity + academic data + enrollments.[](https://igradeplus.com/schoolmanagementsystem)
- **GET `/api/admin/students/:id/batches`**
  - Schemas: Batch, Student
  - Batches in which this student is/was enrolled.
- **GET `/api/admin/students/:id/attendance`**
  - Schemas: Attendance, Batch, Subject, Branch
  - Attendance entries where `entityId = studentId` and role = "student".
- **GET `/api/admin/students/:id/payments`**
  - Schemas: Payment, Branch, Batch
  - Payments where `entityId = studentId`, `entityType = 'student'`.
- **DELETE (soft) `/api/admin/students/:id`**
  - Schemas: Student, Attendance, Assignment, Test, Payment, Leave
  - Only marks inactive; relations keep history intact.[](https://www.radicallogix.com/5-top-and-unique-features-of-school-erp-software.php)

---

## 7. AdminEmployeeController

- **POST `/api/admin/employees`**
  - Schemas: Employee, User, Branch
- **GET `/api/admin/employees`**
  - Schemas: Employee, Branch
- **PUT `/api/admin/employees/:id`**
  - Schema: Employee
- **GET `/api/admin/employees/:id/payments`**
  - Schema: Payment
  - Payments where `entityId = employeeId`, `entityType = 'employee'`.
- **DELETE (soft) `/api/admin/employees/:id`**
  - Schemas: Employee, Payment, Attendance, Leave.[](https://www.csquare.in/admin-module/)

---

## 8. AdminSubjectController

- **GET `/api/admin/subjects`**
  - Schemas: Subject, Branch, Batch
- **POST `/api/admin/subjects`**
  - Schemas: Subject, Branch, Teacher, Batch
  - Subject owns: `teacherIds`, `branchId`, optional `batchIds`.[](https://www.macedms.com/role-of-school-management-system/)
- **GET `/api/admin/subjects/:id/teachers`**
  - Schema: Subject
  - Use subject’s `teacherIds` to populate teachers.

---

## 9. AdminRoutineController

- **GET `/api/admin/routines`**
  - Schemas: Routine, Branch, Batch, Subject, Teacher
  - Filters: branchId, batchId, teacherId, subjectId, date/day.
- **POST `/api/admin/routines`**
  - Schemas: Routine, Branch, Batch, Subject, Teacher
  - Each routine entry ties together: branch + batch + subject + teacher + time slot.[](https://docs.anthology.com/docs/blackboard/rest-apis/hands-on/attendance)

---

## 10. AdminAttendanceController

- **POST `/api/admin/attendance`**
  - Schemas: Attendance, Branch, Batch, Subject, Student/Teacher/Employee
  - Uses polymorphic reference:
    - `entityId`, `role`, `branchId`, `batchId`, `subjectId`, `date`, `status`.
- **GET `/api/admin/attendance`**
  - Schemas: Attendance, Branch, Batch, Subject, Student, Teacher
  - Filters: role, entityId, branchId, batchId, subjectId, date range.
  - Used for branch-level and system-level attendance analytics.[](https://www.networktechinc.com/pdf/e-facs-attdnce-mgmt-sftwr-manual.pdf)

---

## 11. AdminLeaveController

- **GET `/api/admin/leaves`**
  - Schemas: Leave, Student, Teacher, Employee, Branch
  - Shows all leave requests; each Leave links to `entityId`, `entityType`, `branchId`.
- **POST `/api/admin/leaves/:id/approve`** / **`/reject`**
  - Schema: Leave
  - Updates status; may interact with attendance if you auto-mark leave days.
- **POST `/api/admin/leaves`** (optional)
  - Schema: Leave
  - Admin-created leaves on behalf of users.[](https://www.pschoolonline.in/features)

---

## 12. AdminAssignmentController

- **GET `/api/admin/assignments`**
  - Schemas: Assignment, Batch, Subject, Teacher
  - For monitoring load and academic activity across batches/branches.
  - Assignments are related to Batch + Subject + Teacher; students are inferred via Batch membership.[](https://dev.to/emmanuelj/technical-documentation-student-attendance-tracking-with-api-integration-for-parental-notifications-1a2)

---

## 13. AdminTestController

- **GET `/api/admin/tests`**
  - Schemas: Test, Batch, Subject, Teacher, Student (for results)
  - Each Test ties to batches and subjects; results tie Test ↔ Student.
  - Admin uses this to see test schedules and aggregated performance.[](https://docs.oracle.com/en/cloud/saas/student-management/farsm/rest-endpoints.html)

---

## 14. AdminPaymentController

- **POST `/api/admin/payments`**
  - Schemas: Payment, Student, Employee, Branch, Batch
  - Payment has polymorphic references: `entityId`, `entityType`, plus `branchId`, optional `batchId` for student fees.
- **GET `/api/admin/payments`**
  - Schemas: Payment, Branch, Batch
  - Filters: `entityType`, `branchId`, `batchId`, `mode`, `status`, date range.
- **GET `/api/admin/payments/:id`**
  - Schema: Payment
  - Detailed fee/salary entry.[](https://proctur.com/blog/top-key-features-of-education-erp-system/)

---

## 15. AdminCoursePurchaseController

- **GET `/api/admin/course-purchases`**
  - Schemas: OnlineCoursePurchase, User/Student, Subject/OnlineCourse, Payment
  - View all online purchases with relations to student and optional payment.[](https://www.prepai.io/blog/top-educational-apis/)

---

## 16. AdminIDCardController

- **POST `/api/admin/id-cards`**
  - Schemas: IDCard, Student, Teacher, Employee, Branch, Batch
  - IDCard references entityId + entityType + branch + batch/class for students.
- **GET `/api/admin/id-cards`**
  - Same schemas; filters by role, branch, status (active/expired).[](https://www.radicallogix.com/5-top-and-unique-features-of-school-erp-software.php)

---

## 17. AdminReportController

- **GET `/api/admin/reports`**
  - Schemas: Branch, Batch, Student, Teacher, Employee, Attendance, Test, Assignment, Payment, Leave, OnlineCoursePurchase
  - Generates cross-cutting analytics using all defined relations (e.g., attendance vs performance per branch, revenue per batch, etc.
