import Department from "../models/department.js";
import User from "../models/user.js";

/*CREATE Department*/
export const createDepartment = async (req, res) => {
  try {
    const {
      departmentName,
      description,
      departmentHead,
      members, // optional array
    } = req.body;

    // check duplicate department
    const existing = await Department.findOne({ departmentName });

    if (existing) {
      return res.status(400).json({ message: "Department already exists" });
    }

    let headUser = null;

    // validate head if provided
    if (departmentHead) {
      headUser = await User.findById(departmentHead);
      if (!headUser) {
        return res.status(404).json({ message: "Department head not found" });
      }
    }

    // validate + format members if provided
    let formattedMembers = [];

    if (members && members.length > 0) {
      for (let m of members) {
        const userExists = await User.findById(m.user);

        if (!userExists) {
          return res.status(404).json({
            message: `User not found: ${m.user}`,
          });
        }

        formattedMembers.push({
          user: m.user,
          role: m.role || "member",
          joinedAt: new Date(),
        });
      }
    }

    // create department
    const department = await Department.create({
      departmentName,
      description: description || "",
      departmentHead: departmentHead || null,
      members: formattedMembers,
      totalMembers: formattedMembers.length,
    });

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit
export const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const { departmentName, description, departmentHead } = req.body;

    // update basic fields
    if (departmentName && departmentName !== department.departmentName) {
      const duplicate = await Department.findOne({ departmentName });
      if (duplicate && duplicate._id.toString() !== id) {
        return res.status(400).json({ message: "Department name already exists" });
      }
      department.departmentName = departmentName;
    }

    if (typeof description === "string") {
      department.description = description;
    }

    // update head if field is present in the request
    if (Object.prototype.hasOwnProperty.call(req.body, "departmentHead")) {
      if (departmentHead) {
        const userExists = await User.findById(departmentHead);
        if (!userExists) {
          return res.status(404).json({ message: "User not found" });
        }
        department.departmentHead = departmentHead;
      } else {
        department.departmentHead = null;
      }
    }

    await department.save();

    res.json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("departmentHead", "name email")
      .populate("members.user", "name email role");

    res.json({ departments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id)
      .populate("departmentHead", "name email")
      .populate("members.user", "name email role");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete 
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    await department.deleteOne();

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// assign member...

export const assignMember = async (req, res) => {
  try {
    const departmentId = req.params.id || req.body.departmentId;
    const { userId, role } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyMember = department.members.find(
      (m) => m.user.toString() === userId
    );

    if (alreadyMember) {
      return res.status(400).json({ message: "User already in department" });
    }

    department.members.push({
      user: userId,
      role: role || "member",
      joinedAt: new Date(),
    });

    department.totalMembers = department.members.length;

    await department.save();

    res.json({
      message: "Member assigned successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// department performance 

export const updatePerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const { performance } = req.body;

    if (performance < 0 || performance > 100) {
      return res
        .status(400)
        .json({ message: "Performance must be between 0 and 100" });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.performance = performance;

    await department.save();

    res.json({
      message: "Performance updated successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// department report
export const getDepartmentReport = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id)
      .populate("departmentHead", "name email")
      .populate("members.user", "name email role");

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const report = {
      departmentName: department.departmentName,
      description: department.description,
      head: department.departmentHead,
      totalMembers: department.totalMembers,
      performance: department.performance,
      members: department.members,
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};