import { useState } from "react";
import { Button } from "../ui/button/button";
import { TextInput } from "../ui/input/input";

import { useSpinnerContext } from "../../context/spinner-context";
import { useUserContext } from "../../context/user-context";
import { IUsers } from "../../types/types";
import styles from "./user-details.module.scss";

interface IFormData {
    name: string;
    email: string;
}

export const UserForm = () => {
    const { setIsSpinning, isSpinning } = useSpinnerContext();
    const { users, setUsers } = useUserContext();
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        email: "",
    });
    const [errors, setErrors] = useState<IFormData>({
        name: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email } = formData;
        const nameRegex = /^[a-zA-Z ]{2,30}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            setErrors((prev) => ({
                ...prev,
                name: "Please enter a valid name",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                name: "",
            }));
        }

        if (!emailRegex.test(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email",
            }));
            return;
        } else if (users.find((user) => user.email === email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Email already exists",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                email: "",
            }));
        }

        setUsers(
            (prev) =>
                [
                    ...prev,
                    {
                        name,
                        email,
                        discountId: "1",
                    },
                ] as IUsers
        );

        setIsSpinning(true);
    };

    return (
        <div className={styles.userForm}>
            <div className={styles.header}>
                <h2>Win an Exclusive prize!</h2>
                <p>
                    Enter your full name and email to spin the wheel for a
                    chance to win.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextInput
                    required
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    value={formData.name}
                    error={errors.name}
                    block
                />
                <TextInput
                    required
                    name="email"
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    value={formData.email}
                    error={errors.email}
                    block
                />
                <Button
                    type="submit"
                    block
                    color="primary"
                    disabled={isSpinning}
                >
                    Try Your Luck
                </Button>
            </form>
        </div>
    );
};
