// export default function Docs() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       {/* Header */}
//       <div className="bg-white/5 z-10 fixed top-0 left-0 right-0 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-[inset_0_-2px_2px_-2px_rgba(255,255,255,0.3)]">
//         <h1 className="text-xl">📘 Spendwise Docs</h1>
//         <a href="/" className="text-primary hover:underline underline-offset-4">
//           ← Back to Home
//         </a>
//       </div>

//       {/* Main container */}
//       <div className="max-w-4xl mx-auto px-6 pb-14 pt-25">
//         {/* Page Title */}
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-100">
//           Spendwise Documentation
//         </h1>

//         {/* Glass Section Wrapper */}
//         <div className="space-y-10">
//           {/* Section: Overview */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-primary">
//               Overview
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               Spendwise is a smart and modern full-stack expense management
//               system built with AI features, analytics, charts, and clean UI/UX.
//             </p>
//           </section>

//           {/* Section: Problem You're Solving */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-primary">
//               Problem You're Solving
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               Many people struggle to track their expenses efficiently, analyze
//               their spending patterns, and manage budgets across multiple
//               accounts. Spendwise centralizes all financial data in one place,
//               making tracking, analysis, and planning simple and effective.
//             </p>
//           </section>

//           {/* Section: Why It Matters */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-budget">
//               Why It Matters
//             </h2>
//             <p className="text-gray-300 leading-relaxed">
//               Understanding spending habits empowers users to make smarter
//               financial decisions, save more money, and reduce unnecessary
//               expenses. This improves overall financial well-being and reduces
//               stress.
//             </p>
//           </section>

//           {/* Section: Features */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-budget">
//               Features
//             </h2>
//             <ul className="list-disc ml-6 text-gray-300 space-y-2">
//               <li>AI-powered Smart Chatbot</li>
//               <li>User Authentication</li>
//               <li>Add, Delete Expenses and Income</li>
//               <li>Seperate All Income and Expense Transactions Page</li>
//               <li>Interactive Analytics & Charts</li>
//               <li>Fully Responsive UI across devices</li>
//               <li>Experiments Lab for upcoming features</li>
//               <li>Export to Excel & PDF</li>
//               <li>Liquid Glass effect theme on Toggle</li>
//             </ul>
//           </section>

//           {/* Section: Tech Stack */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-expense">
//               Tech Stack
//             </h2>
//             <p>
//               <strong>Frontend:</strong> React, TailwindCSS, Recharts
//             </p>
//             <p>
//               <strong>Backend:</strong> Node.js, Express, MongoDB
//             </p>
//             <p>
//               <strong>State Management:</strong> Context API
//             </p>
//           </section>

//           {/* Section: User Flow */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-primary">
//               User Flow
//             </h2>
//             <ol className="list-decimal ml-6 text-gray-300 space-y-2">
//               <li>User logs in or registers</li>
//               <li>Dashboard shows overview & analytics</li>
//               <li>User add & delete expenses (CRUD)</li>
//               <li>Charts provide spending insights</li>
//               <li>AI-powered chatbot provides transaction insights</li>
//             </ol>
//           </section>

//           {/* Section: How to Run */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-budget">
//               How to Run
//             </h2>
//             <pre className="bg-gray-900 p-4 rounded-lg text-primary text-sm overflow-x-auto">
//               {`npm install
//                 npm run dev`}
//             </pre>
//           </section>

//           {/* Section: API Endpoints */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-expense">
//               API Endpoints
//             </h2>
//             <pre className="bg-gray-900 p-4 rounded-lg text-primary text-sm overflow-x-auto">
//               {`# AUTH ROUTES
//               POST   /auth/signup
//               POST   /auth/login
//               GET    /auth/logout
//               GET    /auth/me

//               # TRANSACTION ROUTES
//               POST   /transactions/add
//               GET    /transactions
//               DELETE /transactions/:id

//               # AI ROUTES
//               POST   /ai/ask-ai`}
//             </pre>
//           </section>

//           {/* Section: Future Improvements */}
//           <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[inset_0_3px_2px_-2px_rgba(255,255,255,0.5)]">
//             <h2 className="text-2xl font-semibold mb-3 text-primary">
//               Future Improvements
//             </h2>
//             <ul className="list-disc ml-6 text-gray-300 space-y-2">
//               <li>Voice based assistant for chatbot</li>
//               <li>Advanced Budgeting</li>
//               <li>New Tools</li>
//               <li>New Themes</li>
//             </ul>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 pt-12">
      {/* Header */}
      {/* <div
        className="fixed top-0 left-0 right-0 z-10 
                      bg-black/40 backdrop-blur-lg 
                      px-6 py-4 flex justify-between items-center 
                      border-b border-white/10"
      >
        <h1 className="text-xl font-semibold text-white">📘 Spendwise Docs</h1>
        <a href="/" className="text-primary hover:underline underline-offset-4">
          ← Back to Home
        </a>
      </div> */}

      <Header />

      {/* Main container */}
      <div className="max-w-4xl mx-auto px-6 pb-20 pt-28">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-white">
          Spendwise Documentation
        </h1>

        {/* All sections wrapper */}
        <div className="space-y-10">
          {/* ===== Reusable Section Class ===== */}
          {[
            {
              title: "Overview",
              color: "text-primary",
              body: `Spendwise is a smart and modern full-stack expense
                management system built with AI features, analytics, charts,
                and clean UI/UX.`,
            },
            {
              title: "Problem You're Solving",
              color: "text-primary",
              body: `People struggle to track spending, analyze spending patterns,
                and manage budgets. Spendwise centralizes all financial tracking
                into one clean and intuitive platform.`,
            },
            {
              title: "Why It Matters",
              color: "text-primary",
              body: `Understanding spending habits helps users improve financial
                health, save more money, and reduce stress.`,
            },
          ].map((sec, i) => (
            <section
              key={i}
              className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl 
                          border border-white/10 shadow-sm"
            >
              <h2 className={`text-2xl font-semibold mb-3 ${sec.color}`}>
                {sec.title}
              </h2>
              <p className="leading-relaxed">{sec.body}</p>
            </section>
          ))}

          {/* Features */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              Features
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>AI-powered Smart Chatbot</li>
              <li>User Authentication</li>
              <li>Add/Delete Income & Expenses</li>
              <li>Income & Expense Pages</li>
              <li>Analytics & Charts</li>
              <li>Fully Responsive UI</li>
              <li>Experiment Labs</li>
              <li>Export Options</li>
              <li>Glass Theme</li>
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              Tech Stack
            </h2>
            <p>
              <strong className="text-white">Frontend:</strong> React,
              TailwindCSS, Recharts
            </p>
            <p>
              <strong className="text-white">Backend:</strong> Node.js, Express,
              MongoDB
            </p>
            <p>
              <strong className="text-white">State Management:</strong> Context
              API
            </p>
          </section>

          {/* User Flow */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              User Flow
            </h2>
            <ol className="list-decimal ml-6 space-y-2">
              <li>User logs in / registers</li>
              <li>Dashboard shows analytics</li>
              <li>User adds transactions</li>
              <li>Charts display insights</li>
              <li>AI chatbot provides suggestions</li>
            </ol>
          </section>

          {/* Commands */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              How to Run
            </h2>
            <pre className="bg-black/40 border border-white/10 p-4 rounded-lg text-primary text-sm">
              {`npm install
npm run dev`}
            </pre>
          </section>

          {/* API */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              API Endpoints
            </h2>
            <pre className="bg-black/40 border border-white/10 p-4 rounded-lg text-primary text-sm">
              {`POST /auth/signup
POST /auth/login
GET  /auth/logout
GET  /auth/me

POST /transactions/add
GET  /transactions
DELETE /transactions/:id

POST /ai/ask-ai`}
            </pre>
          </section>

          {/* Future */}
          <section className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              Future Improvements
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Voice Assistant</li>
              <li>Advanced Budgeting</li>
              <li>More Tools</li>
              <li>New Themes</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
