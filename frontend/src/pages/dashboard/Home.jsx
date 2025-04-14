import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import faker from "faker";
import CourseList from "./home/CourseHomeList";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const HomeDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/get-all-teacher", config);
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.response.data);
    }
  };

  const getAllDatas = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(
        baseUrl + "/teacher/get-admin-course",
        config
      );
      if (response.status === 200) {
        setTeacher(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
    getAllDatas();
  }, []);

  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Verfied Course Count</h2>
        <p className="text-3xl font-bold">{teacher.length}</p>
      </div>
      <CourseList />
      <Line options={options} data={data2} />
    </div>
  );
};

export default HomeDashboard;
