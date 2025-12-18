import { useEffect, useState } from 'react';
import Nav from './Nav';
import Layout from './Layout';
import { getAdminStats } from './Gadgets';

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-lg text-center shadow-sm border border-gray-100 p-6">
      <div className="text-sm text-gray-500 uppercase tracking-wide">{title}</div>
      <div className="mt-3 text-3xl md:text-4xl font-extrabold text-indigo-900">
        {value}
      </div>
      {subtitle && <div className="mt-2 text-xs text-gray-400">{subtitle}</div>}
    </div>
  );
};

function Home() {
    const[userInfo, setUserInfo] = useState({});
    const [stats, setStats] = useState(null);

    useEffect(()=>{
        getAdminStats().then(setStats).catch(console.error);
    }, []);


       useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){

             fetch("https://gadgetmart.runasp.net/api/gadgetmart/home/" + user, {
            method: "GET",
            credentials: "include"
        }).then(response => response.json()).then(data => {
            setUserInfo(data.userInfo);
            console.log("user info: ", data.userInfo)
        }).catch(error => {
            console.log("Error home page: ", error)
        });

        }
       
    },[])
    const fmt = (n) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
    return (
      <Layout>
        <div className="text-blue-900 flex justify-between">
            <div>
            <h2 className='text-xs sm:text-sm md:text-base'> Hello, <b>{userInfo.name}</b> </h2>

            </div>
            <div>
                <h1>{userInfo.email}</h1>
                <h2 className='text-xs sm:text-sm md:text-base'>{userInfo.name}</h2>
            </div>
        </div>
       <section className="mb-10">
            <h2 className="text-lg text-center font-medium text-gray-700 mb-4">Orders</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                title="THIS WEEK"
                value={fmt(stats?.orderslast7Days)}
                subtitle={ `${fmt (stats?.orderslast7Days)} orders this week`}
              />
              <StatCard
                title="THIS MONTH"
                value={fmt(stats?.ordersLast30Days)}
                subtitle={`${fmt(stats?.ordersLast30Days)} orders this month`}
              />
              <StatCard
                title="THIS YEAER"
                value={fmt(stats?.ordersLast365Days)}
                subtitle={`${fmt(stats?.ordersLast365Days)} orders this year`}
              />
            </div>
          </section>

          {/* Revenue section */}
          <section>
            <h2 className="text-lg font-medium text-gray-700 mb-4">Revenue</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                title="THIS WEEK"
                value={`₦ ${fmt(stats?.revenueLast7Days)}`}
                subtitle={`${fmt(stats?.revenueLast7Days)} orders this week`}
              />
              <StatCard
                title="THIS MONTH"
                value={`₦ ${fmt(stats?.revenueLast30Days)}`}
                subtitle={`${fmt(stats?.revenueLast30Days)} orders this month`}
              />
              <StatCard
                title="THIS YEAR"
                value={`₦ ${fmt(stats?.revenueLast365Days)}`}
                subtitle={`${fmt(stats?.revenueLast365Days)} orders this month`}
              />
            </div>
          </section>
          

      </Layout>
    )
}

export default Home;