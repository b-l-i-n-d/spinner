import styles from "./button.module.scss";

interface IButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    block?: boolean;
    type?: "button" | "submit" | "reset";
    color?: "primary" | "secondary" | "danger" | "ghost";
    isIcon?: boolean;
    form?: string;
    rounded?: boolean;
}

export const Button = ({
    children,
    onClick,
    disabled = false,
    className,
    block = false,
    type = "button",
    color,
    isIcon = false,
    form,
    rounded = false,
}: IButtonProps) => {
    return (
        <div
            style={{
                width: block ? "100%" : "auto",
            }}
        >
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${styles.button} ${isIcon && styles.icon} ${
                    rounded && styles.rounded
                } ${color === "primary" && styles.primary} ${
                    color === "secondary" && styles.secondary
                }
                ${color === "danger" && styles.danger}
                ${color === "ghost" && styles.ghost}
                ${className} ${block && styles.block} ${
                    disabled && styles.disabled
                }`}
                form={form}
            >
                {children}
            </button>
        </div>
    );
};
