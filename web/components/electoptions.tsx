import {ReactNode} from "react";

type ElectOptionsProps = {
    left: ReactNode;
    middle: ReactNode;
    right: ReactNode;
};

export default function ElectOptions({left, middle, right}: ElectOptionsProps) {
    return (
        <div className="flex">
            <div className="p-5 w-2/5 justify-center bg-blue-400">
                {left}
            </div>

            <div className="p-5 w-1/5 bg-gray-100">
                {middle}
            </div>

            <div className="p-5 w-2/5 bg-red-400">
                {right}
            </div>
        </div>
    );
}