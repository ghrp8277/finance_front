import React from "react";
import { fetchActivityRead } from "@/services/social";

interface NotificationDropdownProps {
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  lastActivityElementRef: (node: HTMLElement | null) => void;
}

const handleActivityRead = async (id: number) => {
  await fetchActivityRead(id);
};

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  activities,
  setActivities,
  lastActivityElementRef,
}) => {
  const handleItemClick = async (id: number) => {
    await handleActivityRead(id);
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-64 max-h-64 bg-black border border-gray-700 rounded shadow-lg z-10 overflow-y-auto custom-scrollbar">
      <div className="p-4 text-white">
        <h4 className="font-bold mb-2 text-sm text-green-razer">
          Notifications
        </h4>
        {activities.length > 0 ? (
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="p-2 text-white text-xs border-b border-gray-600 cursor-pointer hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation(); // 드롭다운이 닫히지 않도록 이벤트 전파를 막음
                  handleItemClick(activity.id);
                }}
                ref={
                  index === activities.length - 1
                    ? lastActivityElementRef
                    : null
                }
              >
                [{index + 1}] {activity.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-white">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
