import { ChangeEvent, useId } from "react";
import styles from "./input.module.scss";

interface ITextInputProps {
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
    block?: boolean;
    required?: boolean;
    style?: React.CSSProperties;
}

export const TextInput = ({
    value,
    name,
    onChange,
    label,
    placeholder,
    type = "text",
    disabled = false,
    error,
    className,
    block = false,
    required = false,
    style,
}: ITextInputProps) => {
    const id = useId();
    return (
        <div
            style={style}
            className={`${styles.wrapper} ${block && styles.block}`}
        >
            <label htmlFor={id} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
                required={required}
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.input} ${error && styles.invalid} ${
                    disabled && styles.disabled
                } ${className}`}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
