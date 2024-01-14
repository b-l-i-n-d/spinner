import { useState } from "react";
import { SpinWheel } from "./spin-wheel";
import { SpinnerForm } from "./spinner-form";

import styles from "./spinner.module.scss";

export const SpinnerContainer = () => {
    const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(true);

    return (
        <div className={styles.spinnerContainer}>
            {isSpinnerOpen ? (
                <SpinWheel setIsSpinnerOpen={setIsSpinnerOpen} />
            ) : (
                <SpinnerForm setIsSpinnerOpen={setIsSpinnerOpen} />
            )}
        </div>
    );
};
