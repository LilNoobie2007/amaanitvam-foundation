export const interns = [
  {
    id: "int-1",
    applicantId: "ap-4", // Arjun Mehta
    mentorId: "men-1", // Preeti Goyal
    opportunityId: "opp-web-dev",
    cohortId: "coh-summer-2026",
    status: "Active",
    onboardingChecklist: {
      welcomeSession: true,
      documentation: true,
      chatChannel: true,
      mentorIntro: true,
      firstTask: true
    },
    certificateEligibility: {
      attendanceThreshold: true, // Requires >= 80%
      deliverablesCompleted: false, // 2 out of 3 completed
      mentorApproval: false
    }
  },
  {
    id: "int-2",
    applicantId: "ap-2", // Dia Sen
    mentorId: "men-1", // Preeti Goyal
    opportunityId: "opp-ui-ux",
    cohortId: "coh-summer-2026",
    status: "Active",
    onboardingChecklist: {
      welcomeSession: true,
      documentation: true,
      chatChannel: false,
      mentorIntro: true,
      firstTask: false
    },
    certificateEligibility: {
      attendanceThreshold: true,
      deliverablesCompleted: false,
      mentorApproval: false
    }
  },
  {
    id: "int-3",
    applicantId: "ap-3", // Kabir Verma
    mentorId: "men-2", // Aman Sharma
    opportunityId: "opp-content-writing",
    cohortId: "coh-summer-2026",
    status: "Active",
    onboardingChecklist: {
      welcomeSession: true,
      documentation: false,
      chatChannel: false,
      mentorIntro: false,
      firstTask: false
    },
    certificateEligibility: {
      attendanceThreshold: false,
      deliverablesCompleted: false,
      mentorApproval: false
    }
  },
  {
    id: "int-4",
    applicantId: "ap-5", // Meera Nair
    mentorId: "men-3", // Kabir Dev
    opportunityId: "opp-graphic-design",
    cohortId: "coh-spring-2026",
    status: "Alumni", // selected Completed/Alumni lifecycle status
    onboardingChecklist: {
      welcomeSession: true,
      documentation: true,
      chatChannel: true,
      mentorIntro: true,
      firstTask: true
    },
    certificateEligibility: {
      attendanceThreshold: true,
      deliverablesCompleted: true,
      mentorApproval: true
    }
  }
];
