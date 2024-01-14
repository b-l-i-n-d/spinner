import { useId } from "react";
import styles from "./select.module.scss";

interface ISelectProps {
    title?: string;
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className?: string;
    style?: React.CSSProperties;
    name?: string;
    block?: boolean;
}

export const Select = ({
    title,
    label,
    options,
    onChange,
    value,
    className,
    style,
    name,
    block,
}: ISelectProps) => {
    const id = useId();
    return (
        <div style={style} className={styles.wrapper}>
            {
                // If title is provided, render a label
                label && (
                    <label className={styles.label} htmlFor={id}>
                        {label}
                    </label>
                )
            }
            <select
                style={{
                    width: block ? "100%" : "auto",
                }}
                title={title}
                id={id}
                className={`${styles.select} ${className}`}
                value={value}
                onChange={onChange}
                name={name}
                aria-label={label}
                aria-labelledby={id}
            >
                {options.map((option) => (
                    <option
                        className={styles.option}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
