import { Icons } from "../icons";

import { useSpinnerContext } from "../../context/spinner-context";
import { useUserContext } from "../../context/user-context";
import { Button } from "../ui/button/button";
import styles from "./spinner.module.scss";
import WheelComponent from "./wheel";

interface ISpinWheelProps {
    setIsSpinnerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpinWheel = ({ setIsSpinnerOpen }: ISpinWheelProps) => {
    const { setIsSpinning, setIsSpinnerReadyToSpin } = useSpinnerContext();
    const { setUsers } = useUserContext();

    const onFinished = (winner: string) => {
        if (winner !== undefined) {
            setUsers((prev) => {
                if (prev.length === 0) return prev;

                if (!prev[prev.length - 1].discountId) {
                    prev[prev.length - 1].discountId = winner;
                }

                return [...prev];
            });
        }

        setIsSpinning(false);
    };

    const handleEditSpinner = () => {
        setIsSpinnerOpen(false);
        setIsSpinnerReadyToSpin(false);
    };

    return (
        <>
            <div className={`${styles.spinnerWheelContainer}`}>
                <WheelComponent
                    className={styles.wheel}
                    onFinished={(winner) => onFinished(winner)}
                    isOnlyOnce={false}
                    size={300}
                    upDuration={100}
                    downDuration={1000}
                    fontFamily="Inter"
                />
                <div className={styles.arrow}>
                    <Icons name="map-pin" fill="white" size={52} />
                </div>
                <Button
                    className={styles.editBtn}
                    isIcon
                    rounded
                    onClick={handleEditSpinner}
                >
                    <Icons name="wheel" size={40} />
                </Button>
            </div>
        </>
    );
};
