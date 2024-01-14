import { SVGProps } from "react";

const iconsObject = {
    "arrow-left": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="m15 18-6-6 6-6" />
            </>
        ),
    },
    "arrow-right": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="m9 18 6-6-6-6" />
            </>
        ),
    },
    calendar: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </>
        ),
    },
    bulb: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
            </>
        ),
    },
    "check-circle": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
            </>
        ),
    },
    "user-circle": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </>
        ),
    },
    "map-pin": {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
            </>
        ),
    },
    plus: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M5 12h14" />
                <path d="M12 5v14" />
            </>
        ),
    },
    trash: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </>
        ),
    },
    xCross: {
        viewBox: "0 0 24 24",
        path: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </>
        ),
    },
};
export type TIconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export const Icons = ({
    size = 16,
    width,
    height,
    color = "none",
    name,
    ...props
}: TIconSvgProps & { name: keyof typeof iconsObject }) => {
    const icon = iconsObject[name];
    return (
        <svg
            height={size || height}
            width={size || width}
            viewBox={icon.viewBox}
            fill={color}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {icon.path}
        </svg>
    );
};
