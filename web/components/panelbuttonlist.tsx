import React, {ReactNode} from "react";

type ButtonListProps = {
    children: ReactNode;
};

export default function ButtonList({ children }: ButtonListProps) {
    const buttons = React.Children.count(children);

    return (
        <div
            style={{ display: 'grid', gridTemplateColumns: `repeat(${buttons}, minmax(0, 1fr))` }}
            className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
            {children}
        </div>
    );
}