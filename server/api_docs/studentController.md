## Base Rules for Student Controller

- Base path: **`/api/student`** for all student-facing routes.[](https://apiscript.in/student-information-API)
- All routes protected with auth middleware (JWT) and **role = "student"** .[](https://www.scribd.com/document/897061429/Online-Attendance-System-Documentation)
- Every request is scoped to `req.user.id` (student’s own userId), never arbitrary student IDs from client.[](https://www.scribd.com/document/897061429/Online-Attendance-System-Documentation)

---

## Student Auth & Identity

## StudentAuthController (if separated from generic `/auth`)

- **POST `/api/student/login`**
  - Schemas: **User, Student**
  - Purpose: Student login (or you reuse `/auth/login` + role check on frontend).
- **GET `/api/student/profile`**
  - Schemas: **Student, AcademicProfile, User**
  - Purpose: Get full self profile.
  - Data typically includes:
    - Basic: name, email, phone, gender, DOB.
    - Academic: enrollment number, branch, batch, current year/semester.
    - Linking: `userId`, `branchId`, `batchIds`, `guardian info` (if present).[](https://apiscript.in/student-information-API)

---

## Academic Details

## StudentAcademicController

- **GET `/api/student/academic`**
  - Schemas: **AcademicProfile, Student**
  - Purpose: Detailed academic data for the logged-in student.
  - Typical fields in academic profile:
    - Past and current grades, internal marks, exam scores.
    - CGPA/percentage, backlogs, academic status (regular/irregular).[](https://support.aeries.com/support/solutions/articles/14000113683-aeries-api-student-related-end-points)
- **GET `/api/student/subjects`** (optional but useful)
  - Schemas: **Subject, Batch, Student**
  - Purpose: List subjects the student is currently enrolled in.
  - Query strategy:
    - Use **Batch** as base (enrollment owner), then join to Subject list for those batches.
- **GET `/api/student/batches`** (if you expose separately)
  - Schemas: **Batch, Student**
  - Purpose: Batches where student is enrolled (current + history).

---

## Routine / Timetable

## StudentRoutineController

- **GET `/api/student/routine`**
  - Schemas: **Routine, Batch, Subject, Teacher**
  - Purpose: Get timetable for the student.
  - Filter logic:
    - Find student’s active **batchIds** , then fetch routines where `batchId` in those batches and `branchId` = student.branchId.[](https://mobirise.com/html-templates/school-management-system/)

---

## Attendance

## StudentAttendanceController

- **GET `/api/student/attendance`**
  - Schemas: **Attendance, Student, Batch, Subject**
  - Purpose: Attendance overview for logged-in student.
  - Query pattern:
    - `Attendance.find({ entityId: studentId, role: 'student', ...filters })`.
  - Supported filters (recommended):
    - `dateFrom`, `dateTo`.
    - `subjectId`.
    - `batchId`.
  - Response may include:
    - Per-day records (present/absent/leave).
    - Aggregated stats: total classes, present count, percentage.[](https://dev.to/emmanuelj/technical-documentation-student-attendance-tracking-with-api-integration-for-parental-notifications-1a2)

---

## Assignments & Submissions

## StudentAssignmentController

- **GET `/api/student/assignments`**
  - Schemas: **Assignment, Batch, Subject, Teacher**
  - Purpose: List assignments relevant to the student.
  - Strategy:
    - Fetch assignments where `batchId` in student.batches OR `studentIds` contains studentId (if per-student).
- **GET `/api/student/assignments/:id`** (optional but good)
  - Schema: **Assignment**
  - Purpose: Detailed view for one assignment.
- **POST `/api/student/submissions`**
  - Schemas: **Assignment (for reference), Submission sub-document or separate collection**
  - Purpose: Submit assignment response.
  - Payload typically:
    - `assignmentId`, `answerText` or file URL, `submittedAt`, optional `remarks`.[](https://www.scribd.com/document/919757664/API-Endpoints)
  - Validation rules:
    - Check assignment exists, not past hard deadline (if enforced on backend).
- **GET `/api/student/submissions`** (optional)
  - Schemas: **Assignment, Submission**
  - Purpose: View own submissions + status (graded/pending, marks).

---

## Tests & Results

## StudentTestController

- **GET `/api/student/tests`**
  - Schemas: **Test, Batch, Subject**
  - Purpose: Upcoming and past tests for the student.
- **GET `/api/student/results`**
  - Schemas: **Test, AcademicProfile**
  - Purpose: Show marks/grades for completed tests.
  - Response could include:
    - Per-test marks, max marks, percentage.
    - Aggregate per subject, term, batch.[](https://docs.oracle.com/en/cloud/saas/student-management/farsm/rest-endpoints.html)

---

## Leave Management

## StudentLeaveController

- **POST `/api/student/leave`**
  - Schemas: **Leave, Student, User**
  - Purpose: Apply for leave as a student.
  - Typical payload:
    - `fromDate`, `toDate`, `reason`, optional `attachmentUrl`.
  - Backend sets:
    - `status = 'pending'`, `appliedBy = studentId`.[](https://www.scribd.com/document/897061429/Online-Attendance-System-Documentation)
- **GET `/api/student/leave`** (optional)
  - Schema: **Leave**
  - Purpose: List own leave applications with status (pending/approved/rejected).

---

## Payments & Online Purchases

## StudentPaymentController

- **GET `/api/student/payments`**
  - Schemas: **Payment, Student**
  - Purpose: Show all fee payments and dues for the student.
  - Payment schema is polymorphic, so filter by `entityId = studentId` and `entityType = 'student'`.
- **GET `/api/student/payments/:id`** (optional)
  - Schema: **Payment**
  - Purpose: Single payment receipt detail.

---

## ID Card (If student needs to view)

## StudentIDCardController (optional)

- **GET `/api/student/id-card`**
  - Schemas: **IDCard, Student**
  - Purpose: View/download own ID card details (QR, validity, branch, batch).
