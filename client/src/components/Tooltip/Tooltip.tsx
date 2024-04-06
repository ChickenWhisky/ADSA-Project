import { Tooltip } from "@mantine/core";
import React from "react";

const ToolTip = ({
	children,
	label,
}: {
	children: React.ReactNode;
	label: string;
}) => {
	return (
		<Tooltip
			classNames={{
				tooltip: "bg-[rgba(0,0,0,0.8)] text-white",
			}}
			label={label}
			openDelay={50}
			withArrow={true}
			arrowPosition="center"
			position="bottom"
		>
			{children}
		</Tooltip>
	);
};

export default ToolTip;
