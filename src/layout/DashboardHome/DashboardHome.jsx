import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
    const {user, userType } = useAuth();
    return (
        <div className="min-h-screen flex flex-col items-center text-teal-600 justify-center bg-white p-6">
              <h3 className="text-4xl text-center"> Welcome to your Dashboard {user?.displayName}</h3>
           <p>You are logged in as <span className="font-bold text-purple-400">{userType}</span> </p>
              <p className="text-center">Here you can manage your account, view your activities, and more.</p>

        </div>
    );
};

export default DashboardHome;