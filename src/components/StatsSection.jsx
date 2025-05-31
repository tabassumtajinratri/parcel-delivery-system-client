import { useEffect, useState } from "react";
import useAxiosPublic from "../axiosInstance/useAxiosPublic";
import StatCard from "./StatCard";

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalBooked: 0,
    totalDelivered: 0,
    totalUsers: 0,
  });

 const AxiosPublic = useAxiosPublic();    

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await AxiosPublic.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section
     className="py-12 bg-teal-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-10">
          App Usage Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Parcels Booked" value={stats.totalBooked} delay={0.1} />
          <StatCard title="Parcels Delivered" value={stats.totalDelivered} delay={0.3} />
          <StatCard title="Registered Users" value={stats.totalUsers} delay={0.5} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
