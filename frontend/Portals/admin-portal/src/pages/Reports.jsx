import { useEffect, useState } from "react";
import { Users, UserPlus, IndianRupee, Receipt } from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Reports() {
  const [reports, setReports] = useState({
    totalMembers: 0,
    totalCandidates: 0,
    totalDonations: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/admin/reports");
      setReports(res.data.reports);
    } catch (err) {
      toast.error("Failed to load reports");
    }
  };
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Amaanitvam Foundation", 14, 18);

  doc.setFontSize(14);
  doc.text("Reports Summary", 14, 30);

  autoTable(doc, {
    head: [["Report", "Value"]],
    body: [
      ["Total Members", reports.totalMembers],
      ["Total Candidates", reports.totalCandidates],
      ["Total Donations", `₹${reports.totalDonations}`],
      ["Transactions", reports.totalTransactions],
    ],
    startY: 40,
  });

  doc.save("Amaanitvam-Report.pdf");
};

const exportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet([
    {
      "Total Members": reports.totalMembers,
      "Total Candidates": reports.totalCandidates,
      "Total Donations": reports.totalDonations,
      Transactions: reports.totalTransactions,
    },
  ]);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Reports"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, "Amaanitvam-Report.xlsx");
};
  const cards = [
    {
      title: "Total Members",
      value: reports.totalMembers,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Candidates",
      value: reports.totalCandidates,
      icon: UserPlus,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Donations",
      value: `₹${reports.totalDonations.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Transactions",
      value: reports.totalTransactions,
      icon: Receipt,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];
   const growthData = [
  { month: "Jan", members: 5, candidates: 8 },
  { month: "Feb", members: 9, candidates: 15 },
  { month: "Mar", members: 15, candidates: 24 },
  { month: "Apr", members: 20, candidates: 30 },
  { month: "May", members: 28, candidates: 40 },
  { month: "Jun", members: reports.totalMembers, candidates: reports.totalCandidates },
];
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-8">
        Reports & Analytics
      </h1>
    <div className="flex gap-3 mb-6">

  <button
    onClick={exportPDF}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
  >
    <Download className="w-4 h-4" />
    Export PDF
  </button>

  <button
    onClick={exportExcel}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
  >
    <Download className="w-4 h-4" />
    Export Excel
  </button>

</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div className={`${card.bg} p-3 rounded-xl`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-8 p-6">

  <h2 className="text-xl font-bold mb-6">
    Growth Analytics
  </h2>

  <div style={{ width: "100%", height: 350 }}>

    <ResponsiveContainer>

      <LineChart data={growthData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="members"
          stroke="#10b981"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="candidates"
          stroke="#2563eb"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</div>

      {/* Placeholder for export */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm mt-8 p-10">
        <h2 className="text-xl font-semibold mb-2">
          Export Reports
        </h2>

        <p className="text-slate-500">
          PDF and Excel export options will be added here.
        </p>
      </div>
    </div>
  );
}