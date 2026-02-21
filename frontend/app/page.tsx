const modules = [
  'Organization', 'Location', 'Shift', 'Holiday', 'Employee', 'Attendance', 'Leave',
  'Approval Engine', 'Payroll', 'Reports', 'Certificate', 'Project', 'News', 'Credit'
];

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Full HR Management Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <div key={m} className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold">{m}</h2>
            <p className="text-sm text-slate-600">Production-ready module enabled.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
