import { useState } from "react";
import { SpinWheel } from "./spin-wheel";
import { SpinnerForm } from "./spinner-form";

import { useSpinnerContext } from "../../context/spinner-context";
import { Icons } from "../icons";
import { Button } from "../ui/button/button";
import { UserForm } from "../user-details/user-from";

import styles from "./spinner.module.scss";

export const SpinnerContainer = () => {
    const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(true);
    const { isSpinnerReadyToSpin, setIsSpinnerReadyToSpin } =
        useSpinnerContext();

    return (
        <div className={styles.wrapper}>
            {isSpinnerOpen ? (
                <>
                    <div className={styles.spinnerContainer}>
                        <SpinWheel setIsSpinnerOpen={setIsSpinnerOpen} />
                    </div>
                    {isSpinnerReadyToSpin ? (
                        <UserForm />
                    ) : (
                        <Button
                            className={styles.spinBtn}
                            onClick={() => setIsSpinnerReadyToSpin(true)}
                            color="primary"
                        >
                            Spin To Win
                        </Button>
                    )}
                </>
            ) : (
                <SpinnerForm setIsSpinnerOpen={setIsSpinnerOpen} />
            )}
            {isSpinnerReadyToSpin && (
                <Button
                    className={styles.closeBtn}
                    isIcon
                    onClick={() => setIsSpinnerReadyToSpin(false)}
                    color="danger"
                >
                    <Icons name="xCross" />
                </Button>
            )}
        </div>
    );
};
