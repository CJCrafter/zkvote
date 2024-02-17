import React, {useState} from "react";

interface CollapsableProps {
    title: string;
    children: React.ReactNode;
}

const Collapsable = ({title, children}: CollapsableProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const toggleCollapse = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent other actions
        setCollapsed(!collapsed);
    }

    return (
        <div className="flex-1">
            <div className="flex">
                <span
                    onClick={toggleCollapse}
                    className={`
                        inline-flex items-center justify-center mr-2 
                        cursor-pointer transition-transform duration-200 ease-in-out ${collapsed ? 'transform rotate-0 hover:scale-110' : 'transform rotate-90 hover:scale-110'} w-8 h-8 text-xl
                    `}
                >
                    {"›"}
                </span>
                <p className="flex-1 text-2xl font-semibold overflow-ellipsis p-1">{title}</p>

            </div>
            <div className="">
                {!collapsed && children}
            </div>
        </div>
    )
}

export default Collapsable;