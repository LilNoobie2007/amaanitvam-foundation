import express from "express";

import {
  createDepartment,
  editDepartment,
  deleteDepartment,
  assignMember,
  updatePerformance,
  getDepartmentReport,
  getDepartments,
  getDepartmentById,
} from "../controllers/departmentController.js";

const router = express.Router();

/* =========================
   CREATE Department
========================= */
router.post("/create", createDepartment);

/* =========================
   GET Departments
========================= */
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);

/* =========================
   EDIT Department
   (includes optional head update)
========================= */
router.put("/:id", editDepartment);

/* =========================
   DELETE Department
========================= */
router.delete("/:id", deleteDepartment);

/* =========================
   ASSIGN MEMBER
========================= */
router.post("/:id/assign-member", assignMember);

/* =========================
   UPDATE PERFORMANCE
========================= */
router.put("/:id/performance", updatePerformance);

/* =========================
   DEPARTMENT REPORT
========================= */
router.get("/:id/report", getDepartmentReport);

export default router;