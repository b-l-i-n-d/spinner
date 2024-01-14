import { useEffect, useRef, useState } from "react";
import { Icons } from "../icons";

import { useSpinnerContext } from "../../context/spinner-context";
import styles from "./spin-wheel.module.scss";

export const SpinWheel = () => {
    const { spinnerData } = useSpinnerContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [spinning, setSpinning] = useState<boolean>(false);

    const [result, setResult] = useState<{
        segmentIndex: number;
        color: string;
    }>({
        segmentIndex: 0,
        color: "#0000",
    });

    const anglePerSegment = (2 * Math.PI) / spinnerData.length;

    const startSpin = () => {
        if (!spinning) {
            setSpinning(true);

            // Calculate the target angle based on the number of segments
            const targetAngle =
                360 * (Math.random() * (spinnerData.length - 1) + 1); // Spin 1 to 6 times

            // Calculate the duration based on the target angle
            const duration = Math.max(2000, targetAngle);

            // Rotate the canvas to create the spinning effect
            const start = Date.now();
            const spin = () => {
                const elapsed = Date.now() - start;
                const rotation = (elapsed / duration) * targetAngle;

                drawSpinner(rotation);

                const currentSegement =
                    Math.floor(rotation / anglePerSegment) % spinnerData.length;

                if (elapsed < duration) {
                    requestAnimationFrame(spin);
                } else {
                    setSpinning(false);
                    setResult({
                        segmentIndex: currentSegement,
                        color: spinnerData[currentSegement].color,
                    });
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

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "red";
        ctx.stroke();

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

            const labelX = (radius / 2) * Math.cos(anglePerSegment / 2) + 30;
            const labelY = (radius / 2) * Math.sin(anglePerSegment / 2);
            ctx.fillStyle = "white"; // Set the color of the label text
            ctx.font = "bold 14px Inter"; // Set the font size and type
            ctx.textAlign = "center";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillText(discount.label, labelX, labelY);

            ctx.restore();
        });
    };

    useEffect(() => {
        drawSpinner(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className={`${styles.spinnerContainer} ${
                    spinning ? styles.spinning : ""
                }`}
            >
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    className={styles.wheel}
                ></canvas>
                <div className={styles.arrow}>
                    <Icons name="map-pin" fill="white" size={32} />
                </div>
            </div>
            <div>
                <button onClick={startSpin} disabled={spinning}>
                    {spinning ? "Spinning..." : "Spin"}
                </button>
                {result && (
                    <div>
                        <p>Result:</p>
                        <p
                            style={{
                                backgroundColor: result.color,
                            }}
                        >{`Color: ${result.color}`}</p>
                        <p>{`Segment Index: ${result.segmentIndex}`}</p>
                    </div>
                )}
            </div>
        </>
    );
};
