import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { TextInput } from "../ui/input/input";
import { Select } from "../ui/select/select";

import { useSpinnerContext } from "../../context/spinner-context";
import { ISpinnerData } from "../../types/types";
import { Icons } from "../icons";
import styles from "./spinner.module.scss";

interface ISpinnerFormProps {
    setIsSpinnerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpinnerForm = ({ setIsSpinnerOpen }: ISpinnerFormProps) => {
    const [selectOptions] = useState<
        {
            label: string;
            value: string;
        }[]
    >([
        {
            label: "Percentage",
            value: "percentage",
        },
        {
            label: "Fixed",
            value: "fixed",
        },
    ]);
    const { spinnerData, setSpinnerData } = useSpinnerContext();

    const handleAddSegment = () => {
        setSpinnerData((prev) => {
            return [
                ...prev,
                {
                    id: Date.now().toString(),
                    label: "Enter label",
                    discount: 0,
                    type: "percentage",
                    color: "#000000",
                },
            ] as ISpinnerData;
        });
    };

    const handleRemoveSegment = (id: string) => {
        setSpinnerData((prev) => {
            return prev.filter((segment) => segment.id !== id);
        });
    };

    const handleUpdateSegment = (
        id: string,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setSpinnerData((prev) => {
            const segmentIndex = prev.findIndex((segment) => segment.id === id);

            const updatedSegment = {
                ...prev[segmentIndex],
                [e.target.name]: e.target.value,
            };

            const updatedSpinnerData = [...prev];
            updatedSpinnerData[segmentIndex] = updatedSegment;

            return updatedSpinnerData;
        });
    };

    return (
        <div className={styles.spinnerFormContainer}>
            <div className={styles.formHeader}>
                <h2 className={styles.title}>Spinner</h2>
                <p className={styles.subtitle}>
                    Customize your spinner and spin it!
                </p>
            </div>
            <form className={styles.spinnerForm}>
                {spinnerData.map((segment, index) => (
                    <div key={segment.id} className={styles.formRow}>
                        <TextInput
                            style={{
                                width: "45%",
                            }}
                            name="label"
                            label={index === 0 ? "Label" : ""}
                            value={segment.label}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />
                        <TextInput
                            name="discount"
                            label={index === 0 ? "Value" : ""}
                            value={segment.discount}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />
                        <Select
                            name="type"
                            label={index === 0 ? "Type" : ""}
                            options={selectOptions}
                            value={segment.type}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />
                        <TextInput
                            name="color"
                            label={index === 0 ? "Color" : ""}
                            type="color"
                            value={segment.color}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />

                        <Button
                            isIcon
                            onClick={() => handleRemoveSegment(segment.id)}
                        >
                            <Icons name="trash" />
                        </Button>
                    </div>
                ))}
                <Button onClick={handleAddSegment}>
                    <Icons name="plus" /> Add Segment
                </Button>
            </form>
            <Button onClick={() => setIsSpinnerOpen(true)}>
                <Icons name="arrow-left" /> Go Back
            </Button>
        </div>
    );
};
