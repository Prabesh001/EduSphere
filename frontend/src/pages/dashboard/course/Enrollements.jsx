import React from 'react';

const EnrollmentTable = ({ enrollments }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Enroll Date</th>
          <th>Payment Status</th>
          <th>Enroll Created At</th>
          <th>Course Name</th>
          <th>User Email</th>
          <th>User Full Name</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.map(enrollment => (
          <tr key={enrollment.id}>
            <td>{enrollment.id}</td>
            <td>{new Date(parseInt(enrollment.enrollDate)).toLocaleString()}</td>
            <td>{enrollment.paymentStatus ? 'Paid' : 'Unpaid'}</td>
            <td>{new Date(enrollment.createdAt).toLocaleString()}</td>
            <td>{enrollment.course.courseName}</td>
            <td>{enrollment.user.email}</td>
            <td>{enrollment.user.firstName} {enrollment.user.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnrollmentTable;
