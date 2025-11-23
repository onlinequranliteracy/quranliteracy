"use client";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const id = localStorage.getItem("student_id");
    if (!id) window.location.href = "/student/login";

    fetch(`/api/student/info?id=${id}`)
      .then((r) => r.json())
      .then((data) => setStudent(data.student));
  }, []);

  if (!student) return <p className="p-10">Loading...</p>;

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, {student.full_name}</h1>

      <div className="bg-white shadow rounded p-6 mb-6">
        <p><b>Course:</b> {student.course}</p>
        <p><b>Class Type:</b> {student.class_type}</p>
        <p><b>Days:</b> {student.days_per_week}</p>
        <p><b>Status:</b> {student.status}</p>
        <p><b>Next Billing:</b> {new Date(student.next_billing_date).toLocaleDateString()}</p>
      </div>

      <a
        className="bg-green-600 text-white px-6 py-3 rounded block text-center hover:bg-green-700"
        href="/student/renew"
      >
        Renew Payment
      </a>

       {/* 🔗 CLASS LINK SECTION */}
      {student.class_link ? (
        <>
          <p className="mb-2 text-gray-700">
            Your teacher has shared your class link:
          </p>
          <a
            href={student.class_link}
            target="_blank"
            rel="noreferrer"
            className="block bg-green-600 hover:bg-green-700 text-white text-center px-6 py-3 rounded mb-4"
          >
            Join Class
          </a>
          <p className="text-sm text-gray-500 break-all">
            Or copy this link:&nbsp;
            <span className="font-mono">{student.class_link}</span>
          </p>
        </>
      ) : (
        <p className="text-gray-500">
          Your class link hasn’t been set yet. Please wait for your teacher to
          share it.
        </p>
        )}
    </main>
  );
}
