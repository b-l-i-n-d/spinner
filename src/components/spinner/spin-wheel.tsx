import { useEffect, useRef } from "react";
import { Icons } from "../icons";

import { useSpinnerContext } from "../../context/spinner-context";
import { Button } from "../ui/button/button";
import styles from "./spinner.module.scss";

interface ISpinWheelProps {
    setIsSpinnerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpinWheel = ({ setIsSpinnerOpen }: ISpinWheelProps) => {
    const { spinnerData, isSpinning, setIsSpinning } = useSpinnerContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // const [result, setResult] = useState<{
    //     segmentIndex: number;
    //     color: string;
    // }>({
    //     segmentIndex: 0,
    //     color: "#0000",
    // });

    const anglePerSegment = (2 * Math.PI) / spinnerData.length;

    const startSpin = () => {
        if (isSpinning) {
            // Calculate the target angle based on the number of segments
            const targetAngle =
                360 * (Math.random() * (spinnerData.length - 1) + 1);
            // Calculate the duration based on the target angle
            const duration = Math.max(2000, targetAngle);

            // Rotate the canvas to create the spinning effect
            const start = Date.now();
            const spin = () => {
                const elapsed = Date.now() - start;
                const rotation = (elapsed / duration) * targetAngle;

                drawSpinner(rotation);

                // const currentSegement =
                //     Math.floor(rotation / anglePerSegment) % spinnerData.length;

                if (elapsed < duration) {
                    requestAnimationFrame(spin);
                } else {
                    setIsSpinning(false);
                    // setResult({
                    //     segmentIndex: currentSegement,
                    //     color: spinnerData[currentSegement].color,
                    // });
                }
            };

            // Start the spinning animation
            requestAnimationFrame(spin);
        }
    };

    const drawSpinner = (rotation: number) => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        spinnerData.forEach((discount, index) => {
            const segmentRotation = rotation + index * anglePerSegment;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(segmentRotation);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, 0, anglePerSegment);
            ctx.closePath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "white";

            ctx.stroke();
            ctx.fillStyle = discount.color;
            ctx.fill();

            const labelX = radius * Math.cos(anglePerSegment / 2);
            const labelY = (radius / 2) * Math.sin(anglePerSegment / 2);
            ctx.fillStyle = "white"; // Set the color of the label text
            ctx.font = "bold 24px Inter"; // Set the font size and type
            ctx.textAlign = "right"; // Set the horizontal alignment of the text
            ctx.shadowColor = "black";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(discount.label, labelX, labelY);

            ctx.restore();
        });
    };

    useEffect(() => {
        if (isSpinning) {
            startSpin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSpinning]);

    useEffect(() => {
        drawSpinner(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className={`${styles.spinnerWheelContainer} ${
                    isSpinning ? styles.spinning : ""
                }`}
            >
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={600}
                    className={styles.wheel}
                />
                <div className={styles.arrow}>
                    <Icons name="map-pin" fill="white" size={52} />
                </div>
                <Button
                    className={styles.editBtn}
                    isIcon
                    rounded
                    onClick={() => setIsSpinnerOpen(false)}
                >
                    <Icons name="wheel" size={40} />
                </Button>
            </div>
        </>
    );
};
