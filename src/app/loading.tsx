export default function GlobalLoading() {
  return (
    <main className="min-h-screen pt-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse space-y-6 py-8">
        <div className="h-10 w-64 rounded bg-slate-200" />
        <div className="h-40 rounded bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 rounded bg-slate-200" />
          <div className="h-64 rounded bg-slate-200" />
        </div>
      </div>
    </main>
  );
}
