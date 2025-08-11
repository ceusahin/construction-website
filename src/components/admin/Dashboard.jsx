import React from "react";
import ShortcutButton from "./ShortcutButton";
import MessageList from "./MessageList";
import RecentProjects from "./RecentProjects";
import PageContent from "../../layouts/PageContent";

const Dashboard = ({
  onlineCount,
  todayOnlineCount,
  monthlyOnlineCount,
  totalOnlineCount,
  messages,
  projects,
}) => {
  return (
    <PageContent>
      <div className="p-14 space-y-6 text-white min-h-screen">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-l font-light">Yönetim Paneli</h1>
          <span className="">/</span>
          <h1 className="text-xl font-bold">Ana Sayfa</h1>
        </div>
        {/* Online Kullanıcı Sayısı */}
        <h1 className="text-bold text-xl pt-10">Gösterim</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          <div className="border border-white bg-[#101010] text-white rounded-2xl shadow p-6 flex flex-col gap-5 items-center justify-between">
            <h2 className="text-xl font-semibold">🟢 Online</h2>
            <span className="text-3xl font-bold text-green-600">
              {onlineCount}
            </span>
          </div>

          <div className="border border-white bg-[#101010] text-white rounded-2xl shadow p-6 flex flex-col gap-5 items-center justify-between">
            <h2 className="text-xl font-semibold">🟢 Bugün</h2>
            <span className="text-3xl font-bold text-green-600">
              {todayOnlineCount}
            </span>
          </div>

          <div className="border border-white bg-[#101010] text-white rounded-2xl shadow p-6 flex flex-col gap-5 items-center justify-between">
            <h2 className="text-xl font-semibold">🟢 Bu Ay</h2>
            <span className="text-3xl font-bold text-green-600">
              {monthlyOnlineCount}
            </span>
          </div>

          <div className="border border-white bg-[#101010] text-white rounded-2xl shadow p-6 flex flex-col gap-5 items-center justify-between">
            <h2 className="text-xl font-semibold">🟢 Toplam</h2>
            <span className="text-3xl font-bold text-green-600">
              {totalOnlineCount}
            </span>
          </div>
        </div>

        {/* Kısayollar */}
        <h1 className="text-bold text-xl pt-10">Kısayollar</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ShortcutButton icon="🏗️" label="Proje Ekle" />
          <ShortcutButton icon="📦" label="Malzeme Ekle" />
          <ShortcutButton icon="👷" label="Çalışan Ekle" />
          <ShortcutButton icon="📊" label="Rapor Oluştur" />
        </div>

        {/* Mesajlar ve Projeler */}
        <div className="flex flex-row gap-6 pt-10 bg-[#101010]">
          <div className="flex-1">
            <h1 className="text-bold text-xl pt-10">Mesajlar</h1>
            <div className="grid grid-cols-1 gap-6 mt-4 border rounded-2xl border-white">
              <MessageList messages={messages} />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-bold text-xl pt-10">Projeler</h1>
            <div className="grid grid-cols-1 gap-6 mt-4 border rounded-2xl border-white">
              <RecentProjects projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Dashboard;
